<template>
  <footer class="footer">
    <div class="container footer-wrap">
      <div class="footer-brand">
        <a href="#" class="logo" @click.prevent="go('home')">
          <span class="logo-zi">ZI</span>
        </a>
        <p>IT Support & Network Engineer — building reliable systems, one packet at a time.</p>
      </div>

      <div class="footer-links">
        <h4>Quick Links</h4>
        <a href="#" @click.prevent="go('about')">About</a>
        <a href="#" @click.prevent="go('projects')">Projects</a>
        <a href="#" @click.prevent="go('certifications')">Certifications</a>
        <a href="#" @click.prevent="go('contact')">Contact</a>
      </div>

      <div class="footer-social">
        <h4>Connect</h4>
        <div class="socials">
          <a href="https://github.com/zahoor631" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          <a href="https://www.linkedin.com/in/engr-zahoor-illahi-043453242" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="mailto:zahoorillahi117@gmail.com" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
          <a href="/Zahoor-Illahi-CV.pdf" download aria-label="CV"><i class="fa-solid fa-file-arrow-down"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© {{ year }} Zahoor Illahi. Built with <i class="fa-solid fa-heart"></i> using Vue 3 & Vite.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const emit = defineEmits(['navigate'])
const year = new Date().getFullYear()
const go = (id) => emit('navigate', id)
</script>

<style scoped>
.footer {
  background: var(--bg);
  border-top: 1px solid var(--border);
  padding-top: 3rem;
}

.footer-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2.5rem;
}

.footer-brand .logo {
  display: inline-block;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: transform 0.25s ease;
}
.footer-brand .logo:hover { transform: scale(1.08); }

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

.footer-brand p { color: var(--text-muted); font-size: 0.9rem; max-width: 340px; }
.footer h4 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.footer-links { display: flex; flex-direction: column; gap: 0.6rem; }
.footer-links a {
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: color 0.2s ease;
  cursor: pointer;
}
.footer-links a:hover { color: var(--primary); }
.socials { display: flex; gap: 0.75rem; }
.socials a {
  width: 40px; height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  transition: all 0.25s ease;
}
.socials a:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-3px);
}
.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 1.25rem 0;
  text-align: center;
}
.footer-bottom p { color: var(--text-muted); font-size: 0.85rem; }
.footer-bottom i { color: #ef4444; }
@media (max-width: 768px) {
  .footer-wrap { grid-template-columns: 1fr; gap: 2rem; }
}
</style>