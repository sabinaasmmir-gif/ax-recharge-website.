// AX RECHARGE WEBSITE — Interactive Navigation, Service Previews & Validation

const SERVICE_CONFIG = {
  mobile: {
    name: 'Mobile Recharge',
    providerLabel: 'Sample Operator Category (Placeholder)',
    providers: [
      'Select sample prepaid category',
      'National Prepaid Operator (Placeholder)',
      'Regional Circle Operator (Placeholder)',
    ],
    identifierLabel: 'Sample 10-Digit Mobile Number',
    identifierPlaceholder: 'e.g. 9876543210 (demo only)',
    identifierHint: 'Enter 10 digits to test format validation. Not transmitted.',
    defaultAmount: 299,
    quickAmounts: [199, 299, 599],
    validate(val) {
      return /^[6-9]\d{9}$/.test(val.trim())
        ? ''
        : 'Please enter a valid 10-digit sample mobile number starting with 6–9.';
    },
  },
  dth: {
    name: 'DTH Recharge',
    providerLabel: 'Sample DTH Provider Category (Placeholder)',
    providers: [
      'Select sample DTH category',
      'Direct-to-Home Broadcaster A (Placeholder)',
      'Direct-to-Home Broadcaster B (Placeholder)',
    ],
    identifierLabel: 'Sample Subscriber / Customer ID',
    identifierPlaceholder: 'e.g. 1029384756 (demo only)',
    identifierHint: 'Enter 8–12 alphanumeric characters to test format validation.',
    defaultAmount: 350,
    quickAmounts: [250, 350, 500],
    validate(val) {
      return /^[A-Za-z0-9]{8,12}$/.test(val.trim())
        ? ''
        : 'Please enter an 8–12 character sample Subscriber ID.';
    },
  },
  electricity: {
    name: 'Electricity Bills',
    providerLabel: 'Sample Electricity Board (Placeholder)',
    providers: [
      'Select sample electricity board',
      'State Power Utility Board (Placeholder)',
      'Metro Distribution Utility (Placeholder)',
    ],
    identifierLabel: 'Sample Consumer / CA Number',
    identifierPlaceholder: 'e.g. EL10459283 (demo only)',
    identifierHint: 'Enter 6–14 alphanumeric characters to test format validation.',
    defaultAmount: 1250,
    quickAmounts: [500, 1250, 2500],
    validate(val) {
      return /^[A-Za-z0-9-]{6,14}$/.test(val.trim())
        ? ''
        : 'Please enter a 6–14 character sample Consumer Number.';
    },
  },
  water: {
    name: 'Water Bills',
    providerLabel: 'Sample Municipal Water Board (Placeholder)',
    providers: [
      'Select sample water authority',
      'Municipal Water Supply Board (Placeholder)',
      'Urban Water Authority (Placeholder)',
    ],
    identifierLabel: 'Sample K-Number / Connection ID',
    identifierPlaceholder: 'e.g. WTR449102 (demo only)',
    identifierHint: 'Enter 6–14 alphanumeric characters to test format validation.',
    defaultAmount: 450,
    quickAmounts: [300, 450, 900],
    validate(val) {
      return /^[A-Za-z0-9-]{6,14}$/.test(val.trim())
        ? ''
        : 'Please enter a 6–14 character sample Water Connection ID.';
    },
  },
  gas: {
    name: 'Gas Bills',
    providerLabel: 'Sample Piped Gas Provider (Placeholder)',
    providers: [
      'Select sample gas distributor',
      'City Piped Natural Gas Provider (Placeholder)',
      'Regional PNG Distributor (Placeholder)',
    ],
    identifierLabel: 'Sample Customer / BP Number',
    identifierPlaceholder: 'e.g. BP90218473 (demo only)',
    identifierHint: 'Enter 6–14 alphanumeric characters to test format validation.',
    defaultAmount: 820,
    quickAmounts: [500, 820, 1400],
    validate(val) {
      return /^[A-Za-z0-9-]{6,14}$/.test(val.trim())
        ? ''
        : 'Please enter a 6–14 character sample Gas BP Number.';
    },
  },
};

