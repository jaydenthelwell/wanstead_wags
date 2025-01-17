const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navbarText = document.querySelectorAll('.navbar-text-color');
const logoImage = document.querySelector('#logo-image');
const openBtn = document.querySelector('.openbtn');

console.log("Background.js is loaded!");

window.addEventListener('scroll', () => {
  let currentSection = Array.from(sections).find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
  });

  if (currentSection) {
    if (currentSection.id === "section1" && currentSection.classList.contains('image-bg')) {
      navbar.style.backgroundColor = 'transparent';
    } else if (currentSection.classList.contains('color-bg')) {
      navbar.style.backgroundColor = window.getComputedStyle(currentSection).backgroundColor;
    }

    navbarText.forEach(link => {
      if (currentSection.id === "section3" || currentSection.id === "section4" || currentSection.id === "section6") {
        link.style.setProperty('color', '#032B22', 'important');
        openBtn.style.color = "#032B22"
        link.style.setProperty('text-shadow', '', 'important');
        logoImage.src = logoImage.dataset.darkSrc;
      } else {
        openBtn.style.color = "#EFEDE7"
        link.style.setProperty('color', '', 'important');
        link.style.setProperty('text-shadow', '2px 2px 4px rgba(0, 0, 0, 0.5)', 'important');
      }
    });

    if (!(currentSection.id === "section3" || currentSection.id === "section4" || currentSection.id === "section6")) {
      logoImage.src = logoImage.dataset.defaultSrc;
    }
  }
});
