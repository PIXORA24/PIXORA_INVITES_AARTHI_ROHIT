document.addEventListener("click", function (e) {
  const card = e.target.closest(".event-card");
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const ripple = document.createElement("span");

  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  card.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});
