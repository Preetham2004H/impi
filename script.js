/* ========================================================
   Chandru & Impu — Wedding Invitation Script
   ======================================================== */

// --- Global State ---
let isEnvelopeOpened = false;
let isAutoScrollActive = false;
let autoScrollRafId = null;
let touchPauseTimeout = null;
let isUserInteracting = false;
let currentPhotoIndex = 0;
let isMusicPlaying = false;

const galleryImages = [
  "images/photo-1.jpg",
  "images/photo-2.jpg",
  "images/photo-3.jpg",
  "images/photo-4.jpg",
  "images/photo-5.jpg",
  "images/photo-6.jpg"
];

// --- 1. Ambient Falling Petals Generator ---
function createPetals(containerId, count = 16) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const petalColors = ['#e0698f', '#ab7a45', '#d8407a', '#f7e3cd', '#b83b5e'];

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'absolute animate-petal pointer-events-none';
    
    const left = Math.random() * 100;
    const size = 14 + Math.random() * 16;
    const duration = 14 + Math.random() * 14;
    const delay = -(Math.random() * duration);
    const sway = (Math.random() * 40 - 20) + 'px';
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];

    petal.style.left = `${left}%`;
    petal.style.top = `-30px`;
    petal.style.fontSize = `${size}px`;
    petal.style.color = color;
    petal.style.setProperty('--sway', sway);
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    petal.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="drop-shadow-sm opacity-80">
        <path d="M12 2C9 5 4 10 4 14a8 8 0 0 0 16 0c0-4-5-9-8-12z" />
      </svg>
    `;
    container.appendChild(petal);
  }
}

// --- 1b. Tiny Glowing Shimmer Particles Generator (Scene 1) ---
function createGlowingParticles() {
  const container = document.getElementById('glowing-particles');
  if (!container) return;
  container.innerHTML = '';

  const particleCount = 32;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const isSparkle = Math.random() > 0.6;
    const size = isSparkle ? (10 + Math.random() * 8) : (3 + Math.random() * 4);
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 2.5 + Math.random() * 3.5;
    const delay = -(Math.random() * duration);

    particle.className = 'absolute pointer-events-none animate-twinkle';
    particle.style.top = `${top}%`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    if (isSparkle) {
      particle.style.fontSize = `${size}px`;
      particle.style.color = '#fff6d6';
      particle.style.textShadow = '0 0 8px rgba(255, 235, 179, 0.8), 0 0 16px rgba(212, 175, 55, 0.6)';
      particle.innerHTML = '✦';
    } else {
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = '#fff9e6';
      particle.style.boxShadow = '0 0 8px 3px rgba(255, 230, 150, 0.75), 0 0 15px 6px rgba(212, 175, 55, 0.35)';
    }

    container.appendChild(particle);
  }
}

// --- 2. Petal Shower Burst Animation (Triggered on Open - Screenshot 3) ---
function triggerPetalShower() {
  const container = document.getElementById('petal-shower-container');
  if (!container) return;
  container.innerHTML = '';

  const flowerColors = ['#ffffff', '#ff758f', '#d81159', '#e0a96d', '#f4a261', '#f8edeb'];
  const card = document.getElementById('envelope-card');
  const cardRect = card ? card.getBoundingClientRect() : { left: window.innerWidth / 2 - 170, bottom: window.innerHeight / 2 + 100, width: 340 };

  const startXCenter = cardRect.left + cardRect.width / 2;
  const startY = cardRect.bottom - 40;

  for (let i = 0; i < 45; i++) {
    const petal = document.createElement('div');
    petal.className = 'absolute animate-shower-petal pointer-events-none z-30';

    const offsetX = (Math.random() - 0.5) * (cardRect.width * 0.75);
    const startX = startXCenter + offsetX;
    const driftX = (Math.random() - 0.5) * 140 + 'px';
    const fallDist = (220 + Math.random() * 360) + 'px';
    const size = 11 + Math.random() * 15;
    const duration = 1.1 + Math.random() * 0.8;
    const delay = Math.random() * 0.3;
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;
    petal.style.fontSize = `${size}px`;
    petal.style.color = color;
    petal.style.setProperty('--drift-x', driftX);
    petal.style.setProperty('--fall-dist', fallDist);
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    // 8-petal delicate star flower SVG (identical to reference image)
    petal.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="drop-shadow-sm">
        <circle cx="12" cy="12" r="2.5" fill="#fefae0" />
        <ellipse cx="12" cy="4.5" rx="2" ry="4" opacity="0.9" />
        <ellipse cx="12" cy="19.5" rx="2" ry="4" opacity="0.9" />
        <ellipse cx="4.5" cy="12" rx="4" ry="2" opacity="0.9" />
        <ellipse cx="19.5" cy="12" rx="4" ry="2" opacity="0.9" />
        <ellipse cx="6.5" cy="6.5" rx="2" ry="4" transform="rotate(-45 6.5 6.5)" opacity="0.85" />
        <ellipse cx="17.5" cy="17.5" rx="2" ry="4" transform="rotate(-45 17.5 17.5)" opacity="0.85" />
        <ellipse cx="17.5" cy="6.5" rx="2" ry="4" transform="rotate(45 17.5 6.5)" opacity="0.85" />
        <ellipse cx="6.5" cy="19.5" rx="2" ry="4" transform="rotate(45 6.5 19.5)" opacity="0.85" />
      </svg>
    `;
    container.appendChild(petal);
  }
}

