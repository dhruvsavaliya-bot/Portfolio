// Cursor
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX=0, mouseY=0, ringX=0, ringY=0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, .project-card, .contact-card, .ach-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Typewriter
  const phrases = ['Python Backend Developer', 'AI Developer', 'Data Analyst', 'Flask Developer', 'Full-Stack Builder'];
  let pi = 0, ci = 0, deleting = false;
  const tw = document.getElementById('typewriter');
  function type() {
    const current = phrases[pi];
    if (!deleting) {
      tw.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      tw.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi+1) % phrases.length; }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();

  // Nav scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // Progress bar
    const total = document.body.scrollHeight - window.innerHeight;
    document.getElementById('progressBar').style.width = (window.scrollY / total * 100) + '%';
    // Back to top
    document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
  });

  // Scroll reveal — handles all animation variants
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-pop, .reveal-flip, .reveal-rotate'
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target); // animate once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => observer.observe(el));

  // Skill bars
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.transform = `scaleX(${fill.dataset.width})`;
          fill.classList.add('animated');
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

  // Mobile menu
  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }
  function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
  }



  // ─── MOUSE ORB ─────────────────────────────────────────
  (function() {
    const orb   = document.getElementById('scrollOrb');
    const core  = orb?.querySelector('.orb-core');
    const rings = orb?.querySelectorAll('.orb-ring');
    const label = document.getElementById('orbLabel');
    if (!orb) return;

    const sections = [
      { id: 'hero',         color: '#d4a853', name: 'Home'         },
      { id: 'about',        color: '#00b4d8', name: 'About'        },
      { id: 'skills',       color: '#a78bfa', name: 'Skills'       },
      { id: 'experience',   color: '#34d399', name: 'Experience'   },
      { id: 'projects',     color: '#f472b6', name: 'Projects'     },
      { id: 'certificates', color: '#fb923c', name: 'Certificates' },
      { id: 'education',    color: '#60a5fa', name: 'Education'    },
      { id: 'achievements', color: '#facc15', name: 'Achievements' },
      { id: 'contact',      color: '#4ade80', name: 'Contact'      },
    ];

    function setOrbColor(color, name) {
      orb.style.setProperty('--orb-color', color);
      if (core) {
        core.style.background = color;
        core.style.boxShadow  = `0 0 24px 8px ${color}`;
      }
      if (rings) rings.forEach(r => r.style.borderColor = color);
      if (label) { label.textContent = name; label.style.color = color; }
    }

    // Get which section the mouse is currently inside
    function getSectionAtY(pageY) {
      let active = sections[0];
      sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (!el) return;
        if (pageY >= el.offsetTop - 60) active = s;
      });
      return active;
    }

    // Mouse position (page coords)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.scrollY + window.innerHeight / 2;
    let orbX   = mouseX;
    let orbY   = mouseY - window.scrollY;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY; // page Y
      const s = getSectionAtY(mouseY);
      setOrbColor(s.color, s.name);
    });

    // Init
    setOrbColor(sections[0].color, sections[0].name);
    orb.style.left = orbX + 'px';
    orb.style.top  = orbY + 'px';

    // Smooth follow loop
    function loop() {
      const targetX = mouseX;
      const targetY = mouseY - window.scrollY; // back to viewport Y
      orbX += (targetX - orbX) * 0.1;
      orbY += (targetY - orbY) * 0.1;
      orb.style.left = orbX + 'px';
      orb.style.top  = orbY + 'px';
      requestAnimationFrame(loop);
    }
    loop();
  })();

  // ─── ROBOT SPEECH BUBBLE ────────────────────────────────
  const robotMessages = [
    "Hi! I'm Dhruv's AI buddy 🤖",
    "Need a Python dev? Look no further!",
    "I run on caffeine & clean code ☕",
    "Let's build something amazing!",
    "Beep boop... Loading awesomeness...",
    "pip install dhruv → instant genius 🐍",
    "404: Boring devs not found here!",
    "My circuits say: hire this guy! ⚡",
  ];

  const bubble = document.getElementById('robotBubble');
  const bubbleText = document.getElementById('bubbleText');
  const bubbleCursor = document.querySelector('.bubble-cursor');

  if (bubble && bubbleText) {
    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let bubbleActive = false;

    function typeBubble() {
      const msg = robotMessages[msgIndex];
      if (!isDeleting) {
        charIndex++;
        bubbleText.textContent = msg.slice(0, charIndex);
        if (charIndex === msg.length) {
          bubbleCursor.classList.add('hidden');
          isDeleting = true;
          setTimeout(typeBubble, 2600);
          return;
        }
        setTimeout(typeBubble, 55);
      } else {
        charIndex--;
        bubbleText.textContent = msg.slice(0, charIndex);
        if (charIndex === 0) {
          bubbleCursor.classList.remove('hidden');
          isDeleting = false;
          msgIndex = (msgIndex + 1) % robotMessages.length;
          setTimeout(typeBubble, 400);
          return;
        }
        setTimeout(typeBubble, 28);
      }
    }

    // Show bubble after a short delay (feels like the robot "woke up")
    setTimeout(() => {
      bubble.classList.add('visible');
      typeBubble();
    }, 1800);
  }