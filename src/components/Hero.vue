<template>
  <section id="home" class="hero">
    <div class="hero-bg"></div>
    <div class="container hero-grid">
      <div class="hero-text fade-in">
        <p class="hero-tag">
          <span class="dot"></span> Available for Opportunities
        </p>
        <h1>Hi, I'm <span class="gradient">Zahoor Illahi</span></h1>
        <h2 class="hero-role">
          <span>{{ currentRole }}</span><span class="cursor-blink">|</span>
        </h2>
        <p class="hero-tagline">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Building Reliable Networks. Solving Real IT Problems.</span>
        </p>
        <p class="hero-desc">
          Computer Systems Engineering graduate with practical exposure to IT
          operations, enterprise ERP systems, database management, and network
          infrastructure. Interested in network monitoring, troubleshooting,
          network security, and reliable enterprise systems.
        </p>

        <div class="hero-actions">
          <a href="#" class="btn btn-primary btn-3d" @click.prevent="goToProjects">
            <i class="fa-solid fa-rocket"></i> Explore My Projects
          </a>
          <a href="#" class="btn btn-outline btn-3d" @click.prevent="goToContact">
            <i class="fa-solid fa-paper-plane"></i> Contact Me
          </a>
        </div>

        <div class="hero-socials">
          <a href="https://github.com/zahoor631" target="_blank" aria-label="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/engr-zahoor-illahi-043453242" target="_blank" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="mailto:zahoorillahi117@gmail.com" aria-label="Email">
            <i class="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>

      <div class="hero-visual fade-in">
        <div
          class="profile-ring"
          ref="profileRing"
          @mousemove="handleProfileTilt"
          @mouseleave="resetProfileTilt"
        >
          <div class="profile-sphere">
            <div class="profile-sphere-inner">
              <img src="/profile.jpeg" alt="Zahoor Illahi" />
              <div class="sphere-light"></div>
              <div class="sphere-shadow"></div>
            </div>
          </div>
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
          <div class="orbit-dot dot-1"></div>
          <div class="orbit-dot dot-2"></div>
          <div class="orbit-dot dot-3"></div>
        </div>

        <div class="floating-card card-1">
          <i class="fa-solid fa-network-wired"></i>
          <span>Network Engineer</span>
        </div>

        <div class="floating-card card-2">
          <i class="fa-solid fa-shield-halved"></i>
          <span>
            PEC Registered<br>
            <small>Reg. No: 028399</small>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['navigate'])
const profileRing = ref(null)

const goToProjects = () => emit('navigate', 'projects')
const goToContact = () => emit('navigate', 'contact')

const roles = [
  'IT Support & Network Engineer',
  'Network Engineer',
  'IT Specialist',
  'Problem Solver',
]

const currentRole = ref('')
let roleIndex = 0
let charIndex = 0
let deleting = false
let timer

const type = () => {
  const full = roles[roleIndex]
  currentRole.value = deleting
    ? full.substring(0, charIndex--)
    : full.substring(0, charIndex++)

  let speed = deleting ? 50 : 100

  if (!deleting && charIndex === full.length + 1) {
    deleting = true
    speed = 1800
  } else if (deleting && charIndex === 0) {
    deleting = false
    roleIndex = (roleIndex + 1) % roles.length
    speed = 400
  }
  timer = setTimeout(type, speed)
}

const handleProfileTilt = (e) => {
  if (!profileRing.value) return
  const el = profileRing.value
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const maxTilt = 12
  const rotateY = ((x - centerX) / centerX) * maxTilt
  const rotateX = ((centerY - y) / centerY) * maxTilt

  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  el.style.transition = 'transform 0.1s ease-out'
}

const resetProfileTilt = () => {
  if (!profileRing.value) return
  const el = profileRing.value
  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
}

onMounted(() => type())
onUnmounted(() => clearTimeout(timer))
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  perspective: 1200px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.12), transparent 40%);
  pointer-events: none;
  z-index: 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  position: relative;
  z-index: 10;
}

.hero-visual {
  position: relative;
  z-index: 5;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--success);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
  font-family: var(--mono);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}

