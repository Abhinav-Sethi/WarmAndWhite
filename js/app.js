// Smooth Scrolling Website with Navigation
class WarmAndWhiteApp {
  constructor() {
    this.init();
  }

  init() {
    console.log('Warm & White App initialized');
    this.setupEventListeners();
    this.updateYear();
    this.hideLoading();
    this.initContactForm();
    this.initProductButtons();
  }

  setupEventListeners() {
    console.log('Setting up event listeners');
    
    // Smooth scrolling for navigation links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        e.preventDefault();
        
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        console.log('Navigation clicked:', targetId, targetElement);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          console.log('Scrolling to:', offsetTop);
          window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
          });
        }
      }
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle?.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });

    // Scroll effects and active navigation
    window.addEventListener('scroll', this.handleScroll);
    
    // Initial active nav update
    setTimeout(() => this.updateActiveNavigation(), 100);
  }

  handleScroll = () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active navigation based on scroll position
    this.updateActiveNavigation();
  }

  updateActiveNavigation() {
    const sections = ['home', 'about', 'products', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link, .nav-brand');
    
    let current = 'home';
    const scrollPosition = window.scrollY + 150; // Add offset for better detection
    
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          current = sectionId;
          break;
        }
      }
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  updateYear() {
    const yearElements = document.querySelectorAll('#year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
  }

  hideLoading() {
    setTimeout(() => {
      const loading = document.getElementById('loading');
      loading.classList.add('hidden');
    }, 800);
  }

  initContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
          messageDiv.innerHTML = '<p style="color: red;">Please fill in all fields.</p>';
          return;
        }
        
        // Simulate form submission
        messageDiv.innerHTML = '<p style="color: var(--primary);">Thank you for your message! We\'ll get back to you soon.</p>';
        form.reset();
      });
    }
  }

  initProductButtons() {
    const addToCartButtons = document.querySelectorAll('.product-card .btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        
        // Simulate add to cart
        button.textContent = 'Added! ✓';
        button.style.background = '#28a745';
        
        setTimeout(() => {
          button.textContent = 'Add to Cart';
          button.style.background = '';
        }, 2000);
      });
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WarmAndWhiteApp();
});