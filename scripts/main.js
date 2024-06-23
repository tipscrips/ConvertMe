const heroEL = document.querySelector(".hero");
const header = document.querySelector(".header");
const sections = [];
const obsHero = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      header.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      header.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-85px'
  }
);
obsHero.observe(heroEL);



const allLinks = document.querySelectorAll("a");
let prevNavLink = null
allLinks.forEach((link) => {
  if (link.classList.contains("selected")) prevNavLink = link
})
allLinks.forEach(function (link) {
  const href = link.getAttribute("href");
  if (href !== "#" && href.startsWith("#")) {
    sections.push(document.querySelector(href))
  }

  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEL = document.querySelector(href);
      sections.push(sectionEL)
      sectionEL.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("header__menu-link")) {
      if (prevNavLink) prevNavLink.classList.toggle("selected");
      link.classList.toggle("selected");
      prevNavLink = link;
    }
  });
});

function onEntry(entries) {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      const currentSectionName = ent.target.id;
      const currentNavLink = document.querySelector(`[href="#${currentSectionName}"]`)
      if (prevNavLink) prevNavLink.classList.toggle("selected");
      currentNavLink.classList.toggle("selected");
      prevNavLink = currentNavLink;
    }
  })
}

let sectionsObserver = new IntersectionObserver(onEntry,   {
  root: null,
  threshold: 0,
})

sections.forEach(section => {
  sectionsObserver.observe(section)
})

const allButtons = document.body.querySelectorAll("button");
let prevFaqButton = null;
let prevTestimonialButton = null;
allButtons.forEach((button) => {
  if (button.classList.contains("faq__menu-button") && button.classList.contains("selected")) prevFaqButton = button;
  if (button.classList.contains("testimonial__button") && button.classList.contains("selected")) prevTestimonialButton = button;
});
allButtons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    if (button.classList.contains("faq__menu-button")) {
      if (prevFaqButton) {
        prevFaqButton.classList.toggle("selected");
        prevFaqButton.classList.toggle("color-accent-text");
      }
      button.classList.toggle("selected");
      button.classList.toggle("color-accent-text");
      prevFaqButton = button;
      
      switchSlid(button.name, `.faq__list`)
    }

    if (button.classList.contains("testimonial__button")) {
      if (prevTestimonialButton) {
        prevTestimonialButton.classList.toggle("selected");
        prevTestimonialButton.classList.toggle("scale-s");
      };
      button.classList.toggle("selected");
      button.classList.toggle("scale-s");
      prevTestimonialButton = button;
      
      switchSlid(button.name, '.testimonial__body')
    }
  })
});

function switchSlid (title, section) {
  const slids = document.querySelectorAll(section) 
  slids.forEach(slid => {
    if (!slid.classList.contains('visually-hidden')) {
      slid.classList.toggle('visually-hidden')
    }

    if (slid.id === title) slid.classList.toggle('visually-hidden')
  })
};


const modal = document.body.querySelector('.modal');

const closeModalButton = modal.querySelector('.modal__close-button');
closeModalButton.addEventListener('click', closeModal);

const openModalButton = document.body.querySelector(".header__button");
openModalButton.addEventListener('click', openModal);

const requestQuoteButten = document.body.querySelector(".hero__button.button");
requestQuoteButten.addEventListener('click', openModal);

const backdrop = modal.querySelector('.modal__backdrop')
backdrop.addEventListener('click', closeModal)

function openModal(e) {
  modal.classList.remove('visually-hidden')
  document.documentElement.classList.toggle('scroll-none')
  const nameInput = modal.querySelector('.modal__field-input')
  nameInput.focus()
}

function closeModal(e) {
  modal.classList.add('visually-hidden')
  document.documentElement.classList.toggle('scroll-none')
  
}