// Chaning Active Link According to the current section
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

function getCurrentSection() {
  for (let i = 0; i < sections.length; i++) {
    let currentSection = sections[i];

    let sectionTop = currentSection.offsetTop;
    let sectionHeight = currentSection.offsetHeight;
    let sectionBottom = sectionTop + sectionHeight;

    if (
      window.scrollY >= sectionTop - 150 &&
      window.scrollY < sectionBottom - 150
    ) {
      if (currentSection.id === "skills-section") {
        return "about";
      }
      return currentSection.id;
    }
  }
}

// Remove active class from navLinks
function removeActiveLinks() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }
}

// Add active class to the current navLink
function addActiveLink(sectionId) {
  removeActiveLinks();

  for (let i = 0; i < navLinks.length; i++) {
    let linkHref = navLinks[i].getAttribute("href");
    if (linkHref === "#" + sectionId) {
      navLinks[i].classList.add("active");
    }
  }
}

let currentSection = getCurrentSection();
addActiveLink(currentSection);

window.addEventListener("scroll", function () {
  currentSection = getCurrentSection();
  addActiveLink(currentSection);
});

// Light Mode and Dark Mode Switch
const htmlElement = document.documentElement;
const themeButton = document.getElementById("theme-toggle-button");

function changeThemeButton() {
  htmlElement.classList.contains("dark");
}
