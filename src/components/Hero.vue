<template>
  <section id="home" class="hero">
    <div class="hero-bg"></div>
    <div class="container hero-grid">
      <div class="hero-text fade-in">
        <p class="hero-tag">
          <span class="dot"></span> Available for opportunities
        </p>
        <h1>Hi, I'm <span class="gradient">Zahoor Illahi</span></h1>
        <h2 class="hero-role">
          <span>{{ currentRole }}</span><span class="cursor">|</span>
        </h2>
        <p class="hero-desc">
          IT Support & Network Engineer passionate about building reliable
          infrastructure, troubleshooting complex systems, and keeping networks
          secure and efficient.
        </p>

        <div class="hero-actions">
          <a href="#" class="btn btn-primary" @click.prevent="goToProjects">
            <i class="fa-solid fa-rocket"></i> View Projects
          </a>
          <a href="#" class="btn btn-outline" @click.prevent="goToContact">
            <i class="fa-solid fa-paper-plane"></i> Get in Touch
          </a>
          <a href="/Zahoor-Illahi-CV.pdf" download class="btn btn-outline">
            <i class="fa-solid fa-file-arrow-down"></i> Download CV
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
        <div class="profile-ring">
          <div class="profile-img">
            <img src="/profile.jpeg" alt="Zahoor Illahi" />
          </div>
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
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

const goToProjects = () => {
  emit('navigate', 'projects')
}

const goToContact = () => {
  emit('navigate', 'contact')
}

const roles = [
  'IT Support Specialist',
  'Network Engineer',
  'CCNA Certified',
  'Problem Solver',
  'System Administrator',
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
}
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.12), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.12), transparent 40%);
  pointer-events: none;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
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
  width: 8px; height: 8px;
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
  margin-bottom: 1rem;
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
  margin-bottom: 1.5rem;
  font-family: var(--mono);
  min-height: 2.2rem;
}
.cursor { color: var(--primary); animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0; } }
.hero-desc {
  color: var(--text-muted);
  font-size: 1.05rem;
  max-width: 550px;
  margin-bottom: 2rem;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.hero-socials { display: flex; gap: 1rem; }
.hero-socials a {
  width: 42px; height: 42px;
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
  transform: translateY(-3px);
}
.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 400px;
}
.profile-ring {
  position: relative;
  width: 300px;
  height: 300px;
}
.profile-img {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary);
  box-shadow: 0 0 40px rgba(0, 212, 255, 0.4);
  z-index: 2;
}
.profile-img img { width: 100%; height: 100%; object-fit: cover; }
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(0, 212, 255, 0.3);
}
.ring-1 { inset: 0; animation: spin 20s linear infinite; }
.ring-2 { inset: -20px; animation: spin 30s linear infinite reverse; border-color: rgba(124, 58, 237, 0.3); }
@keyframes spin { to { transform: rotate(360deg); } }
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
  box-shadow: var(--shadow);
  animation: float 4s ease-in-out infinite;
}
.floating-card i { color: var(--primary); }
.floating-card small { font-size: 0.72rem; opacity: 0.7; font-weight: 500; }
.card-1 { top: 10%; left: -5%; }
.card-2 { bottom: 10%; right: -5%; animation-delay: 2s; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-desc { margin-left: auto; margin-right: auto; }
  .hero-actions, .hero-socials { justify-content: center; }
  .hero-visual { order: -1; }
  .profile-ring { width: 220px; height: 220px; }
}
</style>