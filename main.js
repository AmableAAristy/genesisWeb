document.addEventListener('DOMContentLoaded', function () {
  // Function to determine base path based on current URL
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/about/')) return '../';
    if (path.includes('/footer/')) return '../';
    if (path.includes('/programs/')) return '../';
    return ''; // Default base path for root
  }

  const basePath = getBasePath();

  // Fetch and load navbar
  fetch(`${basePath}navbar.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
      // Update links inside navbar after it's loaded
      updateNavbarLinks(basePath);
    })
    .catch(error => console.error('Error fetching navbar:', error));

  // Fetch and load footer
  fetch(`${basePath}footerbar.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
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
  // Update the logo image source
  const logoImg = document.querySelector('.nav-bar img');
  if (logoImg) {
    logoImg.setAttribute('src', `${basePath}${logoImg.getAttribute('src')}`);
  }
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
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}



document.addEventListener('DOMContentLoaded', showSlides);
