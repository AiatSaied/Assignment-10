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

// Local Storage for the current theme
function localStorageTheme() {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }
}
localStorageTheme();

// Change Theme when I click on the theme button
function toggleTheme() {
  htmlElement.classList.toggle("dark");

  // themeButton.setAttribute(
  //   "aria-pressed",
  //   htmlElement.classList.contains("dark"),
  // );

  if (htmlElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

themeButton.addEventListener("click", toggleTheme);
