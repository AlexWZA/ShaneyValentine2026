const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");

// Function to move NO button anywhere on screen without going off-screen
function moveNoButton() {
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Calculate random position inside viewport
  const x = Math.random() * (window.innerWidth - btnWidth);
  const y = Math.random() * (window.innerHeight - btnHeight);

  noButton.style.position = "absolute"; // only now make it absolute
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
}

// Make NO move immediately on hover or touch
noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", moveNoButton);

// Extra: move NO if cursor gets close (makes it hard to click)
document.addEventListener("mousemove", (e) => {
  const rect = noButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (distance < 100) {
    moveNoButton();
  }
});

// YES button click
yesButton.addEventListener("click", () => {
  // Get South African time
  const now = new Date();
  const sastTime = now.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    dateStyle: "full",
    timeStyle: "medium"
  });

  // Send email via EmailJS with the time variable
  emailjs.send(
    "service_r9rb4tl",   // Your Service ID
    "template_d7gy4rc",  // Your Template ID
    { time: sastTime },   // Must match {{time}} in your template
    "RhXbtQWtt0wuoDRoT"  // Your public key
  ).then(
    () => {
      // Show celebration screen
      document.body.innerHTML = `
        <div style="
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          font-family:Arial;
          background:linear-gradient(135deg,#ff4d6d,#ffb3c6);
          color:white;
          text-align:center;
        ">
          <h1>
            YAY!!! 💖🥰<br>
            You just made me the happiest person alive 💕
          </h1>
        </div>
      `;
    },
    (error) => {
      alert("Email failed, but she still said YES! 💖");
      console.error(error);
    }
  );
});