// --- 3. Envelope Opening & Audio Unlock (Consecutive Stages from Screenshots) ---
function openInvitation() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeCard = document.getElementById('envelope-card');
  const waxSeal = document.getElementById('envelope-wax-seal');
  const cardFlowerTL = document.getElementById('card-flower-tl');
  const cardFlowerBR = document.getElementById('card-flower-br');
  const burstFlowersBg = document.getElementById('burst-flowers-bg');
  const burstTL = document.getElementById('burst-flower-tl');
  const burstBR = document.getElementById('burst-flower-br');
  const mainContent = document.getElementById('main-content');
  const floatingControls = document.getElementById('floating-controls');

  // Start Background Music on User Gesture
  playMusic();

  // STAGE 1: Wax seal dissolves & Corner Flowers POP UP and SLOWLY DISAPPEAR
  if (waxSeal) {
    waxSeal.style.opacity = '0';
    waxSeal.style.transform = 'translate(-50%, -15px) scale(0.4)';
  }

  // Corner flowers POP UP outward with spring bounce and SLOWLY DISAPPEAR
  if (cardFlowerTL) {
    cardFlowerTL.classList.add('flower-pop-tl');
  }
  if (cardFlowerBR) {
    cardFlowerBR.classList.add('flower-pop-br');
  }

  // Background Floral Bloom layer also blooms outward and gently dissolves
  if (burstFlowersBg) {
    burstFlowersBg.classList.remove('opacity-0');
    burstFlowersBg.classList.add('opacity-100');
  }
  if (burstTL) {
    burstTL.style.transform = 'scale(1.4) translate(-28px, -28px)';
    burstTL.style.opacity = '0';
    burstTL.style.transition = 'transform 1.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 1.3s ease-out';
  }
  if (burstBR) {
    burstBR.style.transform = 'scale(1.4) translate(28px, 28px)';
    burstBR.style.opacity = '0';
    burstBR.style.transition = 'transform 1.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 1.3s ease-out';
  }

  // STAGE 2: Petal shower falls downward from bottom of card (Screenshot 3)
  setTimeout(() => {
    triggerPetalShower();
  }, 280);

  // STAGE 3: Card glides UPWARDS and floats away (Screenshot 3)
  setTimeout(() => {
    envelopeCard.style.transform = 'translateY(-110vh) scale(0.92)';
    envelopeCard.style.opacity = '0';
    if (burstFlowersBg) {
      burstFlowersBg.style.transform = 'translateY(-60px) scale(1.15)';
      burstFlowersBg.style.opacity = '0';
    }
  }, 480);

  // STAGE 4: Reveal Main Invitation & Controls
  setTimeout(() => {
    envelopeScreen.style.opacity = '0';
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'scale(1)';
    floatingControls.classList.remove('opacity-0', 'pointer-events-none');
    floatingControls.classList.add('opacity-100');

    // Spawn falling ambient petals on main screen
    createPetals('main-petals', 18);

    // Refresh Swiper layout upon reveal
    if (gallerySwiper) {
      setTimeout(() => gallerySwiper.update(), 150);
    }

    setTimeout(() => {
      envelopeScreen.style.display = 'none';
    }, 1000);
  }, 950);

  // STAGE 5: Start Autoscroll
  setTimeout(() => {
    startAutoScroll();
  }, 2200);
}

