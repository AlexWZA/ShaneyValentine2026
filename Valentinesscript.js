const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const container = document.querySelector(".container");
const video = document.getElementById("valentineVideo");

/* ------------------ NO BUTTON LOGIC ------------------ */

// Move NO button randomly within screen bounds
function moveNoButton() {
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  const x = Math.random() * (window.innerWidth - btnWidth);
  const y = Math.random() * (window.innerHeight - btnHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

// Move on hover (desktop)
noButton.addEventListener("mouseenter", moveNoButton);

// Move on touch (mobile)
noButton.addEventListener("touchstart", moveNoButton);

// Move if cursor gets close
document.addEventListener("mousemove", (e) => {
  const rect = noButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (distance < 100) {
    moveNoButton();
  }
});


/* ------------------ VIDEO PROTECTION ------------------ */

// Disable right-click specifically on video
video.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Disable download & PiP (modern browsers)
video.controlsList = "nodownload noremoteplayback";
video.disablePictureInPicture = true;


/* ------------------ YES BUTTON LOGIC ------------------ */

yesButton.addEventListener("click", () => {

  // Get South African time
  const now = new Date();
  const sastTime = now.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    dateStyle: "full",
    timeStyle: "medium"
  });

  // Send email
  emailjs.send(
    "service_r9rb4tl",
    "template_d7gy4rc",
    { time: sastTime },
    "RhXbtQWtt0wuoDRoT"
  ).then(() => {

    // Hide question
    container.style.display = "none";

    // Show and play video
    video.style.display = "block";
    video.play();

  }).catch((error) => {
    console.error(error);
  });
});