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


  addHeadElements(basePath);
});//end load

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


function addHeadElements(basePath) {
  const head = document.head;

  const headElements = [
    `<link rel="apple-touch-icon" sizes="180x180" href="${basePath}/assets/favicom/apple-touch-icon.png">`,
    `<link rel="icon" type="image/png" sizes="32x32" href="${basePath}/assets/favicom/favicon-32x32.png">`,
    `<link rel="icon" type="image/png" sizes="16x16" href="${basePath}/assets/favicom/favicon-16x16.png">`,
    `<link rel="manifest" href="${basePath}/assets/favicom/site.webmanifest">`,
    `<link rel="mask-icon" href="${basePath}/assets/favicom/safari-pinned-tab.svg" color="#5bbad5">`,
    `<meta name="msapplication-TileColor" content="#da532c">`,
    `<meta name="theme-color" content="#ffffff">`
  ];


  headElements.forEach(elementString => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = elementString;
    const element = tempDiv.firstChild;
    head.appendChild(element);
  });
}