function initWebsite() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  initMobileMenu();
  initServicePreview();
  initPolicyFilter();
  initContactForm();
  initActiveSectionHighlight();
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!toggleBtn || !drawer) return;

  const setOpen = (isOpen) => {
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    drawer.hidden = !isOpen;
  };

  toggleBtn.addEventListener('click', () => {
    const currentlyOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    setOpen(!currentlyOpen);
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggleBtn.focus();
    }
  });
}

function initServicePreview() {
  const tabButtons = document.querySelectorAll('[data-service-tab]');
  const providerSelect = document.getElementById('previewProvider');
  const providerLabel = document.getElementById('previewProviderLabel');
  const identifierInput = document.getElementById('previewIdentifier');
  const identifierLabel = document.getElementById('previewIdentifierLabel');
  const identifierHint = document.getElementById('previewIdentifierHint');
  const amountInput = document.getElementById('previewAmount');
  const quickAmountsContainer = document.getElementById('quickAmounts');
  const previewForm = document.getElementById('servicePreviewForm');
  const feedbackBox = document.getElementById('previewFeedback');

  if (
    !providerSelect ||
    !providerLabel ||
    !identifierInput ||
    !identifierLabel ||
    !identifierHint ||
    !amountInput ||
    !quickAmountsContainer ||
    !previewForm ||
    !feedbackBox
  ) {
    return;
  }

  let activeService = 'mobile';

  const renderQuickAmounts = (amounts) => {
    quickAmountsContainer.innerHTML = '';
    amounts.forEach((amt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quick-amt-btn';
      btn.textContent = `₹${amt}`;
      btn.addEventListener('click', () => {
        amountInput.value = String(amt);
        quickAmountsContainer.querySelectorAll('.quick-amt-btn').forEach((el) => {
          el.classList.toggle('is-active', el === btn);
        });
      });
      quickAmountsContainer.appendChild(btn);
    });
  };

  const selectService = (serviceKey) => {
    const config = SERVICE_CONFIG[serviceKey];
    if (!config) return;
    activeService = serviceKey;

    tabButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-service-tab') === serviceKey;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });

    providerLabel.textContent = config.providerLabel;
    providerSelect.innerHTML = '';
    config.providers.forEach((label, idx) => {
      const option = document.createElement('option');
      option.value = idx === 0 ? '' : label;
      option.textContent = label;
      providerSelect.appendChild(option);
    });

    identifierLabel.textContent = config.identifierLabel;
    identifierInput.value = '';
    identifierInput.placeholder = config.identifierPlaceholder;
    identifierHint.textContent = config.identifierHint;
    amountInput.value = String(config.defaultAmount);
    renderQuickAmounts(config.quickAmounts);

    feedbackBox.hidden = true;
    feedbackBox.classList.remove('is-error');
    feedbackBox.innerHTML = '';
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-service-tab');
      if (key) selectService(key);
    });
  });

  document.querySelectorAll('[data-select-service]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const key = trigger.getAttribute('data-select-service');
      if (key) {
        selectService(key);
        const homeSection = document.getElementById('home');
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
        }
        identifierInput.focus({ preventScroll: true });
      }
    });
  });

  previewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const config = SERVICE_CONFIG[activeService];
    const providerVal = providerSelect.value;
    const identifierVal = identifierInput.value.trim();
    const amountVal = Number(amountInput.value);

    const showPreviewError = (message) => {
      feedbackBox.hidden = false;
      feedbackBox.classList.add('is-error');
      feedbackBox.textContent = message;
    };

    if (!providerVal) {
      showPreviewError('Please select a sample provider category to preview the workflow.');
      providerSelect.focus();
      return;
    }

    const idError = config.validate(identifierVal);
    if (idError) {
      showPreviewError(idError);
      identifierInput.focus();
      return;
    }

    if (!Number.isFinite(amountVal) || amountVal < 10 || amountVal > 50000) {
      showPreviewError('Please enter an illustrative amount between ₹10 and ₹50,000.');
      amountInput.focus();
      return;
    }

    feedbackBox.hidden = false;
    feedbackBox.classList.remove('is-error');
    feedbackBox.innerHTML = '';

    const heading = document.createElement('strong');
    heading.textContent = 'Preview Summary (No Payment Processed)';

    const grid = document.createElement('div');
    grid.className = 'preview-summary-grid';

    const rows = [
      ['Service Module', config.name],
      ['Sample Provider', providerVal],
      ['Sample Identifier', identifierVal],
      ['Illustrative Amount', `₹${amountVal.toLocaleString('en-IN')}`],
      ['Live Transaction Status', 'Unavailable — Provider Integration Pending'],
    ];

    rows.forEach(([label, val]) => {
      const row = document.createElement('div');
      row.className = 'preview-summary-row';
      const spanLabel = document.createElement('span');
      spanLabel.textContent = label;
      const strongVal = document.createElement('strong');
      strongVal.textContent = val;
      row.append(spanLabel, strongVal);
      grid.appendChild(row);
    });

    feedbackBox.append(heading, grid);
  });

  selectService('mobile');
}