// --- 3. Background Music Controller (Mute / Unmute) ---
const audio = document.getElementById('wedding-audio');
const musicIcon = document.getElementById('music-icon');
const btnMusic = document.getElementById('btn-music');

const AUDIO_START_OFFSET = 20.0; // Playback starts from 00:00:20
let hasSeekedInitialStart = false;

if (audio) {
  audio.src = 'song.mpeg';
}

function updateMusicUI(isPlaying) {
  isMusicPlaying = isPlaying;
  const pulseEl = document.getElementById('music-pulse');
  if (musicIcon) {
    musicIcon.textContent = isPlaying ? '🔊' : '🔇';
  }
  if (btnMusic) {
    btnMusic.setAttribute('aria-label', isPlaying ? 'Mute Sound' : 'Unmute Sound');
    btnMusic.title = isPlaying ? 'Mute Sound' : 'Unmute Sound';
    if (isPlaying) {
      btnMusic.classList.add('animate-spin-slow');
      if (pulseEl) pulseEl.classList.remove('hidden');
    } else {
      btnMusic.classList.remove('animate-spin-slow');
      if (pulseEl) pulseEl.classList.add('hidden');
    }
  }
}

// When audio ends, loop back seamlessly to 22.0 seconds
if (audio) {
  audio.addEventListener('ended', () => {
    try {
      audio.currentTime = AUDIO_START_OFFSET;
      audio.play().then(() => updateMusicUI(true)).catch(() => updateMusicUI(false));
    } catch (e) {
      console.log("Loop restart:", e);
    }
  });
}

function playMusic() {
  if (!audio) return;
  audio.muted = false;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMusicUI(true);

      // Seek to 22 seconds once playback has started
      if (!hasSeekedInitialStart) {
        try {
          audio.currentTime = AUDIO_START_OFFSET;
          hasSeekedInitialStart = true;
        } catch (e) {
          console.log("Initial seek deferred:", e);
        }
      }
    }).catch((err) => {
      console.log("Audio play error:", err);
      // Fallback: if song.mpeg failed, try song.mp3
      if (audio.src && !audio.src.includes('song.mp3')) {
        audio.src = 'song.mp3';
        audio.play().then(() => {
          updateMusicUI(true);
          try {
            audio.currentTime = AUDIO_START_OFFSET;
            hasSeekedInitialStart = true;
          } catch (e) {}
        }).catch((e2) => {
          console.log("Fallback failed:", e2);
          updateMusicUI(false);
        });
      } else {
        updateMusicUI(false);
      }
    });
  }
}

function toggleMusic() {
  if (!audio) return;

  if (isMusicPlaying && !audio.paused) {
    // Currently playing -> Mute
    audio.pause();
    updateMusicUI(false);
  } else {
    // Currently muted -> Unmute & Play
    audio.muted = false;
    if (!hasSeekedInitialStart) {
      try {
        audio.currentTime = AUDIO_START_OFFSET;
        hasSeekedInitialStart = true;
      } catch (e) {}
    }
    playMusic();
  }
}

// --- 4. Continuous Fluid Autoscroll Engine ---
// Default speed: 80 px/sec (calm, balanced & readable; suggestions: 70 gentle, 80 balanced, 95 brisk)
const SCROLL_SPEED_PX_PER_SEC = 80;
// Slowdown speed while showcasing Photo Gallery: 12 px/sec
const GALLERY_SLOW_SPEED_PX_PER_SEC = 12;

let scrollAccumulator = 0.0;
let lastScrollTime = null;

