<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-wrap">
      <a href="#" class="logo" @click.prevent="go('home')">
        <span class="logo-zi">ZI</span>
      </a>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <a
          v-for="link in links"
          :key="link.id"
          href="#"
          :class="{ active: activeSection === link.id }"
          @click.prevent="go(link.id)"
        >
          {{ link.label }}
        </a>
        <a href="/Zahoor-Illahi-CV.pdf" download class="btn btn-primary cv-btn">
          <i class="fa-solid fa-download"></i> Resume
        </a>
      </nav>

      <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="Menu">
        <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  activeSection: { type: String, default: 'home' },
})
const emit = defineEmits(['navigate'])

const isScrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'labs', label: 'Labs' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'training', label: 'Training' },
  { id: 'contact', label: 'Contact' },
]

const go = (id) => {
  emit('navigate', id)
  menuOpen.value = false
}

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
}
.navbar.scrolled {
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0.6rem 0;
}
.nav-wrap { display: flex; justify-content: space-between; align-items: center; }

.logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.25s ease;
}
.logo:hover { transform: scale(1.08); }

.logo-zi {
  font-size: 1.9rem;
  font-weight: 900;
  font-family: var(--mono);
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.4));
}

.nav-links { display: flex; align-items: center; gap: 1.5rem; }
.nav-links a:not(.cv-btn) {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s ease;
  position: relative;
  cursor: pointer;
}
.nav-links a:not(.cv-btn)::after {
  content: '';
  position: absolute;
  bottom: -6px; left: 0;
  width: 0; height: 2px;
  background: var(--primary);
  transition: width 0.25s ease;
}
.nav-links a:not(.cv-btn):hover { color: var(--primary); }
.nav-links a:not(.cv-btn):hover::after { width: 100%; }

.nav-links a.active {
  color: var(--primary) !important;
}
.nav-links a.active::after { width: 100%; }

.cv-btn { padding: 0.55rem 1.2rem; font-size: 0.85rem; }
.hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
}
@media (max-width: 992px) {
  .hamburger { display: block; }
  .nav-links {
    position: fixed;
    top: 0; right: -100%;
    width: 75%;
    max-width: 320px;
    height: 100vh;
    background: var(--bg-alt);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transition: right 0.35s ease;
    border-left: 1px solid var(--border);
  }
  .nav-links.open { right: 0; }
  .nav-links a { font-size: 1.1rem; }
}
</style>