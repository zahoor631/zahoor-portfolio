<template>
  <header class="navbar">
    <div class="container nav-container">
      <a href="#" class="logo" @click.prevent="goHome">
        <span class="logo-mark">ZI</span>
      </a>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <a
          v-for="link in links"
          :key="link.id"
          href="#"
          :class="{ active: activeSection === link.id }"
          @click.prevent="navigate(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <a
        href="/Zahoor-Illahi-CV.pdf"
        download
        class="btn btn-primary resume-btn"
      >
        <i class="fa-solid fa-download"></i>
        Resume
      </a>

      <button class="menu-btn" @click="menuOpen = !menuOpen" aria-label="Menu">
        <i :class="menuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  activeSection: {
    type: String,
    default: 'home',
  },
})

const emit = defineEmits(['navigate'])

const menuOpen = ref(false)

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'labs', label: 'Labs' },
  { id: 'noms', label: 'NOMS' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'training', label: 'Training' },
  { id: 'contact', label: 'Contact' },
]

const navigate = (id) => {
  emit('navigate', id)
  menuOpen.value = false
}

const goHome = () => {
  emit('navigate', 'home')
  menuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  padding: 1rem 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-mark {
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
  justify-content: center;
}

.nav-links a {
  color: var(--text-muted, #8b95a8);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.25s ease;
  position: relative;
  white-space: nowrap;
}

.nav-links a:hover {
  color: #00d4ff;
}

.nav-links a.active {
  color: #00d4ff;
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: #00d4ff;
  border-radius: 999px;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.7);
}

.resume-btn {
  flex-shrink: 0;
  font-size: 0.85rem;
  padding: 0.6rem 1.25rem;
}

.menu-btn {
  display: none;
  background: transparent;
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: #00d4ff;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1200px) {
  .nav-links { gap: 0.9rem; }
  .nav-links a { font-size: 0.78rem; }
}

@media (max-width: 900px) {
  .menu-btn {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: rgba(10, 14, 26, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 1.25rem;
    transform: translateY(-150%);
    transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
    max-height: calc(100vh - 72px);
    overflow-y: auto;
  }

  .nav-links.open {
    transform: translateY(0);
  }

  .nav-links a {
    font-size: 1rem;
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
  }

  .nav-links a.active::after {
    display: none;
  }

  .nav-links a.active {
    background: rgba(0, 212, 255, 0.1);
    border-radius: 8px;
  }
}
</style>