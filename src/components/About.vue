<template>
  <section id="about" class="about">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">About <span>Me</span></h2>
        <p class="section-subtitle">who am i</p>
      </div>
      <div class="about-grid fade-in">
        <div class="about-text">
          <p>I'm an enthusiastic <strong>IT Support & Network Engineer</strong> with hands-on experience in troubleshooting hardware and software issues, configuring network devices, and maintaining secure IT environments.</p>
          <p>My journey in tech started with a curiosity about how systems communicate. Today, I focus on building reliable networks, supporting users, and continuously expanding my knowledge in cybersecurity and cloud infrastructure.</p>
          <p>I thrive on solving problems, learning new technologies, and delivering solutions that make a real difference.</p>
          <div class="about-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat">
              <span class="stat-num">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <div class="about-info">
          <div class="info-card"><i class="fa-solid fa-user"></i><div><span class="info-label">Name</span><span class="info-value">Zahoor Illahi</span></div></div>
          <div class="info-card"><i class="fa-solid fa-briefcase"></i><div><span class="info-label">Role</span><span class="info-value">IT & Network Engineer</span></div></div>
          <div class="info-card"><i class="fa-solid fa-location-dot"></i><div><span class="info-label">Location</span><span class="info-value">Balochistan, Pakistan</span></div></div>
          <div class="info-card"><i class="fa-solid fa-language"></i><div><span class="info-label">Languages</span><span class="info-value">English, Urdu, Balochi, Sindhi</span></div></div>
          <div class="info-card"><i class="fa-solid fa-circle-check"></i><div><span class="info-label">Availability</span><span class="info-value available">Open to Work</span></div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Done' },
  { value: '5+', label: 'Certifications' },
  { value: '100%', label: 'Dedication' },
]
</script>

<style scoped>
.about { background: var(--bg-alt); }
.about-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  align-items: start;
}
.about-text p { color: var(--text-muted); margin-bottom: 1.2rem; font-size: 1.02rem; }
.about-text strong { color: var(--primary); }
.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}
.stat { text-align: center; }
.stat-num { display: block; font-size: 1.75rem; font-weight: 800; color: var(--primary); font-family: var(--mono); }
.stat-label { font-size: 0.8rem; color: var(--text-muted); }
.about-info { display: flex; flex-direction: column; gap: 1rem; }
.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  transition: all 0.25s ease;
}
.info-card:hover { border-color: var(--primary); transform: translateX(6px); }
.info-card i {
  width: 40px; height: 40px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 8px;
  font-size: 1rem;
}
.info-card div { display: flex; flex-direction: column; }
.info-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.info-value { font-weight: 600; font-size: 0.95rem; }
.available { color: var(--success); }
@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-stats { grid-template-columns: repeat(2, 1fr); }
}
</style>