// Photo Gallery Showcase State
let isGalleryShowcaseActive = false;
let galleryShowcaseDone = false;
let gallerySlideCount = 0;
let galleryShowcaseStartTime = null;

// User Interrupt State (40-second pause)
let userInterruptTimer = null;
const USER_INTERRUPT_PAUSE_MS = 40000; // 40 seconds

function handleUserInterrupt() {
  if (!isEnvelopeOpened) return;

  // If lightbox is currently open, don't schedule auto-scroll resume yet
  if (lightbox && !lightbox.classList.contains('hidden')) {
    pauseAutoScroll();
    if (userInterruptTimer) {
      clearTimeout(userInterruptTimer);
      userInterruptTimer = null;
    }
    return;
  }

  // Pause auto-scroll immediately upon user interruption
  pauseAutoScroll();

  // Reset 40-second timer
  if (userInterruptTimer) {
    clearTimeout(userInterruptTimer);
  }

  userInterruptTimer = setTimeout(() => {
    // Only resume if envelope is open and lightbox is closed
    if (isEnvelopeOpened && (!lightbox || lightbox.classList.contains('hidden'))) {
      startAutoScroll();
    }
  }, USER_INTERRUPT_PAUSE_MS);
}

// Attach user interruption listeners
window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
window.addEventListener('wheel', handleUserInterrupt, { passive: true });
window.addEventListener('pointerdown', handleUserInterrupt, { passive: true });
window.addEventListener('keydown', (e) => {
  if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
    handleUserInterrupt();
  }
}, { passive: true });

function startAutoScroll() {
  if (isAutoScrollActive) return;
  isAutoScrollActive = true;
  scrollAccumulator = 0.0;
  lastScrollTime = null;

  if (autoScrollRafId) {
    cancelAnimationFrame(autoScrollRafId);
    autoScrollRafId = null;
  }
  autoScrollRafId = requestAnimationFrame(runScrollLoop);
}

function pauseAutoScroll() {
  isAutoScrollActive = false;
  if (autoScrollRafId) {
    cancelAnimationFrame(autoScrollRafId);
    autoScrollRafId = null;
  }
  lastScrollTime = null;
}

function toggleAutoScroll() {
  if (isAutoScrollActive) {
    pauseAutoScroll();
  } else {
    startAutoScroll();
  }
}

function checkGalleryShowcase(timestamp) {
  if (galleryShowcaseDone) return;
  const galleryEl = document.getElementById('gallery-section');
  if (!galleryEl) return;

  const rect = galleryEl.getBoundingClientRect();
  // When gallery is nicely centered in the upper/middle viewport
  const isCentered = rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.55;

  if (isCentered) {
    if (!isGalleryShowcaseActive) {
      isGalleryShowcaseActive = true;
      gallerySlideCount = 0;
      galleryShowcaseStartTime = timestamp;
      if (gallerySwiper && gallerySwiper.autoplay && !gallerySwiper.autoplay.running) {
        gallerySwiper.autoplay.start();
      }
    } else {
      // Safeguard: after 10.5 seconds (plenty of time for 5 photos at 1.8s each), resume normal scroll
      if (galleryShowcaseStartTime && (timestamp - galleryShowcaseStartTime) > 10500) {
        galleryShowcaseDone = true;
        isGalleryShowcaseActive = false;
      }
    }
  } else if (rect.top < -rect.height * 0.5) {
    // If scrolled past the gallery section
    galleryShowcaseDone = true;
    isGalleryShowcaseActive = false;
  }
}

