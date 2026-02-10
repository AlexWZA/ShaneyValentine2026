const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");

// Move NO button randomly without going off screen
function moveNoButton() {
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  const x = Math.random() * (window.innerWidth - btnWidth);
  const y = Math.random() * (window.innerHeight - btnHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

// Move NO on hover or touch
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);

// Extra: move NO if cursor gets close
document.addEventListener("mousemove", (e) => {
  const rect = noButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (distance < 100) {
    moveNoButton();
  }
});

// YES button logic
yesButton.addEventListener("click", () => {
  // Get South African time
  const now = new Date();
  const sastTime = now.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    dateStyle: "full",
    timeStyle: "medium"
  });
  
  setTimeout(() => {
  document.getElementById("overlayText").style.opacity = "1";
}, 10000);

  // Send email
  emailjs.send(
    "service_r9rb4tl",
    "template_d7gy4rc",
    { time: sastTime },
    "RhXbtQWtt0wuoDRoT"
  ).then(() => {
    // Hide question
    document.querySelector(".container").style.display = "none";

    // Show and play video
    const video = document.getElementById("valentineVideo");
    video.style.display = "block";
    video.play();
  }).catch((error) => {
    alert("💖");
    console.error(error);
  });
});