function initPolicyFilter() {
  const filterButtons = document.querySelectorAll('[data-policy-filter]');
  const policyCards = document.querySelectorAll('[data-policy-card]');
  if (!filterButtons.length || !policyCards.length) return;

  const applyFilter = (target) => {
    filterButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-policy-filter') === target);
    });

    policyCards.forEach((card) => {
      const cardId = card.getAttribute('data-policy-card');
      card.hidden = target !== 'all' && cardId !== target;
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-policy-filter') || 'all';
      applyFilter(target);
    });
  });

  const syncHashToPolicyFilter = () => {
    const hash = window.location.hash.replace('#', '');
    if (['privacy-policy', 'terms-conditions', 'refund-policy', 'grievance-support'].includes(hash)) {
      applyFilter('all');
    }
  };

  window.addEventListener('hashchange', syncHashToPolicyFilter);
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('contactFormStatus');
  if (!form || !statusEl) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const topicInput = document.getElementById('contactTopic');
  const messageInput = document.getElementById('contactMessage');

  const showStatus = (type, text) => {
    statusEl.hidden = false;
    statusEl.classList.remove('is-success', 'is-error');
    statusEl.classList.add(type === 'success' ? 'is-success' : 'is-error');
    statusEl.textContent = text;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const topic = topicInput.value;
    const message = messageInput.value.trim();

    if (name.length < 2) {
      showStatus('error', 'Please enter your name (at least 2 characters).');
      nameInput.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('error', 'Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (message.length < 10) {
      showStatus('error', 'Please enter a message of at least 10 characters.');
      messageInput.focus();
      return;
    }

    const sensitivePattern = /\b(upi\s*pin|cvv|otp|password|card\s*number)\b/i;
    if (sensitivePattern.test(message)) {
      showStatus(
        'error',
        'For your security, please remove any mention of UPI PINs, OTPs, passwords, or card numbers before submitting.'
      );
      messageInput.focus();
      return;
    }

    const refId = `AX-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    showStatus(
      'success',
      `Inquiry validated locally (${refId} · ${topic}). Because this is a static preview site, please send urgent messages directly to the placeholder support email once live channels are published.`
    );
    form.reset();
  });
}

function initActiveSectionHighlight() {
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = ['home', 'about', 'services', 'contact', 'policies']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!navLinks.length || !sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          link.classList.toggle('is-active', href === `#${id}`);
        });
      });
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebsite);
} else {
  initWebsite();
}