function runScrollLoop(timestamp) {
  if (!isAutoScrollActive) return;

  if (lastScrollTime === null) {
    lastScrollTime = timestamp;
  }
  const deltaSeconds = Math.min((timestamp - lastScrollTime) / 1000.0, 0.08);
  lastScrollTime = timestamp;

  checkGalleryShowcase(timestamp);

  // Slow down to 12 px/sec when showcasing the photo gallery; otherwise 80 px/sec
  const currentSpeed = isGalleryShowcaseActive ? GALLERY_SLOW_SPEED_PX_PER_SEC : SCROLL_SPEED_PX_PER_SEC;

  const scrollTarget = document.scrollingElement || document.documentElement || document.body;
  const maxScroll = Math.max(0, scrollTarget.scrollHeight - window.innerHeight);
  const currentScroll = window.scrollY !== undefined ? window.scrollY : (window.pageYOffset !== undefined ? window.pageYOffset : scrollTarget.scrollTop);

  // Continuously scroll downward
  if (currentScroll < maxScroll - 4) {
    scrollAccumulator += currentSpeed * deltaSeconds;

    if (scrollAccumulator >= 1.0) {
      const step = Math.floor(scrollAccumulator);
      scrollAccumulator -= step;
      window.scrollBy(0, step);
    }
  }

  autoScrollRafId = requestAnimationFrame(runScrollLoop);
}

// --- 5. Real-Time Countdown Timers ---
// Targets:
// Reception: Saturday, November 28, 2026, 7:00 PM IST
// Muhurtham: Sunday, November 29, 2026, 7:00 AM IST
const weddingDate = new Date('2026-11-28T19:00:00+05:30').getTime();
const muhurtaDate = new Date('2026-11-29T07:00:00+05:30').getTime();

function formatTimeRemaining(diff) {
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
}

function updateCountdown() {
  const now = new Date().getTime();

  // 1. Reception Countdown (Details page grid & Reception section)
  const recepDiff = weddingDate - now;
  const recepTime = formatTimeRemaining(recepDiff);

  const timerDays = document.getElementById('timer-days');
  if (timerDays) {
    timerDays.textContent = String(recepTime.days).padStart(2, '0');
    document.getElementById('timer-hours').textContent = String(recepTime.hours).padStart(2, '0');
    document.getElementById('timer-minutes').textContent = String(recepTime.minutes).padStart(2, '0');
    document.getElementById('timer-seconds').textContent = String(recepTime.seconds).padStart(2, '0');
  }

  const receptionCountdownEl = document.getElementById('reception-live-countdown');
  if (receptionCountdownEl) {
    receptionCountdownEl.textContent = `${recepTime.days} days ${recepTime.hours} hours ${recepTime.minutes} min ${recepTime.seconds} sec`;
  }

  // 2. Muhurtham Countdown (Muhurtha section)
  const muhurtaDiff = muhurtaDate - now;
  const muhurtaTime = formatTimeRemaining(muhurtaDiff);

  const muhurtaCountdownEl = document.getElementById('muhurta-live-countdown');
  if (muhurtaCountdownEl) {
    muhurtaCountdownEl.textContent = `${muhurtaTime.days} days ${muhurtaTime.hours} hours ${muhurtaTime.minutes} min ${muhurtaTime.seconds} sec`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- 5b. Download .ICS Calendar Invite (Universal Apple/Outlook/Google) ---
function downloadCalendarInvite(type) {
  let title, start, end, description;
  if (type === 'reception') {
    title = 'Wedding Reception | Chandrashekar Gowda M & Impu L';
    start = '20261128T133000Z'; // Nov 28, 7:00 PM IST (13:30 UTC)
    end = '20261128T173000Z';   // Nov 28, 11:00 PM IST (17:30 UTC)
    description = 'Wedding Reception of Chandrashekar Gowda M & Impu L\\nSaturday, November 28, 2026 • 7:00 PM\\nVenue: NANDHANA CONVENTION HALL, Bengaluru';
  } else {
    title = 'Wedding Muhurtham | Chandrashekar Gowda M & Impu L';
    start = '20261129T013000Z'; // Nov 29, 7:00 AM IST (01:30 UTC)
    end = '20261129T021000Z';   // Nov 29, 7:40 AM IST (02:10 UTC)
    description = 'Auspicious Muhurtham of Chandrashekar Gowda M & Impu L (7:00 AM - 7:40 AM)\\nSunday, November 29, 2026\\nVenue: NANDHANA CONVENTION HALL, Bengaluru';
  }
  const location = 'NANDHANA CONVENTION HALL, Ullal Main Rd, Jnananjyothinagar, Bengaluru, Karnataka 560056';

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chandru and Impu Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${type}-2026@chandru-impu.wedding`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${type === 'reception' ? 'Reception_Chandru_Impu' : 'Muhurtham_Chandru_Impu'}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- 6. Photo Gallery Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');

function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxView();
  lightbox.classList.remove('hidden');
  setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
  document.body.style.overflow = 'hidden';
  if (isAutoScrollActive) pauseAutoScroll();
}

function closeLightbox() {
  lightbox.classList.add('opacity-0');
  setTimeout(() => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
    startAutoScroll();
  }, 300);
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % galleryImages.length;
  updateLightboxView();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxView();
}

function updateLightboxView() {
  lightboxImg.src = galleryImages[currentPhotoIndex];
  lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${galleryImages.length}`;

  for (let i = 0; i < galleryImages.length; i++) {
    const thumb = document.getElementById(`thumb-${i}`);
    if (thumb) {
      if (i === currentPhotoIndex) {
        thumb.classList.add('border-[#ab7a45]', 'scale-105', 'opacity-100');
        thumb.classList.remove('opacity-50', 'border-transparent');
      } else {
        thumb.classList.add('opacity-50', 'border-transparent');
        thumb.classList.remove('border-[#ab7a45]', 'scale-105', 'opacity-100');
      }
    }
  }
}

// Touch swipe gestures for mobile lightbox
let touchStartX = 0;
let touchEndX = 0;
const touchArea = document.getElementById('lightbox-touch-area');

touchArea.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

touchArea.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 45) {
    nextPhoto();
  } else if (touchEndX - touchStartX > 45) {
    prevPhoto();
  }
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'Escape') closeLightbox();
});

