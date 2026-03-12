// Theme Toggle Logic
const initTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');
  if (theme === 'dark') {
    moonIcon?.classList.add('hidden');
    sunIcon?.classList.remove('hidden');
  } else {
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
  }
};

// Intersection Observer for Animations
const initAnimations = () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
};

const setHeroImage = () => {
  const getPath = (filename) => {
    // Determine if we are in a subfolder (pages/) or root
    const isSubpage = window.location.pathname.includes('/pages/') || window.location.href.includes('/pages/');
    const prefix = isSubpage ? '../src/assets/images/' : 'src/assets/images/';
    return `${prefix}${filename}`;
  };

  const heroImg = document.getElementById('hero-img-placeholder');
  if (heroImg) {
    heroImg.style.backgroundImage = `url('${getPath('steuerberater_hero_image.png')}')`;
    heroImg.style.backgroundSize = 'cover';
    heroImg.style.backgroundPosition = 'center';
  }

  const advImg = document.getElementById('adv-img-placeholder');
  if (advImg) {
    advImg.style.backgroundImage = `url('${getPath('steuerberater_advantages_image.png')}')`;
    advImg.style.backgroundSize = 'cover';
    advImg.style.backgroundPosition = 'center';
  }

  const aboutImg = document.getElementById('about-img-placeholder');
  if (aboutImg) {
    aboutImg.style.backgroundImage = `url('${getPath('steuerberater_advantages_image.png')}')`; // Reuse for now
    aboutImg.style.backgroundSize = 'cover';
    aboutImg.style.backgroundPosition = 'center';
  }

  // Team Members
  const members = ['team-1', 'team-2', 'team-3'];
  members.forEach((id, index) => {
    const el = document.getElementById(`${id}-placeholder`);
    if (el) {
      el.style.backgroundImage = `url('${getPath(`steuerberater_team_member_${index + 1}.png`)}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
  });

  const exteriorImg = document.getElementById('office-exterior-placeholder');
  if (exteriorImg) {
    exteriorImg.style.backgroundImage = `url('${getPath('steuerberater_office_exterior_1773301606443.png')}')`;
    exteriorImg.style.backgroundSize = 'cover';
    exteriorImg.style.backgroundPosition = 'center';
  }

  const privatImg = document.getElementById('privat-img-placeholder');
  if (privatImg) {
    privatImg.style.backgroundImage = `url('${getPath('steuerberater_hero_image_1773301366560.png')}')`;
    privatImg.style.backgroundSize = 'cover';
    privatImg.style.backgroundPosition = 'center';
  }

  const leistungenImg = document.getElementById('leistungen-img-placeholder');
  if (leistungenImg) {
    leistungenImg.style.backgroundImage = `url('${getPath('steuerberater_advantages_image_1773301425802.png')}')`;
    leistungenImg.style.backgroundSize = 'cover';
    leistungenImg.style.backgroundPosition = 'center';
  }

  const advUnternehmenImg = document.getElementById('advantages-unternehmen-placeholder');
  if (advUnternehmenImg) {
    advUnternehmenImg.style.backgroundImage = `url('${getPath('steuerberater_advantages_image_1773301425802.png')}')`;
    advUnternehmenImg.style.backgroundSize = 'cover';
    advUnternehmenImg.style.backgroundPosition = 'center';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAnimations();
  setHeroImage();
  
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Smooth Scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Active Link Handling
  const currentPath = window.location.pathname;
  document.querySelectorAll('.desktop-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  const openMenu = () => {
    mobileNav?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileNav?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileMenuBtn?.addEventListener('click', openMenu);
  closeMenuBtn?.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Staggered Reveal Logic
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('reveal');
          }, index * 150);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.services-grid, .team-grid, .footer-grid').forEach(grid => {
    grid.querySelectorAll(':scope > *').forEach(item => item.classList.add('stagger-item'));
    staggerObserver.observe(grid);
  });

  // Add Background Blobs
  const createBlobs = () => {
    const main = document.querySelector('main');
    if (!main) return;
    for (let i = 0; i < 3; i++) {
      const blob = document.createElement('div');
      blob.className = 'bg-blob';
      blob.style.top = `${Math.random() * 80 + 10}%`;
      blob.style.left = `${Math.random() * 80 + 10}%`;
      main.appendChild(blob);
    }
  };
  createBlobs();
});
