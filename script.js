/* =========================================
   1. LOGIN MODAL LOGIC
   ========================================= */
const modal = document.getElementById("loginModal");
const loginBtn = document.querySelector(".navbar .btn-gold");
const closeBtn = document.querySelector(".close-modal-btn");
const body = document.body;

function openModal() {
  if (modal) {
    modal.style.display = "flex";
    body.style.overflow = "hidden";
  }
}

function closeModal() {
  if (modal) {
    modal.style.display = "none";
    body.style.overflow = "auto";
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", openModal);
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Window click for Login Modal
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "home.html";
  });
}

/* =========================================
   2. REGISTER MODAL LOGIC (NEW ADDITION)
   ========================================= */
const regModal = document.getElementById("registerModal");
const regBtn = document.getElementById("registerBtn"); // Header wala 'Register' button
const closeRegBtn = document.getElementById("closeRegBtn"); // Register modal ka 'X' button

// Open Register Modal
if (regBtn) {
  regBtn.addEventListener("click", function () {
    if (regModal) {
      regModal.style.display = "flex";
      body.style.overflow = "hidden";
    }
  });
}

// Close Register Modal (X Button)
if (closeRegBtn) {
  closeRegBtn.addEventListener("click", function () {
    if (regModal) {
      regModal.style.display = "none";
      body.style.overflow = "auto";
    }
  });
}

// Close Register Modal (Outside Click)
window.addEventListener("click", function (event) {
  if (event.target === regModal) {
    regModal.style.display = "none";
    body.style.overflow = "auto";
  }
});

// Register Form Submit
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Registration Successful! Welcome to TechNova.");
    regModal.style.display = "none";
    body.style.overflow = "auto";
  });
}

/* =========================================
   3. DYNAMIC SLIDER LOGIC (OPTIMIZED)
   ========================================= */

// --- CONFIGURATION ---
const sliderData = [
  {
    type: "video",
    src: "images/banner-vid-1.mp4",
    poster: "images/banner-vid-1.jpg", // Background blur ke liye zaroori
  },
  {
    type: "image",
    src: "images/banner-image-two.jpg",
  },
  {
    type: "image",
    src: "images/banner-image-three.jpg",
  },
];

// --- ELEMENTS SELECTION ---
const track = document.getElementById("sliderTrack");
const heroBanner = document.querySelector(".hero-banner");
const bgVideo = document.getElementById("bg-video");

// --- INITIALIZATION FUNCTION ---
function initSlider() {
  if (!track || sliderData.length === 0) return;

  // 1. Purana content clear karein
  track.innerHTML = "";

  // 2. Loop chala kar Slides Create karein
  sliderData.forEach((item) => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slide");

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Event Banner";
      slideDiv.appendChild(img);
    } else if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.poster = item.poster || "";
      video.muted = true;
      video.loop = false; // Loop false rakha hai taki 'ended' event fire ho sake
      video.autoplay = true;
      video.playsInline = true;
      video.pause(); // Initially pause
      slideDiv.appendChild(video);
    }

    track.appendChild(slideDiv);
  });

  // 3. Slider Logic Start karein
  startSliderAnimation();
}

// --- SLIDER ANIMATION & CONTROL ---
function startSliderAnimation() {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let slideIndex = 0;

  let slideTimer; // Timer variable
  const defaultDuration = 3000; // Images ke liye 3 seconds

  // Function: Update Slide & Background
  const updateSlider = () => {
    // 1. Purana Timer clear karo
    if (slideTimer) clearTimeout(slideTimer);

    // 2. Track ko move karo
    track.style.transform = `translateX(-${slideIndex * 100}%)`;

    // 3. Background update karo
    updateBackground(slideIndex);

    // 4. Current Slide ka Data nikalo
    const currentSlide = slides[slideIndex];
    const currentData = sliderData[slideIndex];

    // --- SMART LOGIC START ---

    if (currentData.type === "video") {
      // === SCENARIO: VIDEO HAI ===
      const video = currentSlide.querySelector("video");
      if (video) {
        video.currentTime = 0;
        video.muted = true;
        video.play().catch((e) => console.log("Err:", e));

        // Logic: Jab video khatam ho ('ended'), tab nextSlide call karo
        video.onended = function () {
          nextSlide();
        };
      }
    } else {
      // === SCENARIO: IMAGE HAI ===
      // Image ke liye simple Timer set karo (3 seconds)
      slideTimer = setTimeout(nextSlide, defaultDuration);
    }
  };

  // Function: Background Blur Logic (Super Optimized)
  const updateBackground = (index) => {
    if (!heroBanner || !bgVideo) return;

    const data = sliderData[index];

    if (data.type === "video") {
      // --- VIDEO MODE ---
      heroBanner.style.setProperty("--banner-bg", "none");

      if (bgVideo.style.display !== "block") {
        bgVideo.style.display = "block";
        bgVideo.src = data.src;
        bgVideo.play().catch((e) => console.log("Bg video error:", e));
      }
    } else {
      // --- IMAGE MODE ---
      if (bgVideo.style.display !== "none") {
        bgVideo.style.display = "none";
        bgVideo.pause();
      }

      const bgUrl = data.src;
      heroBanner.style.setProperty("--banner-bg", `url('${bgUrl}')`);
    }
  };

  // Function: Move to Next Slide
  const nextSlide = () => {
    slideIndex++;
    if (slideIndex >= totalSlides) {
      slideIndex = 0;
    }
    updateSlider();
  };

  // --- INITIAL START ---
  updateSlider();
}

// DOM load hone par start
document.addEventListener("DOMContentLoaded", initSlider);