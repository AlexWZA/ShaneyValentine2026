const body = document.getElementById("body");
const cake = document.getElementById("cake");
const slices = document.querySelectorAll(".slice");
const instruction = document.getElementById("instruction");
const flames = [];

let started = false;
const numCandles = 3;
const candleWidth = 16; // width in px from CSS
let tapCount = 0;
const maxTaps = 3;

// Cake width
const cakeWidth = cake.clientWidth;

// Create candles dynamically
for (let i = 0; i < numCandles; i++) {
    const candle = document.createElement("div");
    candle.classList.add("candle");

    // Calculate spacing so first and last candle stay inside cake
    const sectionWidth = cakeWidth / numCandles;
    const leftPos = sectionWidth * i + (sectionWidth - candleWidth) / 2;
    candle.style.left = `${leftPos}px`;

    // Flame
    const flame = document.createElement("div");
    flame.classList.add("flame");
    candle.appendChild(flame);

    cake.appendChild(candle);
    flames.push(flame);
}

// Start mic on first click or enable tap fallback
body.addEventListener("click", () => {
    if (started) return;
    started = true;
    instruction.innerText = "💨 BLOW!!! 💨";

    // Try mic first
    startMic().catch(() => {
        // If mic fails, show fallback instruction
        instruction.innerText = "💨 BLOW THEM CANDLES! 💨";
        cake.addEventListener("click", tapToBlow);
    });
});

// Mic listening function
async function startMic() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const mic = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    mic.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function listen() {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

        if (volume > 60) blowCandles();
        requestAnimationFrame(listen);
    }

    listen();
}

// Tap fallback
function tapToBlow() {
    tapCount++;
    instruction.innerText = `💨 You supposed to blow! Try ${maxTaps - tapCount} more times! 💨`;

    if (tapCount >= maxTaps) {
        blowCandles();
        cake.removeEventListener("click", tapToBlow);
    }
}

// Blow candles
function blowCandles() {
    flames.forEach(f => f.classList.add("blown"));
    instruction.innerText = "🎉 Let's cut the cake 🎂";

    cake.addEventListener("click", cutCakeOnce);
}

// Cut cake
function cutCakeOnce() {
    // 1. Animate slices
    slices.forEach(slice => slice.classList.add("cutting"));

    // 2. Remove all candles
    const candles = document.querySelectorAll(".candle");
    candles.forEach(c => c.remove());
    flames.length = 0;

    // 3. Get South African time
    const now = new Date();
    const sastTime = now.toLocaleString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        dateStyle: "full",
        timeStyle: "medium"
    });

    // 4. Send email with EmailJS
    emailjs.send(
        "service_r9rb4tl",       // Your EmailJS service ID
        "template_bgtciln",      // Your EmailJS template ID
        { time: sastTime },       // Template variable
        "RhXbtQWtt0wuoDRoT"      // Your public key
    ).then(() => {
        console.log("Email sent with timestamp:", sastTime);
    }).catch((err) => {
        console.error("EmailJS error:", err);
    });

    // 5. Remove cake and instruction after a short delay to show the cut animation
    setTimeout(() => {
        cake.style.display = "none";
        instruction.style.display = "none";

        // 6. Show video
        const videoContainer = document.getElementById("video-container");
        videoContainer.style.display = "block";

        const video = document.getElementById("birthdayVideo");
        video.style.display = "block";
        video.play();

        /* ------------------ VIDEO PROTECTION ------------------ */
        video.addEventListener("contextmenu", (e) => e.preventDefault());
        video.controlsList = "nodownload noremoteplayback";
        video.disablePictureInPicture = true;
    }, 3000); // wait 3 seconds for cut animation
}