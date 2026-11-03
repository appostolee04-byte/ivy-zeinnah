
// ===================================
// IVY ZEINNAH - LOVE ANIMATION
// ===================================

const canvas = document.getElementById("particleHeart");
const ctx = canvas.getContext("2d");

let particles = [];
let heartColor = 0;
let animationFrame = 0;

const colors = [
    "#ff248b",
    "#c44aff",
    "#ffcf40",
    "#35ffbd",
    "#ff5577"
];

// Heart mathematical shape
function heartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);

    const y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return { x, y };
}

function createParticles() {
    particles = [];

    for (let i = 0; i < 550; i++) {
        const t = Math.random() * Math.PI * 2;
        const point = heartPoint(t);

        const fill = Math.sqrt(Math.random());

        particles.push({
            x: point.x * fill,
            y: point.y * fill,
            size: Math.random() * 2.5 + 0.7,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawHeart() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const scale = Math.min(width / 38, height / 34);

    const color = colors[
        Math.floor(heartColor) % colors.length
    ];

    const pulse = 1 + Math.sin(animationFrame * 0.04) * 0.045;

    particles.forEach(p => {
        const x = centerX + p.x * scale * pulse;
        const y = centerY - p.y * scale * pulse;

        const twinkle = 0.55 +
            Math.abs(Math.sin(animationFrame * 0.04 + p.phase)) * 0.45;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            p.size * twinkle,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;

        ctx.globalAlpha = twinkle;
        ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Heart centre text
    ctx.font = "bold 17px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;

    ctx.fillText("I LOVE YOU", centerX, centerY + 7);

    ctx.shadowBlur = 0;

    animationFrame++;

    requestAnimationFrame(drawHeart);
}

createParticles();
resizeCanvas();
drawHeart();

window.addEventListener("resize", resizeCanvas);

// Change heart colour
setInterval(() => {
    heartColor++;
}, 2500);


// ===================================
// FLOATING HEARTS
// ===================================

const floatingContainer =
    document.getElementById("floatingHearts");

function createFloatingHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const symbols = ["❤️", "💕", "💖", "💗", "💜", "💘"];

    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    const duration = 5 + Math.random() * 6;

    heart.style.animationDuration = duration + "s";

    floatingContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createFloatingHeart, 450);


// ===================================
// ROMANTIC MESSAGES
// ===================================

const messages = [
    "Ivy, you are the reason behind my beautiful smiles. ❤️",

    "Every moment with you is a beautiful memory. 💕",

    "You are my sunshine on cloudy days. ☀️",

    "My heart has chosen you, Ivy Zeinnah. 💖",

    "No distance can change what my heart feels for you. 💗",

    "You are my favourite person and my sweetest blessing. 🌹",

    "If love were a journey, I would walk it with you forever. 💍"
];

let messageIndex = 0;

const loveMessage =
    document.getElementById("loveMessage");

document.getElementById("messageButton")
    .addEventListener("click", () => {

        loveMessage.textContent =
            messages[messageIndex];

        messageIndex =
            (messageIndex + 1) % messages.length;
    });


// ===================================
// SPECIAL SURPRISE
// ===================================

const surpriseButton =
    document.getElementById("surpriseButton");

const surpriseMessage =
    document.getElementById("surpriseMessage");

surpriseButton.addEventListener("click", () => {

    surpriseMessage.classList.toggle("hidden");

    if (surpriseMessage.classList.contains("hidden")) {

        surpriseButton.textContent =
            "Open Your Surprise ❤️";

    } else {

        surpriseButton.textContent =
            "Close Surprise 💕";

        for (let i = 0; i < 20; i++) {
            setTimeout(createFloatingHeart, i * 100);
        }
    }
});


// ===================================
// BACKGROUND MUSIC
// ===================================

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {
            await music.play();

            musicButton.textContent =
                "⏸ Pause Romantic Music";

        } catch (error) {

            alert("Please add music/romantic.mp3 to your music folder.");
        }

    } else {

        music.pause();

        musicButton.textContent =
            "🎵 Play Romantic Music";
    }
});
