/* shared.js — Elite Autohaus */
document.addEventListener('DOMContentLoaded', function () {

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-nav a').forEach(function(a) {
    if (a.getAttribute('href').split('/').pop() === page) a.classList.add('active');
  });

  /* ── HAMBURGER + MOBILE NAV ── */
  const ham = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (ham && mobileNav) {
    ham.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = mobileNav.classList.toggle('open');
      // Animate hamburger to X
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

    // Close on outside tap
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !ham.contains(e.target)) {
        mobileNav.classList.remove('open');
        ham.querySelectorAll('span').forEach(s => s.style.cssText = '');
      }
    });

    // Close when a nav link is tapped
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
    if (!localStorage.getItem('ea_cookie')) {
      bar.style.display = 'flex';
    }
    const btn = document.getElementById('cookie-accept');
    if (btn) {
      btn.addEventListener('click', function() {
        localStorage.setItem('ea_cookie', '1');
        bar.style.display = 'none';
      });
    }
  }
});

/* ═══════════════════════════════════
   FORMSPREE FORM SUBMISSION
═══════════════════════════════════ */
async function submitToFormspree(formEl, successId, errorId) {
  const errEl = errorId ? document.getElementById(errorId) : null;

  // Try to load Formspree ID from content.json
  let action = formEl.action || '';
  if (!action.includes('formspree')) {
    try {
      const r = await fetch('data/content.json?_=' + Date.now());
      const d = await r.json();
      const fid = ((d.site || {}).formspree || '').trim();
      if (fid && fid !== 'YOUR_FORMSPREE_ID') {
        formEl.action = 'https://formspree.io/f/' + fid;
        action = formEl.action;
      }
    } catch(e) {}
  }

  if (!action.includes('formspree')) {
    if (errEl) {
      errEl.innerHTML = '⚠️ Email sending not configured yet. Please email us directly at <a href="mailto:sales.eliteautohaus@gmail.com" style="color:#fff;text-decoration:underline;">sales.eliteautohaus@gmail.com</a>';
      errEl.style.display = 'block';
    }
    return false;
  }

  try {
    const res = await fetch(action, {
      method: 'POST',
      body: new FormData(formEl),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      formEl.style.display = 'none';
      const okEl = successId ? document.getElementById(successId) : null;
      if (okEl) okEl.style.display = 'block';
      return true;
    } else {
      throw new Error('Server error ' + res.status);
    }
  } catch(e) {
    if (errEl) {
      errEl.innerHTML = '⚠️ Could not send your message. Please email us directly at <a href="mailto:sales.eliteautohaus@gmail.com" style="color:#fff;text-decoration:underline;">sales.eliteautohaus@gmail.com</a>';
      errEl.style.display = 'block';
    }
    return false;
  }
}