.gradient {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-role {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-family: var(--mono);
  min-height: 2.4rem;
  display: block;
  line-height: 1.3;
}

.cursor-blink {
  color: var(--primary);
  animation: blink 1s infinite;
}

@keyframes blink { 50% { opacity: 0; } }

.hero-tagline {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-left: 3px solid var(--primary);
  font-family: var(--mono);
  letter-spacing: 0.02em;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.5;
}

.hero-tagline i {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.hero-desc {
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn-3d {
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
              box-shadow 0.3s ease,
              background 0.3s ease;
}

.btn-3d:hover {
  transform: translateY(-4px) translateZ(10px);
  box-shadow: 0 15px 30px rgba(0, 212, 255, 0.35);
}

.hero-socials { display: flex; gap: 1rem; }

.hero-socials a {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  transition: all 0.25s ease;
  font-size: 1.1rem;
}

.hero-socials a:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
}

.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 420px;
}

.profile-ring {
  position: relative;
  width: 340px;
  height: 340px;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  display: grid;
  place-items: center;
}

.profile-sphere {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  animation: sphere-rotate 15s linear infinite;
  transform-style: preserve-3d;
  z-index: 2;
  will-change: transform;
}

@keyframes sphere-rotate {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

.profile-sphere-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary);
  box-shadow: 
    0 0 50px rgba(0, 212, 255, 0.6),
    0 0 80px rgba(0, 212, 255, 0.3),
    inset 0 0 40px rgba(0, 212, 255, 0.15),
    inset 0 0 20px rgba(124, 58, 237, 0.1);
  transform-style: preserve-3d;
}

.profile-sphere-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.sphere-light {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 25%,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.1) 15%,
    transparent 45%
  );
  pointer-events: none;
  z-index: 3;
  mix-blend-mode: overlay;
}

.sphere-shadow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 70% 75%,
    rgba(0, 0, 0, 0.35) 0%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 4;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(0, 212, 255, 0.3);
  pointer-events: none;
}

.ring-1 { inset: 0; animation: spin 20s linear infinite; }
.ring-2 { inset: -20px; animation: spin 30s linear infinite reverse; border-color: rgba(124, 58, 237, 0.3); }
.ring-3 { inset: -40px; animation: spin 40s linear infinite; border-color: rgba(0, 212, 255, 0.15); }

@keyframes spin {
  to { transform: rotate(360deg); }
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.9);
  z-index: 5;
}

.dot-1 { animation: orbit-1 8s linear infinite; }
.dot-2 { width: 6px; height: 6px; background: var(--accent); box-shadow: 0 0 12px rgba(124, 58, 237, 0.9); animation: orbit-2 12s linear infinite; }
.dot-3 { width: 5px; height: 5px; animation: orbit-3 10s linear infinite; }

@keyframes orbit-1 {
  0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
}

@keyframes orbit-2 {
  0% { transform: rotate(120deg) translateX(200px) rotate(-120deg); }
  100% { transform: rotate(480deg) translateX(200px) rotate(-480deg); }
}

@keyframes orbit-3 {
  0% { transform: rotate(240deg) translateX(160px) rotate(-240deg); }
  100% { transform: rotate(600deg) translateX(160px) rotate(-600deg); }
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.15);
  animation: float 4s ease-in-out infinite;
  transition: all 0.3s ease;
  z-index: 6;
}

.floating-card:hover {
  border-color: var(--primary);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
  transform: translateY(-5px) scale(1.05);
}

.floating-card i { color: var(--primary); }
.floating-card small { font-size: 0.72rem; opacity: 0.7; font-weight: 500; }

.card-1 { top: 5%; left: -8%; }
.card-2 { bottom: 5%; right: -12%; animation-delay: 2s; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(1deg); }
}

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 900px) {
  .hero {
    padding-top: 100px;
    padding-bottom: 40px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  .hero-visual {
    order: -1;
    min-height: 320px;
  }

  .profile-ring {
    width: 220px;
    height: 220px;
  }

  .card-1 { left: 0; top: 0; }
  .card-2 { right: 0; bottom: 0; }

  .orbit-dot { display: none; }

  /* ✅ Role text — mobile par chhota */
  .hero-role {
    font-size: 1rem;
    min-height: 1.6rem;
    line-height: 1.4;
  }

  /* ✅ Tagline — mobile par wrap theek */
  .hero-tagline {
    font-size: 0.88rem;
    line-height: 1.5;
    padding-left: 0.75rem;
    border-left-width: 2px;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.4rem;
    text-align: left;
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-tagline i {
    display: inline-block;
    margin-top: 0.15rem;
  }

  /* ✅ Hero heading */
  .hero h1 {
    font-size: 1.7rem;
    line-height: 1.2;
  }

  /* ✅ Description */
  .hero-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-left: auto;
    margin-right: auto;
  }

  /* ✅ Tag & Buttons */
  .hero-tag {
    font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
  }

  .hero-actions {
    justify-content: center;
    gap: 0.75rem;
  }

  .hero-actions .btn {
    font-size: 0.85rem;
    padding: 0.65rem 1.25rem;
  }

  .hero-socials {
    justify-content: center;
  }

  .hero-socials a {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero h1 { font-size: 1.5rem; }
  .hero-role { font-size: 0.95rem; }
  .hero-tagline { font-size: 0.82rem; }
  .hero-desc { font-size: 0.85rem; }
  .profile-ring { width: 180px; height: 180px; }

  .floating-card {
    font-size: 0.75rem;
    padding: 0.55rem 0.85rem;
  }

  .floating-card small { font-size: 0.65rem; }
}
</style>