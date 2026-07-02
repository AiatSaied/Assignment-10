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

  let darkMode = htmlElement.classList.contains("dark");

  // themeButton.setAttribute("aria-pressed", darkMode);

  if (darkMode) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

themeButton.addEventListener("click", toggleTheme);

// Navs and tabs for Portfolio section
const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

// Add active style to the selected filter
function addActiveFilter(button) {
  button.classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50",
  );
  button.classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "border",
    "border-slate-300",
    "dark:border-slate-700",
  );
}
// Remove active style from one filter
function removeActiveFilter() {
  for (let i = 0; i < portfolioFilters.length; i++) {
    portfolioFilters[i].classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
    );
    portfolioFilters[i].classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
  }
}

// function filterPortfolioItems(category) {
//   for (let i = 0; i < portfolioItems.length; i++) {
//     let itemCategory = portfolioItems[i].getAttribute("data-category");

//     if (category === "all" || category === itemCategory) {
//       portfolioItems[i].style.display = "block";
//     } else {
//       portfolioItems[i].style.display = "none";
//     }
//   }
// }
function filterPortfolioItems(category) {
  for (let i = 0; i < portfolioItems.length; i++) {
    let item = portfolioItems[i];
    let itemCategory = item.getAttribute("data-category");

    if (category === "all" || category === itemCategory) {
      item.style.display = "block";

      setTimeout(function () {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, 150);
    } else {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";

      setTimeout(function () {
        item.style.display = "none";
      }, 200);
    }
  }
}

for (let i = 0; i < portfolioFilters.length; i++) {
  portfolioFilters[i].addEventListener("click", function () {
    let targetCategory = this.getAttribute("data-filter");

    removeActiveFilter();
    addActiveFilter(this);
    filterPortfolioItems(targetCategory);
  });
}

// Action of Carousel / Slider in Testimonials section
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const prevButton = document.getElementById("prev-testimonial");
const nextButton = document.getElementById("next-testimonial");
const carouselIndicators = document.querySelectorAll(".carousel-indicator");

let currentSlide = 0;

function getCardsView() {
  if (window.innerWidth >= 1024) {
    return 3; // Desktop
  } else if (window.innerWidth >= 640) {
    return 2; // Tablet
  } else {
    return 1; // Mobile
  }
}

function updateCarousel() {
  let cardsView = getCardsView();

  let cardWidth = 100 / cardsView;

  let translateValue = currentSlide * cardWidth;

  testimonialsCarousel.style.transform = `translateX(+${translateValue}%)`;
}

function getMaxSlide() {
  return testimonialCards.length - getCardsView();
}

function nextSlide() {
  currentSlide++;

  if (currentSlide > getMaxSlide()) {
    currentSlide = 0;
  }

  updateCarousel();
}

function previousSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = getMaxSlide();
  }

  updateCarousel();
}

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);

function updateIndicators() {
  for (let i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove("bg-primary", "scale-125");

    indicators[i].classList.add("bg-slate-300", "dark:bg-slate-600");
  }
}

window.addEventListener("resize", function () {
  updateCarousel();
});
