const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".job, .edu, .contact, .card").forEach((node) => {
  node.classList.add("wait");
  reveal.observe(node);
});

const root = document.querySelector("[data-slider]");
if (root) {
  const track = root.querySelector(".track");
  const slides = [...track.children];
  const dotsWrap = root.querySelector("[data-dots]");
  let index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show app " + (i + 1));
    dot.addEventListener("click", () => go(i));
    dotsWrap.appendChild(dot);
  });

  function go(next) {
    index = (next + slides.length) % slides.length;
    track.style.transform = "translateX(" + -index * 100 + "%)";
    [...dotsWrap.children].forEach((dot, i) => {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function play() {
    stop();
    timer = setInterval(() => go(index + 1), 5200);
  }
  function stop() {
    clearInterval(timer);
  }

  root.querySelector("[data-prev]").addEventListener("click", () => {
    go(index - 1);
    play();
  });
  root.querySelector("[data-next]").addEventListener("click", () => {
    go(index + 1);
    play();
  });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", play);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", play);

  go(0);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) play();
}
