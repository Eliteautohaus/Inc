/* shared.js — Elite Autohaus */
document.addEventListener('DOMContentLoaded', function () {

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-nav a').forEach(function(a) {
    if (a.getAttribute('href').split('/').pop() === page) a.classList.add('active');
  });

  /* ── HAMBURGER ── */
  const ham = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = mobileNav.classList.toggle('open');
      const spans = ham.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
        spans[1].style.cssText = 'opacity:0;transform:scaleX(0)';
        spans[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.cssText = '';
        spans[1].style.cssText = '';
        spans[2].style.cssText = '';
      }
    });
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !ham.contains(e.target)) {
        mobileNav.classList.remove('open');
        ham.querySelectorAll('span').forEach(s => s.style.cssText = '');
      }
    });
    mobileNav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        ham.querySelectorAll('span').forEach(s => s.style.cssText = '');
      });
    });
  }

  /* ── COOKIE BANNER ── */
  const bar = document.getElementById('cookie-bar');
  if (bar) {
    if (!localStorage.getItem('ea_cookie')) bar.style.display = 'flex';
    const btn = document.getElementById('cookie-accept');
    if (btn) btn.addEventListener('click', function() {
      localStorage.setItem('ea_cookie', '1');
      bar.style.display = 'none';
    });
  }
});

/* ═══════════════════════════════════
   FORMSPREE FORM SUBMISSION
   Reads Formspree ID from content.json
   using an absolute path so it works
   on every page regardless of depth.
═══════════════════════════════════ */
async function submitToFormspree(formEl, successId, errorId) {
  const errEl = successId ? null : null; // defined below
  const okEl  = successId ? document.getElementById(successId) : null;
  const errDiv = errorId  ? document.getElementById(errorId)   : null;

  function showError(msg) {
    if (errDiv) {
      errDiv.innerHTML = msg;
      errDiv.style.display = 'block';
    }
  }

  // Build absolute base URL — works on GitHub Pages and any host
  const base = window.location.origin +
    window.location.pathname.split('/').slice(0, -1).join('/');
  // Go up to site root if we're inside /admin/
  const root = window.location.pathname.includes('/admin/')
    ? window.location.origin + window.location.pathname.split('/admin/')[0]
    : base;

  // 1. Read Formspree ID from content.json
  let fid = '';
  try {
    const r = await fetch(root + '/data/content.json?_=' + Date.now());
    if (r.ok) {
      const d = await r.json();
      fid = ((d.site || {}).formspree || '').trim();
    }
  } catch(e) {
    showError('⚠️ Could not load site configuration. Please email us at <a href="mailto:sales.eliteautohaus@gmail.com" style="color:#fff;">sales.eliteautohaus@gmail.com</a>');
    return false;
  }

  // 2. Validate ID
  if (!fid || fid === 'YOUR_FORMSPREE_ID' || fid.length < 6) {
    showError('⚠️ Email is not configured yet. Please email us directly at <a href="mailto:sales.eliteautohaus@gmail.com" style="color:#fff;">sales.eliteautohaus@gmail.com</a>');
    return false;
  }

  const action = 'https://formspree.io/f/' + fid;

  // 3. Submit
  try {
    const res = await fetch(action, {
      method: 'POST',
      body: new FormData(formEl),
      headers: { 'Accept': 'application/json' }
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      formEl.style.display = 'none';
      if (okEl) okEl.style.display = 'block';
      return true;
    } else {
      // Show the actual error from Formspree
      const msg = (data.errors || []).map(e => e.message).join(', ') || ('Error ' + res.status);
      if (res.status === 422) {
        showError('⚠️ Form validation failed: ' + msg + '. Please check all fields are filled in correctly.');
      } else if (res.status === 404) {
        showError('⚠️ Formspree form not found. Please check your Form ID in the admin panel under Site Info & Email. Your current ID may be wrong.');
      } else if (res.status === 403) {
        showError('⚠️ Formspree rejected the submission. Make sure you confirmed your email — Formspree sends a confirmation email when you first create a form. Check your Gmail inbox and spam for an email from Formspree.');
      } else {
        showError('⚠️ Could not send (' + res.status + '): ' + msg + '. Please email us at <a href="mailto:sales.eliteautohaus@gmail.com" style="color:#fff;">sales.eliteautohaus@gmail.com</a>');
      }
      return false;
    }
  } catch(e) {
    showError('⚠️ Network error sending your message. Please check your internet connection or email us at <a href="mailto:sales.eliteautohaus@gmail.com" style="color:#fff;">sales.eliteautohaus@gmail.com</a>');
    return false;
  }
}
