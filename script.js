/* ==========================================================
   VIDYA FREE — Admin Panel JavaScript (Standalone)
   ========================================================== */

const STORAGE_KEYS = {
  books: 'vidyafree_books',
  papers: 'vidyafree_papers',
  ebooks: 'vidyafree_ebooks',
  admin: 'vidyafree_admin',
  session: 'vidyafree_session',
  settings: 'vidyafree_settings'
};

function getData(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}
function getSettings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.settings)) || {}; }
  catch { return {}; }
}
function setData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function setSettings(s) { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s)); }
function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }

function initDemoData() {
  if (!localStorage.getItem(STORAGE_KEYS.papers)) {
    setData(STORAGE_KEYS.papers, [
      { id: 'p1', cls: '10', subject: 'Mathematics (Standard)', title: 'Sample Paper 2026', desc: 'Full CBSE pattern with step-marking answer key.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p2', cls: '10', subject: 'Mathematics (Basic)', title: 'Sample Paper 2026', desc: 'Basic-level paper with detailed solutions.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p3', cls: '10', subject: 'Science', title: 'Sample Paper 2026', desc: 'Physics, Chemistry & Biology sections combined.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p4', cls: '10', subject: 'Social Science', title: 'Sample Paper 2026', desc: 'History, Geography, Civics & Economics.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p5', cls: '10', subject: 'English (Communicative)', title: 'Sample Paper 2026', desc: 'Reading, writing & literature sections.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p6', cls: '9', subject: 'Mathematics', title: 'Model Test Paper', desc: 'Term-pattern paper with marking scheme.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p7', cls: '9', subject: 'Science', title: 'Model Test Paper', desc: 'Covers all three science sections.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p8', cls: '9', subject: 'Social Science', title: 'Model Test Paper', desc: 'History, Geography, Civics & Economics combined.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
      { id: 'p9', cls: '9', subject: 'Hindi Course B', title: 'Model Test Paper', desc: 'Grammar, comprehension & writing sections.', pdfUrl: '', year: '2026', date: new Date().toISOString() },
    ]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.books)) {
    setData(STORAGE_KEYS.books, [
      { id: 'b1', class: '10', subject: 'Mathematics', title: 'NCERT Maths Class 10', desc: 'Complete textbook with all chapters', pdfUrl: 'https://ncert.nic.in/textbook/pdf/jemh1dd.zip', medium: 'English', date: new Date().toISOString() },
      { id: 'b2', class: '10', subject: 'Science', title: 'NCERT Science Class 10', desc: 'Physics, Chemistry, Biology combined', pdfUrl: 'https://ncert.nic.in/textbook/pdf/jesc1dd.zip', medium: 'English', date: new Date().toISOString() },
      { id: 'b3', class: '9', subject: 'Mathematics', title: 'NCERT Maths Class 9', desc: 'Number systems to probability', pdfUrl: 'https://ncert.nic.in/textbook/pdf/iemh1dd.zip', medium: 'English', date: new Date().toISOString() },
      { id: 'b4', class: '9', subject: 'Science', title: 'NCERT Science Class 9', desc: 'Matter, organisms, motion, gravitation', pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc1dd.zip', medium: 'English', date: new Date().toISOString() },
      { id: 'b5', class: '8', subject: 'Mathematics', title: 'NCERT Maths Class 8', desc: 'Rational numbers to playing with numbers', pdfUrl: 'https://ncert.nic.in/textbook/pdf/hemh1dd.zip', medium: 'English', date: new Date().toISOString() },
      { id: 'b6', class: '8', subject: 'Science', title: 'NCERT Science Class 8', desc: 'Crop production to pollution', pdfUrl: 'https://ncert.nic.in/textbook/pdf/hesc1dd.zip', medium: 'English', date: new Date().toISOString() },
    ]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ebooks)) {
    setData(STORAGE_KEYS.ebooks, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.admin)) {
    setData(STORAGE_KEYS.admin, { password: 'vidyafree123' });
  }
}
initDemoData();

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ===================== PUBLIC SITE LINK =====================
function updatePublicSiteLinks() {
  const settings = getSettings();
  const url = settings.publicSiteUrl || '';
  const viewLink = document.getElementById('viewPublicSite');
  const loginLink = document.getElementById('publicSiteLink');
  if (viewLink) viewLink.href = url || '#';
  if (loginLink) loginLink.href = url || '#';
}
updatePublicSiteLinks();

// ===================== AUTH =====================
function isAdminLoggedIn() {
  return sessionStorage.getItem(STORAGE_KEYS.session) === 'active';
}
function requireAdmin() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Login form
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value;
    const adminData = getData(STORAGE_KEYS.admin);
    const errorEl = document.getElementById('loginError');
    if (user === 'admin' && pass === (adminData.password || 'vidyafree123')) {
      sessionStorage.setItem(STORAGE_KEYS.session, 'active');
      window.location.href = 'dashboard.html';
    } else {
      errorEl.textContent = 'Invalid username or password.';
    }
  });
}