// --- 7. Guestbook & Real-Time Cloud Wishes System ---
const CLOUD_WISHES_ENDPOINT = 'https://kvdb.io/FS1ktdd75SfK9mmRbHSg1g/chandru_impu_wishes';

let cachedWishesJson = '';

async function fetchRemoteWishes() {
  const wishesList = document.getElementById('wishes-list');
  if (!wishesList) return;

  try {
    const res = await fetch(CLOUD_WISHES_ENDPOINT + '?t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const stringified = JSON.stringify(data);
      // Only re-render if data has changed to prevent UI flicker
      if (stringified !== cachedWishesJson) {
        cachedWishesJson = stringified;
        localStorage.setItem('chandru_impu_wishes', stringified);
        renderWishes(Array.isArray(data) ? data : []);
      }
    } else {
      // Fallback to local storage if network is unreachable
      loadLocalWishesFallback();
    }
  } catch (err) {
    loadLocalWishesFallback();
  }
}

function loadLocalWishesFallback() {
  const local = localStorage.getItem('chandru_impu_wishes');
  if (local && local !== cachedWishesJson) {
    cachedWishesJson = local;
    try {
      renderWishes(JSON.parse(local));
    } catch (_) {}
  }
}

function renderWishes(wishes) {
  const wishesList = document.getElementById('wishes-list');
  if (!wishesList) return;

  wishesList.innerHTML = '';

  if (!wishes || wishes.length === 0) {
    wishesList.classList.add('hidden');
    return;
  }
  wishesList.classList.remove('hidden');

  wishes.forEach(item => {
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl bg-white/85 border border-[#ab7a45]/30 shadow-xs text-left transition-all';
    card.innerHTML = `
      <div class="flex items-center justify-between mb-1">
        <span class="font-lora text-xs font-bold text-[#640e1b]">${escapeHtml(item.name || 'Anonymous Guest')}</span>
        <span class="text-[10px] text-[#ab7a45] font-sans">${escapeHtml(item.time || 'Recently')}</span>
      </div>
      <p class="font-lora text-xs text-[#640e1b]/80 leading-relaxed">${escapeHtml(item.wish || '')}</p>
    `;
    wishesList.appendChild(card);
  });
}

function loadWishes() {
  fetchRemoteWishes();
}

async function submitWish(e) {
  e.preventDefault();
  const nameInput = document.getElementById('guest-name');
  const wishInput = document.getElementById('guest-wish');
  const submitBtn = e.target.querySelector('button[type="submit"]');

  const name = nameInput.value.trim();
  const wish = wishInput.value.trim();

  if (!name || !wish) return;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'SENDING...';
  }

  // Format date nicely e.g. "Oct 24, 1:45 PM"
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
                  now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const newWish = {
    id: 'wish_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    name: name,
    wish: wish,
    time: dateStr,
    timestamp: Date.now()
  };

  try {
    // 1. Fetch latest array from cloud
    let currentWishes = [];
    try {
      const res = await fetch(CLOUD_WISHES_ENDPOINT + '?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        currentWishes = await res.json();
        if (!Array.isArray(currentWishes)) currentWishes = [];
      }
    } catch (_) {
      currentWishes = JSON.parse(localStorage.getItem('chandru_impu_wishes') || '[]');
    }

    // Add new wish to top
    currentWishes.unshift(newWish);

    // Optimistically update UI immediately
    cachedWishesJson = JSON.stringify(currentWishes);
    localStorage.setItem('chandru_impu_wishes', cachedWishesJson);
    renderWishes(currentWishes);

    nameInput.value = '';
    wishInput.value = '';

    // 2. Save updated array to cloud
    await fetch(CLOUD_WISHES_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentWishes)
    });

    alert("Thank you so much for your heartfelt blessings! 💖");
  } catch (err) {
    console.error('Error saving wish to cloud:', err);
    alert("Thank you so much for your heartfelt blessings! 💖");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'SEND WISHES';
    }
  }
}

