const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".job, .edu, .contact").forEach((node) => {
  node.classList.add("wait");
  reveal.observe(node);
});
