const params = new URLSearchParams(window.location.search);
const key = params.get("event");

/* SAFETY: redirect if opened wrongly */
if (!key || !INVITE_CONFIG.events[key]) {
  window.location.href = "index.html";
  throw new Error("Invalid or missing event");
}

const event = INVITE_CONFIG.events[key];

/* DOM */
const video = document.getElementById("inviteVideo");
const music = document.getElementById("inviteMusic");
const countdown = document.getElementById("countdown");
const mapLink = document.getElementById("mapLink");
const calendarLink = document.getElementById("calendarLink");

/* iOS detection (battle-tested) */
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/* VIDEO */
video.src = event.path + "video.mp4";
video.poster = event.path + "bg.jpg";
video.playsInline = true;
video.muted = isIOS; // REQUIRED for iOS

/* MUSIC */
music.src = event.path + "music.mp3";
music.loop = true;

/* ANDROID / DESKTOP AUTOPLAY */
if (!isIOS) {
  video.play().catch(() => {});
  music.play().catch(() => {});
}

/* MAP */
mapLink.href = event.mapLink;

/* COUNTDOWN */
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

/* CALENDAR */
const start = event.dateTimeISO.replace(/[-:]/g, "").split(".")[0];
calendarLink.href =
  `https://www.google.com/calendar/render?action=TEMPLATE` +
  `&text=${encodeURIComponent(event.label)}` +
  `&dates=${start}/${start}` +
  `&location=${encodeURIComponent(event.venue)}`;