// Magic Wand AI Blessings Generator
const aiWishes = [
  "Wishing you a blissful journey of love, companionship, and endless happiness. Congratulations!",
  "May your love grow stronger with each passing day. Best wishes on this wonderful new chapter!",
  "Hearty congratulations Chandru and Impu! May Lord bless your union with eternal peace and prosperity.",
  "Two beautiful souls joining as one. May your marriage be filled with laughter and everlasting love!",
  "Sending you both our warmest blessings and love on your wedding day! Cheers to a lifetime of togetherness!"
];

let lastWishIndex = -1;

function generateWishIdea() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * aiWishes.length);
  } while (nextIndex === lastWishIndex && aiWishes.length > 1);
  
  lastWishIndex = nextIndex;
  document.getElementById('guest-wish').value = aiWishes[nextIndex];
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

// Auto-poll cloud database every 5 seconds so any friend viewing on their phone sees wishes instantly!
setInterval(fetchRemoteWishes, 5000);

// --- 6b. Swiper 3D Coverflow Gallery ---
let gallerySwiper = null;

function initGallerySwiper() {
  if (typeof Swiper === 'undefined') return;

  gallerySwiper = new Swiper('.gallery-coverflow-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 6,
    speed: 480, // Snappy 480ms slide animation
    autoplay: {
      delay: 1800, // Faster 1.8s turnover per photo (fast left-to-right showcase)
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    coverflowEffect: {
      rotate: 35,
      stretch: 10,
      depth: 160,
      modifier: 1,
      scale: 0.82,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.gallery-next-btn',
      prevEl: '.gallery-prev-btn',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    slideToClickedSlide: true,
    watchSlidesProgress: true,
  });

  // Track slide transitions during Gallery Showcase
  gallerySwiper.on('slideChange', () => {
    if (isGalleryShowcaseActive && !galleryShowcaseDone) {
      gallerySlideCount++;
      if (gallerySlideCount >= 5) {
        galleryShowcaseDone = true;
        isGalleryShowcaseActive = false;
      }
    }
  });

  // Clicking the active centered slide opens lightbox; clicking side slides brings them to center
  gallerySwiper.on('click', (swiper, event) => {
    const clickedSlide = event.target.closest('.swiper-slide');
    if (!clickedSlide) return;

    if (clickedSlide.classList.contains('swiper-slide-active')) {
      const realIndex = swiper.realIndex;
      openLightbox(realIndex);
    }
  });
}

// Initial Setup
window.addEventListener('DOMContentLoaded', () => {
  createGlowingParticles();
  createPetals('envelope-petals', 16);
  loadWishes();
  initGallerySwiper();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('open') === '1') {
    openInvitation();
  }
});
