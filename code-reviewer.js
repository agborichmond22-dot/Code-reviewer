// ── DOM refs ───────────────────────────────────────
const codeEl    = document.getElementById('code-input');
const outputEl  = document.getElementById('output');
const gutterEl  = document.getElementById('gutter');
const lineCount = document.getElementById('line-count');
const runBtn    = document.getElementById('run-btn');
const modelPill = document.getElementById('model-pill');
const copyRev   = document.getElementById('copy-rev');
const toastEl   = document.getElementById('toast');

let fullReview = '';
let toastTimer;

// ── LINE NUMBERS ───────────────────────────────────
function updateGutter() {
  const lines = codeEl.value.split('\n').length;
  lineCount.textContent = lines + (lines === 1 ? ' line' : ' lines');
  gutterEl.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

codeEl.addEventListener('input', updateGutter);

// Sync gutter scroll to editor scroll
codeEl.addEventListener('scroll', () => {
  gutterEl.scrollTop = codeEl.scrollTop;
});

// Tab key → insert 2 spaces
codeEl.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = codeEl.selectionStart;
    codeEl.value = codeEl.value.slice(0, s) + '  ' + codeEl.value.slice(codeEl.selectionEnd);
    codeEl.selectionStart = codeEl.selectionEnd = s + 2;
    updateGutter();
  }
  // Ctrl/Cmd+Enter to run
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    analyze();
  }
});

