const events = Object.entries(INVITE_CONFIG.events)
  .filter(([_, e]) => e.enabled);

if (events.length === 1) {
  window.location.replace(
    `invite.html?event=${events[0][0]}`
  );
}

const grid = document.getElementById("eventGrid");

events.forEach(([key, event]) => {
  const card = document.createElement("div");
  card.className = "event-card";

  card.innerHTML = `
    <img src="${event.path}preview.jpg">
    <div class="event-label">${event.label}</div>
  `;

  card.onclick = () => {
    window.location.href = `invite.html?event=${key}`;
  };

  grid.appendChild(card);
});
