const params = new URLSearchParams(window.location.search);
const key = params.get("event");

const event = INVITE_CONFIG.events[key];
if (!event) {
  document.body.innerHTML = "Invalid event";
  throw new Error("Invalid event");
}

/* DOM */
const video = document.getElementById("inviteVideo");
const music = document.getElementById("inviteMusic");
const countdown = document.getElementById("countdown");
const mapLink = document.getElementById("mapLink");
const calendarLink = document.getElementById("calendarLink");

/* iOS detection */
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/* VIDEO — safe on all platforms */
video.src = event.path + "video.mp4";
video.poster = event.path + "bg.jpg";
video.playsInline = true;

/* MAP */
mapLink.href = event.mapLink;

/* MUSIC — ONLY ANDROID / DESKTOP */
if (!isIOS) {
  music.src = event.path + "music.mp3";
  music.loop = true;

  /* Android allows this */
  music.play().catch(() => {});
}

/* Countdown */
const target = new Date(event.dateTimeISO).getTime();

function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    countdown.textContent = "The celebration has begun ✨";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);

  countdown.textContent =
    `${d} days · ${h} hours · ${m} minutes remaining`;
}

tick();
setInterval(tick, 60000);

/* Calendar */
const start = event.dateTimeISO.replace(/[-:]/g, "").split(".")[0];
calendarLink.href =
  `https://www.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent(event.label)}` +
  `&dates=${start}/${start}` +
  `&location=${encodeURIComponent(event.venue)}`;