// Logout
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(STORAGE_KEYS.session);
    window.location.href = 'index.html';
  });
}

// ===================== DASHBOARD =====================
if (document.querySelector('.admin-sidebar')) {
  if (!requireAdmin()) return;

  // Show username
  const userDisplay = document.getElementById('adminUserDisplay');
  if (userDisplay) userDisplay.textContent = '👤 Admin';

  // Sidebar toggle (mobile)
  const sidebarToggle = document.getElementById('adminSidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Tabs
  const navItems = document.querySelectorAll('.admin-nav-item');
  const tabs = document.querySelectorAll('.admin-tab');
  const pageTitle = document.getElementById('adminPageTitle');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = item.dataset.tab;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      tabs.forEach(t => t.classList.remove('active'));
      document.getElementById('tab-' + tabId)?.classList.add('active');
      if (pageTitle) pageTitle.textContent = item.textContent.trim();
      if (sidebar) sidebar.classList.remove('open');
      if (tabId === 'books') renderManageBooks();
      if (tabId === 'papers') renderManagePapers();
      if (tabId === 'ebooks') renderManageEbooks();
      if (tabId === 'dashboard') updateDashboard();
    });
  });

  // Upload tabs
  const uploadTabs = document.querySelectorAll('.admin-upload-tab');
  const uploadForms = document.querySelectorAll('.admin-upload-form');
  uploadTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      uploadTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.upload;
      uploadForms.forEach(f => f.classList.remove('active'));
      document.getElementById('upload' + type.charAt(0).toUpperCase() + type.slice(1) + 'Form')?.classList.add('active');
    });
  });

  // Dashboard stats
  function updateDashboard() {
    const books = getData(STORAGE_KEYS.books);
    const papers = getData(STORAGE_KEYS.papers);
    const ebooks = getData(STORAGE_KEYS.ebooks);
    document.getElementById('dashBookCount').textContent = books.length;
    document.getElementById('dashPaperCount').textContent = papers.length;
    document.getElementById('dashEbookCount').textContent = ebooks.length;
    document.getElementById('dashTotalItems').textContent = books.length + papers.length + ebooks.length;

    const recent = [...books.map(b=>({...b,type:'Book'})), ...papers.map(p=>({...p,type:'Paper'})), ...ebooks.map(e=>({...e,type:'eBook'}))]
      .sort((a,b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
    const tbody = document.querySelector('#recentUploadsTable tbody');
    const empty = document.getElementById('recentEmpty');
    if (recent.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (empty) empty.style.display = 'block';
    } else {
      if (empty) empty.style.display = 'none';
      if (tbody) {
        tbody.innerHTML = recent.map(r => `
          <tr>
            <td><span style="font-family:var(--mono);font-size:.7rem;background:var(--marigold-lt);color:var(--marigold-dk);padding:2px 8px;border-radius:999px;">${r.type}</span></td>
            <td><strong>${escapeHtml(r.title)}</strong></td>
            <td>${r.class || r.cls || '-'}</td>
            <td>${escapeHtml(r.subject || r.category || '-')}</td>
            <td style="font-size:.78rem;color:var(--text-soft)">${formatDate(r.date)}</td>
          </tr>
        `).join('');
      }
    }
  }
  updateDashboard();

  // Upload Book
  const uploadBookForm = document.getElementById('uploadBookForm');
  if (uploadBookForm) {
    uploadBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const book = {
        id: generateId(),
        class: document.getElementById('bookClass').value,
        subject: document.getElementById('bookSubject').value.trim(),
        title: document.getElementById('bookTitle').value.trim(),
        desc: document.getElementById('bookDesc').value.trim(),
        pdfUrl: document.getElementById('bookPdfUrl').value.trim(),
        medium: document.getElementById('bookMedium').value,
        date: new Date().toISOString()
      };
      const books = getData(STORAGE_KEYS.books);
      books.push(book);
      setData(STORAGE_KEYS.books, books);
      document.getElementById('bookUploadSuccess').textContent = '✅ Book uploaded successfully!';
      uploadBookForm.reset();
      updateDashboard();
      setTimeout(() => document.getElementById('bookUploadSuccess').textContent = '', 3000);
    });
  }

  // Upload Paper
  const uploadPaperForm = document.getElementById('uploadPaperForm');
  if (uploadPaperForm) {
    uploadPaperForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const paper = {
        id: generateId(),
        cls: document.getElementById('paperClass').value,
        subject: document.getElementById('paperSubject').value.trim(),
        title: document.getElementById('paperTitle').value.trim(),
        desc: document.getElementById('paperDesc').value.trim(),
        pdfUrl: document.getElementById('paperPdfUrl').value.trim(),
        year: document.getElementById('paperYear').value.trim(),
        date: new Date().toISOString()
      };
      const papers = getData(STORAGE_KEYS.papers);
      papers.push(paper);
      setData(STORAGE_KEYS.papers, papers);
      document.getElementById('paperUploadSuccess').textContent = '✅ Paper uploaded successfully!';
      uploadPaperForm.reset();
      updateDashboard();
      setTimeout(() => document.getElementById('paperUploadSuccess').textContent = '', 3000);
    });
  }

  // Upload eBook
  const uploadEbookForm = document.getElementById('uploadEbookForm');
  if (uploadEbookForm) {
    uploadEbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ebook = {
        id: generateId(),
        title: document.getElementById('ebookTitle').value.trim(),
        category: document.getElementById('ebookCategory').value.trim(),
        desc: document.getElementById('ebookDesc').value.trim(),
        pdfUrl: document.getElementById('ebookPdfUrl').value.trim(),
        date: new Date().toISOString()
      };
      const ebooks = getData(STORAGE_KEYS.ebooks);
      ebooks.push(ebook);
      setData(STORAGE_KEYS.ebooks, ebooks);
      document.getElementById('ebookUploadSuccess').textContent = '✅ eBook uploaded successfully!';
      uploadEbookForm.reset();
      updateDashboard();
      setTimeout(() => document.getElementById('ebookUploadSuccess').textContent = '', 3000);
    });
  }

  // Manage Books
  function renderManageBooks(searchTerm) {
    const tbody = document.querySelector('#manageBooksTable tbody');
    const empty = document.getElementById('manageBooksEmpty');
    let books = getData(STORAGE_KEYS.books);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      books = books.filter(b =>
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.subject && b.subject.toLowerCase().includes(q)) ||
        (b.class && b.class.toLowerCase().includes(q))
      );
    }
    if (books.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';
    if (tbody) {
      tbody.innerHTML = books.map(b => `
        <tr>
          <td>${escapeHtml(b.class)}</td>
          <td>${escapeHtml(b.subject)}</td>
          <td><strong>${escapeHtml(b.title)}</strong></td>
          <td>${escapeHtml(b.medium)}</td>
          <td>
            <div class="table-actions">
              <a href="${b.pdfUrl}" target="_blank" class="btn btn-ghost btn-sm">View</a>
              <button class="btn btn-danger btn-sm" onclick="deleteItem('books','${b.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
  const manageBookSearch = document.getElementById('manageBookSearch');
  if (manageBookSearch) {
    manageBookSearch.addEventListener('input', (e) => renderManageBooks(e.target.value));
  }

  // Manage Papers
  function renderManagePapers(searchTerm) {
    const tbody = document.querySelector('#managePapersTable tbody');
    const empty = document.getElementById('managePapersEmpty');
    let papers = getData(STORAGE_KEYS.papers);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      papers = papers.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.subject && p.subject.toLowerCase().includes(q)) ||
        (p.cls && p.cls.toLowerCase().includes(q))
      );
    }
    if (papers.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';
    if (tbody) {
      tbody.innerHTML = papers.map(p => `
        <tr>
          <td>${escapeHtml(p.cls)}</td>
          <td>${escapeHtml(p.subject)}</td>
          <td><strong>${escapeHtml(p.title)}</strong></td>
          <td>${escapeHtml(p.year || '-')}</td>
          <td>
            <div class="table-actions">
              <a href="${p.pdfUrl || '#'}" target="_blank" class="btn btn-ghost btn-sm">View</a>
              <button class="btn btn-danger btn-sm" onclick="deleteItem('papers','${p.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
  const managePaperSearch = document.getElementById('managePaperSearch');
  if (managePaperSearch) {
    managePaperSearch.addEventListener('input', (e) => renderManagePapers(e.target.value));
  }

  // Manage eBooks
  function renderManageEbooks(searchTerm) {
    const tbody = document.querySelector('#manageEbooksTable tbody');
    const empty = document.getElementById('manageEbooksEmpty');
    let ebooks = getData(STORAGE_KEYS.ebooks);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      ebooks = ebooks.filter(e =>
        (e.title && e.title.toLowerCase().includes(q)) ||
        (e.category && e.category.toLowerCase().includes(q))
      );
    }
    if (ebooks.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';
    if (tbody) {
      tbody.innerHTML = ebooks.map(e => `
        <tr>
          <td><strong>${escapeHtml(e.title)}</strong></td>
          <td>${escapeHtml(e.category || '-')}</td>
          <td>${escapeHtml(e.desc || '-')}</td>
          <td>
            <div class="table-actions">
              <a href="${e.pdfUrl || '#'}" target="_blank" class="btn btn-ghost btn-sm">View</a>
              <button class="btn btn-danger btn-sm" onclick="deleteItem('ebooks','${e.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
  const manageEbookSearch = document.getElementById('manageEbookSearch');
  if (manageEbookSearch) {
    manageEbookSearch.addEventListener('input', (e) => renderManageEbooks(e.target.value));
  }

  // Global delete
  window.deleteItem = function(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const key = STORAGE_KEYS[type];
    let data = getData(key);
    data = data.filter(item => item.id !== id);
    setData(key, data);
    if (type === 'books') renderManageBooks(manageBookSearch?.value || '');
    if (type === 'papers') renderManagePapers(managePaperSearch?.value || '');
    if (type === 'ebooks') renderManageEbooks(manageEbookSearch?.value || '');
    updateDashboard();
  };

  // Site URL settings
  const siteUrlForm = document.getElementById('siteUrlForm');
  if (siteUrlForm) {
    const settings = getSettings();
    document.getElementById('publicSiteUrl').value = settings.publicSiteUrl || '';
    siteUrlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('publicSiteUrl').value.trim();
      setSettings({ ...getSettings(), publicSiteUrl: url });
      document.getElementById('urlSuccess').textContent = '✅ URL saved!';
      updatePublicSiteLinks();
      setTimeout(() => document.getElementById('urlSuccess').textContent = '', 3000);
    });
  }

  // Change password
  const changePassForm = document.getElementById('changePassForm');
  if (changePassForm) {
    changePassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('currentPass').value;
      const newPass = document.getElementById('newPass').value;
      const confirmPass = document.getElementById('confirmPass').value;
      const adminData = getData(STORAGE_KEYS.admin);
      const errorEl = document.getElementById('passError');
      const successEl = document.getElementById('passSuccess');
      errorEl.textContent = '';
      successEl.textContent = '';
      if (current !== (adminData.password || 'vidyafree123')) {
        errorEl.textContent = 'Current password is incorrect.';
        return;
      }
      if (newPass !== confirmPass) {
        errorEl.textContent = 'New passwords do not match.';
        return;
      }
      if (newPass.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters.';
        return;
      }
      setData(STORAGE_KEYS.admin, { password: newPass });
      successEl.textContent = '✅ Password updated successfully!';
      changePassForm.reset();
    });
  }

  // Clear all data
  const clearAllBtn = document.getElementById('clearAllDataBtn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (!confirm('⚠️ This will permanently delete ALL uploaded books, papers, and eBooks. Continue?')) return;
      localStorage.removeItem(STORAGE_KEYS.books);
      localStorage.removeItem(STORAGE_KEYS.papers);
      localStorage.removeItem(STORAGE_KEYS.ebooks);
      initDemoData();
      updateDashboard();
      renderManageBooks();
      renderManagePapers();
      renderManageEbooks();
      alert('All data has been reset to defaults.');
    });
  }
}
