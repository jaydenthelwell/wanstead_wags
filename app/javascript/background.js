const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navbarText = document.querySelectorAll('.navbar-text-color');
const logoImage = document.querySelector('#logo-image');
const openBtn = document.querySelector('.openbtn');

console.log("Background.js is loaded!");

document.addEventListener('turbo:load', function() {
  // Check if the page has been reloaded already
  if (!sessionStorage.getItem('reloaded')) {
    // Set the flag in session storage
    sessionStorage.setItem('reloaded', 'true');
    // Reload the page
    window.location.reload();
  } else {
    // Clear the flag for future navigations
    sessionStorage.removeItem('reloaded');
  }
});


const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

function applyStylesForSection(section) {
  if (section.id === "section1" && section.classList.contains('image-bg')) {
    navbar.style.backgroundColor = 'transparent';
    navbar.style.boxShadow = "none"
  } else if (section.classList.contains('color-bg')) {
    navbar.style.backgroundColor = window.getComputedStyle(section).backgroundColor;
  }

  navbarText.forEach(link => {
    if (["section3", "section4", "section6"].includes(section.id)) {
      console.log("section 3 4 6!");
      link.style.setProperty('color', '#032B22', 'important');
      openBtn.style.color = "#032B22";
      link.style.setProperty('text-shadow', '', 'important');
      logoImage.src = logoImage.dataset.darkSrc;
    } else {
      openBtn.style.color = "#EFEDE7";
      link.style.setProperty('color', '', 'important');
      link.style.setProperty('text-shadow', '2px 2px 4px rgba(0, 0, 0, 0.5)', 'important');
    }
  });

  if (!["section3", "section4", "section6"].includes(section.id)) {
    logoImage.src = logoImage.dataset.defaultSrc;
  }
}

function checkInitialSection() {
  const currentSection = Array.from(sections).find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.7;
  });

  if (currentSection) {
    applyStylesForSection(currentSection);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed!");

  checkInitialSection();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        applyStylesForSection(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
