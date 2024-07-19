document.addEventListener('DOMContentLoaded', function () {
  
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/about/')) return '../';
    if (path.includes('/footer/')) return '../';
    if (path.includes('/programs/')) return '../';
    return '';
  }

  const basePath = getBasePath();

  
  fetch(`${basePath}navbar.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
      
      updateNavbarLinks(basePath);
    })
    .catch(error => console.error('Error fetching navbar:', error));


  fetch(`${basePath}footerbar.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;

      updateFooterLinks(basePath);
    })
    .catch(error => console.error('Error fetching footer:', error));
});

function updateNavbarLinks(basePath) {
  document.querySelectorAll('.nav-bar a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#')) {
      link.setAttribute('href', `${basePath}${href}`);
    }
  });
  
  const logoImg = document.querySelector('.nav-bar img');
  if (logoImg) {
    logoImg.setAttribute('src', `${basePath}${logoImg.getAttribute('src')}`);
  }
}

function updateFooterLinks(basePath) {
  document.querySelectorAll('.footer-bar a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#')) {
      link.setAttribute('href', `${basePath}${href}`);
    }
  });
}

let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.display = 'none';
  });

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 4000); // 4 seconds
}



document.addEventListener('DOMContentLoaded', showSlides);
