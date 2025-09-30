const counters = document.querySelectorAll('.count');
const speed = 100; // smaller = faster

// Function to animate counter
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const increment = Math.ceil(target / speed);

  const updateCount = () => {
    if (count < target) {
      count += increment;
      counter.innerText = count;
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
}

// Intersection Observer (start when visible)
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      animateCounter(counter);
      observer.unobserve(counter); // Run only once
    }
  });
}, { threshold: 0.5 }); // 50% visible

counters.forEach(counter => {
  observer.observe(counter);
});
