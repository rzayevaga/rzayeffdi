/*----------------- Navigation Menu --------------------*/
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeNavBtn = navMenu ? navMenu.querySelector(".close-nav-menu") : null;

  if (hamburgerBtn && navMenu && closeNavBtn) {
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
  }

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect() {
    const fadeElem = document.querySelector(".fade-out-effect");
    if (fadeElem) {
      fadeElem.classList.add("active");
      setTimeout(() => {
        fadeElem.classList.remove("active");
      }, 300);
    }
  }

  // Naviqasiya linklərinə klik hadisəsi
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;

        // Cari aktiv bölməni deaktivləşdiririk
        const currentSection = document.querySelector(".section.active");
        if (currentSection) {
          currentSection.classList.add("hide");
          currentSection.classList.remove("active");
        }
        // Yeni bölməni aktivləşdiririk
        const targetSection = document.querySelector(hash);
        if (targetSection) {
          targetSection.classList.add("active");
          targetSection.classList.remove("hide");
        }
        // Naviqasiya menyusundakı aktiv elementi yeniləyirik
        if (navMenu.classList.contains("open")) {
          const activeNavItem = navMenu.querySelector(".active");
          if (activeNavItem) {
            activeNavItem.classList.remove("active", "inner-shadow");
            activeNavItem.classList.add("outer-shadow", "hover-in-shadow");
          }
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // URL-ə hash əlavə edirik
        window.location.hash = hash;
      }
    }
  });
})();

/*----------- Aktiv olmayan bölmələri gizlət --------------*/
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

/*---------------- Preloader Fade-Out ----------------*/
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});

/*---------------- Body Scrolling Toggle ----------------*/
function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}
