const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var portfolioSwiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 30
    }
  }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== EmailJS Integration ====================*/
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS with your public key
  emailjs.init("beVkeo_j7fi9x9GyI");
  
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.createElement('div');
  successMessage.id = 'success-message';
  successMessage.style.cssText = `
      display: none;
      margin-top: 1rem;
      padding: 1rem;
      background-color: rgba(75, 181, 67, 0.1);
      border-radius: 0.5rem;
      text-align: center;
      transition: all 0.3s ease;
  `;
  contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          
          // Show loading state
          submitBtn.innerHTML = `
              <span class="button__loader">
                  <svg viewBox="0 0 24 24" width="24" height="24" style="vertical-align: middle;">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="31.415, 31.415">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                      </circle>
                  </svg>
              </span>
              Sending...
          `;
          submitBtn.disabled = true;
          
          // Add current date to form data
          const formData = new FormData(contactForm);
          formData.append('date', new Date().toLocaleString());
          formData.append('year', new Date().getFullYear());
          
          // Send the email
          emailjs.send('service_tgmrmpa', 'template_q15wtgo', {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toLocaleString(),
            year: new Date().getFullYear()
        })
          .then(function() {
              // Success message
              successMessage.textContent = 'Message sent successfully!';
              successMessage.style.display = 'block';
              successMessage.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
              successMessage.style.color = '#4BB543';
              
              // Reset form
              contactForm.reset();
              
              // Hide message after 5 seconds
              setTimeout(() => {
                  successMessage.style.display = 'none';
              }, 5000);
          }, function(error) {
              // Error message
              successMessage.textContent = 'Failed to send message. Please try again or contact me directly at your@email.com';
              successMessage.style.display = 'block';
              successMessage.style.backgroundColor = 'rgba(255, 59, 48, 0.1)';
              successMessage.style.color = '#ff3b30';
              
              console.error('EmailJS Error:', error);
          })
          .finally(() => {
              // Reset button state
              submitBtn.innerHTML = originalBtnText;
              submitBtn.disabled = false;
          });
      });
  }
});