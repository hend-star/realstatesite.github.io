const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const searchForm = document.querySelector(".search-box");
const typeFilter = document.querySelector("#typeFilter");
const cityFilter = document.querySelector("#cityFilter");
const priceFilter = document.querySelector("#priceFilter");
const propertyCards = Array.from(document.querySelectorAll(".property-card"));
const emptyState = document.querySelector("#emptyState");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const newsletterForm = document.querySelector(".newsletter");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function filterProperties() {
  const selectedType = typeFilter.value;
  const selectedCity = cityFilter.value;
  const selectedPrice = priceFilter.value;
  let visibleCount = 0;

  propertyCards.forEach((card) => {
    const matchesType = selectedType === "all" || card.dataset.type === selectedType;
    const matchesCity = selectedCity === "all" || card.dataset.city === selectedCity;
    const matchesPrice = selectedPrice === "all" || card.dataset.price === selectedPrice;
    const shouldShow = matchesType && matchesCity && matchesPrice;

    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  emptyState.style.display = visibleCount ? "none" : "block";
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterProperties();
  document.querySelector("#properties").scrollIntoView({ behavior: "smooth", block: "start" });
});

[typeFilter, cityFilter, priceFilter].forEach((filter) => {
  filter.addEventListener("change", filterProperties);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const phone = String(formData.get("phone")).trim();

  if (name.length < 3 || phone.length < 7) {
    formMessage.textContent = "يرجى إدخال اسم ورقم هاتف صحيحين.";
    return;
  }

  formMessage.textContent = "تم استلام طلبك بنجاح. سيتواصل معك مستشارنا قريبا.";
  contactForm.reset();
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.reset();
});
