const yesBtn = document.getElementById("yesBtn");
const absBtn = document.getElementById("absBtn");
const step1 = document.getElementById("step1");
const message = document.getElementById("message");
const game = document.getElementById("game");
const transitionText = document.getElementById("transitionText");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");

let heartsPopped = 0;
const targetHearts = 10;

/* ----------------- YES BUTTON ----------------- */
yesBtn.addEventListener("click", () => {
  message.innerText = "You're boring 😏";
  setTimeout(startGame, 1500);
});

/* ---------------- ABSOLUTELY BUTTON ---------------- */
absBtn.addEventListener("click", () => {
  absBtn.innerText = "Absolutely Not ❌";
  setTimeout(startGame, 1500);
});

/* ----------------- START HEART GAME ----------------- */
function startGame() {
  step1.style.display = "none";
  game.style.display = "block";

  // Show transition text
  transitionText.style.opacity = "1";
  setTimeout(() => {
    transitionText.style.opacity = "0";
  }, 2000);

  spawnHearts();
}

/* ----------------- SPAWN HEARTS ----------------- */
function spawnHearts() {
  const interval = setInterval(() => {
    if (heartsPopped >= targetHearts) {
      clearInterval(interval);
      endGame();
      return;
    }

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    heart.style.left = Math.random() * 90 + "vw"; // keep inside screen
    heart.style.animationDuration = (3 + Math.random() * 2) + "s";

    // Prevent double-counting clicks
    let clicked = false;
    heart.addEventListener("click", (e) => {
      if (clicked) return;
      clicked = true;
      popEffect(e.clientX, e.clientY);
      heart.remove();
      heartsPopped++;
    });

    game.appendChild(heart);

    // Remove heart if not clicked after 5s
    setTimeout(() => heart.remove(), 5000);

  }, 600);
}

/* ----------------- PARTICLE POP EFFECT ----------------- */
function popEffect(x, y) {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.innerText = "❤️";

    particle.style.left = x + "px";
    particle.style.top = y + "px";

    particle.style.setProperty("--x", (Math.random() - 0.5) * 80 + "px");
    particle.style.setProperty("--y", (Math.random() - 0.5) * 80 + "px");

    game.appendChild(particle);

    setTimeout(() => particle.remove(), 600);
  }
}

/* ----------------- END GAME → SHOW VIDEO ----------------- */
function endGame() {
  game.style.display = "none";
  videoContainer.style.display = "flex";
  videoContainer.style.justifyContent = "center";
  videoContainer.style.alignItems = "center";
  videoContainer.style.flexDirection = "column";

  video.style.display = "block";
  document.body.style.background = "pink";
  video.play().catch(() => {}); // silently ignore autoplay errors

  // Video protection
  video.addEventListener("contextmenu", e => e.preventDefault());
  video.controlsList = "nodownload noremoteplayback";
  video.disablePictureInPicture = true;

  // Trigger EmailJS silently
  setTimeout(() => {
    const now = new Date();
    const sastTime = now.toLocaleString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      dateStyle: "full",
      timeStyle: "medium"
    });

    emailjs.send(
      "service_r9rb4tl",
      "template_bgtciln",
      { time: sastTime },
      "RhXbtQWtt0wuoDRoT"
    );
  }, 100); // short delay to ensure UI is ready
}