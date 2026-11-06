/**
 * Children of Adam (COA) - Interactive Engine
 * Theme: Oxygen Builder Charity Aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // 3. Impact Counters Count-Up Animation
  const statNumbers = document.querySelectorAll('.num[data-target], .impact-stat-num[data-target]');
  let hasAnimatedCounters = false;

  function runCounters() {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = prefix + target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedCounters) {
        hasAnimatedCounters = true;
        runCounters();
      }
    });
  }, { threshold: 0.25 });

  const impactSection = document.getElementById('impactBand') || document.getElementById('impactSection');
  if (impactSection) observer.observe(impactSection);

  // 4. Newsletter Forms
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast(`JazakAllah Khair! You are now subscribed: ${emailInput.value}`, 'success');
        form.reset();
      }
    });
  });

  // 5. Modal Amount & Frequency Selection
  const modalAmountBtns = document.querySelectorAll('.modal-amount-btn');
  const modalCustomAmount = document.getElementById('modalCustomAmount');

  modalAmountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalAmountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (modalCustomAmount) modalCustomAmount.value = '';
    });
  });

  if (modalCustomAmount) {
    modalCustomAmount.addEventListener('input', (e) => {
      if (e.target.value) {
        modalAmountBtns.forEach(b => b.classList.remove('active'));
      }
    });
  }

  const modalFreqBtns = document.querySelectorAll('.modal-freq-btn');
  modalFreqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalFreqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Process Donation Form Submission
  const donateForm = document.getElementById('donationForm');
  if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeAmtBtn = document.querySelector('.modal-amount-btn.active');
      const customVal = modalCustomAmount ? modalCustomAmount.value : null;
      const finalAmt = customVal || (activeAmtBtn ? activeAmtBtn.getAttribute('data-val') : '100');
      const cause = document.getElementById('donateModalCause') ? document.getElementById('donateModalCause').value : 'General Fund';
      
      closeModal('donateModal');
      showToast(`JazakAllah Khair! Received donation of $${finalAmt} for ${cause}. 100% policy applied.`, 'success');
      donateForm.reset();
    });
  }

  // Process Volunteer Form Submission
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('volName')?.value || 'Friend';
      closeModal('volunteerModal');
      showToast(`Welcome to the COA Volunteer Family, ${name}! We will reach out shortly.`, 'success');
      volunteerForm.reset();
    });
  }

  // Process Ask COA Question Form
  const askForm = document.getElementById('askCoaForm');
  if (askForm) {
    askForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('askModal');
      showToast('Your question has been submitted for this Tuesday’s live session (9 PM EST)!', 'success');
      askForm.reset();
    });
  }
});

/* ==========================================================================
   GLOBAL MODALS & TOAST NOTIFICATIONS
   ========================================================================== */

function showToast(message, type = 'info') {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '<i class="fa-solid fa-circle-check" style="color:#68a735"></i>' :
               type === 'error' ? '<i class="fa-solid fa-circle-exclamation" style="color:#d32f2f"></i>' :
               '<i class="fa-solid fa-circle-info" style="color:#0284c7"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

function openDonateModal(programName = 'General Fund', amount = '100', freq = 'One-Time') {
  const modal = document.getElementById('donateModal');
  if (!modal) return;

  const titleEl = document.getElementById('donateModalProgramTitle');
  if (titleEl) titleEl.innerText = programName ? `Support: ${programName}` : 'Support Children of Adam';

  const causeSelect = document.getElementById('donateModalCause');
  if (causeSelect && programName) {
    for (let opt of causeSelect.options) {
      if (opt.text.toLowerCase().includes(programName.toLowerCase())) {
        causeSelect.value = opt.value;
        break;
      }
    }
  }

  const modalFreqBtns = document.querySelectorAll('.modal-freq-btn');
  modalFreqBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-freq') === freq);
  });

  const modalAmountBtns = document.querySelectorAll('.modal-amount-btn');
  const modalCustomAmount = document.getElementById('modalCustomAmount');
  let matched = false;

  modalAmountBtns.forEach(btn => {
    if (btn.getAttribute('data-val') === String(amount)) {
      btn.classList.add('active');
      matched = true;
    } else {
      btn.classList.remove('active');
    }
  });

  if (!matched && modalCustomAmount) {
    modalCustomAmount.value = amount;
  } else if (modalCustomAmount) {
    modalCustomAmount.value = '';
  }

  openModal('donateModal');
}