// ── EXAMPLE CODE ──────────────────────────────────
const EXAMPLES = {
  javascript: `// User authentication handler
// Hint: there are several real-world issues in here...
async function loginUser(req, res) {
  const { username, password } = req.body;

  // Build query by string concatenation
  const user = await db.query(
    "SELECT * FROM users WHERE username = '" + username + "'"
  );

  if (user && user.password == password) {
    const token = Math.random().toString(36).slice(2);
    res.cookie('session', token, { httpOnly: false });
    res.json({ success: true, user: user });
  } else {
    res.json({ success: false });
  }
}

// Render user profile from API data
function renderProfile(data) {
  document.getElementById('bio').innerHTML = data.bio;
  document.getElementById('name').innerHTML = data.name;
}`,

  python: `import sqlite3
import hashlib

def authenticate(username, password):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    # Direct string interpolation into SQL
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    user = cursor.fetchone()

    if user:
        hashed = hashlib.md5(password.encode()).hexdigest()
        if hashed == user[2]:
            print(f"Login: {username}")
            return {"id": user[0], "name": user[1]}

    return None

def get_all_users():
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    return cursor.fetchall()`,

  typescript: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

class AuthService {
  private users: User[] = [];

  createUser(data: any): User {
    const user: User = {
      id: Math.random(),        // not unique!
      name: data.name,
      email: data.email,
      password: data.password,  // stored as plain text
      role: data.role || 'admin'
    };
    this.users.push(user);
    return user;
  }

  findById(id: number) {
    return this.users.find(u => u.id == id);  // loose equality
  }

  getAllUsers() {
    return this.users;  // exposes passwords
  }
}`
};

function loadExample() {
  const lang = document.getElementById('lang').value;
  codeEl.value = EXAMPLES[lang] || EXAMPLES.javascript;
  updateGutter();
}

function clearAll() {
  codeEl.value = '';
  updateGutter();
  showIdle();
}

function copyCode() {
  if (!codeEl.value.trim()) return;
  navigator.clipboard.writeText(codeEl.value);
  toast('Code copied!');
}

function copyReview() {
  if (!fullReview) return;
  navigator.clipboard.writeText(fullReview);
  toast('Review copied!');
}

// ── UI STATE HELPERS ───────────────────────────────
function showIdle() {
  outputEl.innerHTML = `<div class="idle">
    <div class="idle-icon">&lt;/&gt;</div>
    <h3>Ready to review</h3>
    <p>Paste code on the left and click Analyze</p>
    <p style="margin-top:5px">or press <kbd>Ctrl+Enter</kbd></p>
  </div>`;
  modelPill.style.display = 'none';
  copyRev.style.display   = 'none';
  fullReview = '';
}

function showLoading() {
  outputEl.innerHTML = `<div class="loading">
    <div class="spinner"></div>
    <p>Analyzing code...</p>
  </div>`;
}

function showError(msg) {
  outputEl.innerHTML = `<div class="err-box">
    ⚠ ${esc(msg)}<br>
    <small style="opacity:0.6;font-size:11px;margin-top:6px;display:block">
      Check your code and try again
    </small>
  </div>`;
}

function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 1800);
}

// ── SAFE HTML HELPERS ──────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// Escape first, then apply safe inline formatting
function inline(raw) {
  let t = esc(raw);
  // Severity badges
  t = t.replace(/\[HIGH\]/g, '<span class="badge b-h">HIGH</span>');
  t = t.replace(/\[MED\]/g,  '<span class="badge b-m">MED</span>');
  t = t.replace(/\[LOW\]/g,  '<span class="badge b-l">LOW</span>');
  // Inline code  `foo`
  t = t.replace(/`([^`]+)`/g, '<code class="icode">$1</code>');
  // Bold  **foo**
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:500;color:var(--text)">$1</strong>');
  return t;
}

// Map section title → CSS class for color
function headColor(title) {
  const t = title.toLowerCase();
  if (/bug|error|issue/.test(t))              return 'c-red';
  if (/security|vuln|xss|inject|csrf/.test(t)) return 'c-purple';
  if (/performance|perf|optim|speed/.test(t)) return 'c-amber';
  if (/suggest|improve|refactor|tip/.test(t)) return 'c-cyan';
  if (/strength|good|well|positive|work/.test(t)) return 'c-green';
  return 'c-muted';
}

// Render list/prose content inside a section (handles code blocks too)
function renderBody(lines) {
  let html = '';
  let inCode = false, codeBuf = '';

  for (const line of lines) {
    // Opening fence
    if (line.startsWith('```') && !inCode) {
      inCode = true; codeBuf = '';
      continue;
    }
    // Closing fence
    if (line.startsWith('```') && inCode) {
      inCode = false;
      html += `<div class="code-block">${esc(codeBuf.trimEnd())}</div>`;
      continue;
    }
    if (inCode) { codeBuf += line + '\n'; continue; }

    const t = line.trim();
    if (!t) continue;

    if (/^[-•*]\s/.test(t)) {
      // List item
      html += `<div class="item"><div class="item-dot"></div><div>${inline(t.replace(/^[-•*]\s+/, ''))}</div></div>`;
    } else if (/^✓/.test(t)) {
      // Clean check
      html += `<p class="clean">✓ ${esc(t.replace(/^✓\s*/, ''))}</p>`;
    } else {
      // Plain paragraph
      html += `<p style="font-size:13px;color:var(--text-md);margin-bottom:4px;line-height:1.65">${inline(t)}</p>`;
    }
  }

  // Handle unclosed code block (may happen mid-stream)
  if (inCode && codeBuf) {
    html += `<div class="code-block">${esc(codeBuf.trimEnd())}</div>`;
  }
  return html;
}

// ── MAIN MARKDOWN → HTML RENDERER ─────────────────
// Called after every streamed chunk, so must handle partial text gracefully
function formatReview(text) {
  let html = '';
  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Score heading: ## Score: X/10 ──────────────
    const scoreM = line.match(/#+\s*Score:\s*(\d+(?:\.\d+)?)\/10/i);
    if (scoreM) {
      const num = parseFloat(scoreM[1]);
      // Grab the summary sentence on the next non-empty line
      let summary = '';
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && !lines[j].startsWith('#')) {
        summary = lines[j].trim();
        i = j + 1;
      } else {
        i++;
      }
      html += `<div class="score-card">
        <div class="score-row">
          <span class="score-big">${num}</span>
          <span class="score-of">/10</span>
        </div>
        ${summary ? `<div class="score-sum">${inline(summary)}</div>` : ''}
      </div><hr class="sep">`;
      continue;
    }

    // ── Section heading: ## Title ───────────────────
    const headM = line.match(/^#+\s+(.+)$/);
    if (headM) {
      const title = headM[1].trim();
      const cls   = headColor(title);
      // Collect body lines until next heading
      const body = [];
      i++;
      while (i < lines.length && !lines[i].match(/^#+\s/)) {
        body.push(lines[i]);
        i++;
      }
      html += `<div>
        <div class="s-head ${cls}">${esc(title)}</div>
        ${renderBody(body)}
      </div><hr class="sep">`;
      continue;
    }

    // ── Top-level code block (fallback) ────────────
    if (line.startsWith('```')) {
      let code = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code += lines[i] + '\n';
        i++;
      }
      html += `<div class="code-block">${esc(code.trimEnd())}</div>`;
      i++; // skip closing fence
      continue;
    }

    // ── Regular line ────────────────────────────────
    if (line.trim()) {
      html += `<p style="font-size:13px;color:var(--text-md);margin-bottom:6px;line-height:1.65">${inline(line)}</p>`;
    }
    i++;
  }

  return html;
}

// ── SYSTEM PROMPT ──────────────────────────────────
function buildPrompt(lang) {
  return `You are a senior software engineer doing a professional code review. Be direct, specific, and educational — always reference actual code from the submission using backticks.

Format your response exactly using these markdown headings:

## Score: [X]/10
[One honest sentence assessing the overall code quality]

## 🐛 Bugs & Issues
- [HIGH] Description. \`relevant_code\`. How to fix it.
- [MED] Another issue with [MED] severity.
(Write "✓ None found" if no bugs)

## 🔒 Security
- [HIGH] Vulnerability type, impact, and fix.
(Write "✓ No issues detected" if clean)

## ⚡ Performance
- Specific inefficiency or optimization opportunity.
(Write "✓ Looks efficient" if fine)

## 💡 Suggestions
- Concrete improvement for readability, maintainability, or best practices.
- At least 2 suggestions.

## ✅ Strengths
- What the code does well. Be specific.

## 📝 Refactored Version
\`\`\`${lang}
[Improved version with the main issues fixed. Add concise inline comments explaining key changes.]
\`\`\`

Rules: use [HIGH], [MED], or [LOW] tags on every bug/security item. Backtick inline code references. Give at least 2 items per non-empty section.`;
}

// ── MAIN ANALYZE FUNCTION ─────────────────────────
async function analyze() {
  const code = codeEl.value.trim();
  if (!code) { toast('Paste some code first!'); return; }

  const lang = document.getElementById('lang').value;

  // Update button state
  runBtn.disabled = true;
  runBtn.innerHTML = `
    <div class="spinner" style="width:11px;height:11px;border-width:1.5px;
      border-color:rgba(255,255,255,0.2);border-top-color:#fff;margin:0"></div>
    Analyzing`;

  fullReview = '';
  modelPill.style.display = 'none';
  copyRev.style.display   = 'none';
  showLoading();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        stream: true,
        system: buildPrompt(lang),
        messages: [{
          role: 'user',
          content: `Review this ${lang} code:\n\`\`\`${lang}\n${code}\n\`\`\``
        }]
      })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `HTTP ${res.status}`);
    }

    // ── Stream SSE response ─────────────────────────
    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    let firstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });

      // SSE lines are separated by \n; keep incomplete line in buffer
      const lines = buf.split('\n');
      buf = lines.pop();

      for (const ln of lines) {
        if (!ln.startsWith('data: ')) continue;
        const raw = ln.slice(6).trim();
        if (raw === '[DONE]') continue;

        let evt;
        try { evt = JSON.parse(raw); } catch { continue; }

        // The delta text arrives in content_block_delta events
        if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
          if (firstChunk) {
            outputEl.innerHTML = '';
            modelPill.style.display = 'inline-block';
            firstChunk = false;
          }
          fullReview += evt.delta.text;
          // Re-render with streaming cursor
          outputEl.innerHTML = formatReview(fullReview) + '<span class="cursor"></span>';
          outputEl.scrollTop = outputEl.scrollHeight;
        }
      }
    }

    // Final render — remove streaming cursor
    outputEl.innerHTML = formatReview(fullReview);
    copyRev.style.display = 'inline-block';

  } catch (err) {
    showError(err.message);
  } finally {
    runBtn.disabled = false;
    runBtn.innerHTML = `
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 3l14 9-14 9V3z"/>
      </svg>
      Analyze`;
  }
}


updateGutter();
loadExample();