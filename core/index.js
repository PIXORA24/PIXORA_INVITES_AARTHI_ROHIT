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
  <div class="card-media">
    <img src="${event.path}thumb.jpg">
    <div class="card-title">${event.label} Invite</div>
  </div>
`;

card.onclick = () => {
  setTimeout(() => {
    window.location.href = `invite.html?event=${key}`;
  }, 180);
};


  grid.appendChild(card);
});
