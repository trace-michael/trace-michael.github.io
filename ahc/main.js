// change navbar styles on scroll

window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("window-scroll", window.scrollY > 0);
});

// reveal or conceal FAQs answers

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");

    //icon change
    const icon = faq.querySelector(".faq__icon i");
    if (icon.className === "fab fa-plus") {
      icon.className = "fas fa-minus";
    } else {
      icon.className = "fab fa-plus";
    }
  });
});
