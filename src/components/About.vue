<template>
  <section id="about" class="about">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">About <span>Me</span></h2>
        <p class="section-subtitle">who am i</p>
      </div>
      <div class="about-grid fade-in">
        <div class="about-text">
          <!-- === NEW: Availability Badge === -->
          <div class="availability-badge">
            <span class="pulse-dot"></span>
            <span>Available for Full-time & Freelance Opportunities</span>
          </div>

          <p>
            I'm a passionate <strong>IT Support & Network Engineer</strong> with
            hands-on experience at
            <strong>Karachi Shipyard & Engineering Works (KS&EW)</strong>
            and <strong>FFC Fauji Fertilizer Company</strong>. Skilled in
            troubleshooting hardware & software, configuring network devices,
            and maintaining secure enterprise IT environments.
          </p>
          <p>
            At <strong>Karachi Shipyard</strong>, I worked with the Information
            Technology Department on enterprise IT infrastructure, networking,
            systems administration, cybersecurity, and ERP/IFS systems. At
            <strong>FFC Fauji Fertilizer</strong>, I gained hands-on experience
            in IT operations at a large-scale industrial plant.
          </p>
          <p>
            My journey in tech started with curiosity about how systems communicate.
            Today, I focus on building reliable networks, supporting users, and
            continuously expanding my knowledge in cybersecurity, cloud
            infrastructure, and enterprise IT operations.
          </p>
          <p>
            I thrive on solving problems, learning new technologies, and delivering
            solutions that make a real difference. Currently seeking opportunities
            where I can contribute, learn, and grow as an IT professional.
          </p>

          <div class="about-stats">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat tilt-card"
              @mousemove="tilt"
              @mouseleave="resetTilt"
            >
              <div class="card-shine"></div>
              <span class="stat-num">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="about-info">
          <div
            v-for="info in aboutInfo"
            :key="info.label"
            class="info-card tilt-card"
            @mousemove="tilt"
            @mouseleave="resetTilt"
          >
            <div class="card-shine"></div>
            <i :class="info.icon"></i>
            <div>
              <span class="info-label">{{ info.label }}</span>
              <span class="info-value" :class="{ available: info.available }">
                {{ info.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tilt, resetTilt } from '../utils/tilt.js'

const stats = [
  { value: '4', label: 'Internships' },
  { value: '6', label: 'Certifications' },
  { value: '2.75', label: 'CGPA' },
  { value: 'PEC', label: 'Registered' },
]

const aboutInfo = [
  { icon: 'fa-solid fa-user', label: 'Name', value: 'Zahoor Illahi' },
  { icon: 'fa-solid fa-briefcase', label: 'Role', value: 'IT & Network Engineer' },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Balochistan, Pakistan' },
  { icon: 'fa-solid fa-language', label: 'Languages', value: 'English, Urdu, Balochi, Sindhi' },
  { icon: 'fa-solid fa-id-card', label: 'PEC Registered', value: 'Reg. No: 028399' },
  { icon: 'fa-solid fa-graduation-cap', label: 'CGPA', value: '2.75 / 4.00 — BE Computer Systems' },
  { icon: 'fa-solid fa-circle-check', label: 'Availability', value: 'Open to Work', available: true },
]
</script>

<style scoped>
.about { background: var(--bg-alt); }

.about-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  align-items: start;
  perspective: 1200px;
}

/* === NEW: Availability Badge === */
.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: var(--success);
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-family: var(--mono);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);
}

.pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse-green 2s infinite;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
  flex-shrink: 0;
}

@keyframes pulse-green {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

.about-text p {
  color: var(--text-muted);
  margin-bottom: 1.2rem;
  font-size: 1.02rem;
  line-height: 1.7;
}

.about-text strong { color: var(--primary); font-weight: 600; }

.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.stat {
  text-align: center;
  background: rgba(0, 212, 255, 0.03);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 0.5rem;
  transition: all 0.3s ease;
}

.stat-num {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary);
  font-family: var(--mono);
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.about-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}

.info-card i {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 8px;
  font-size: 1rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.info-card:hover i {
  transform: scale(1.15) rotate(-5deg);
  background: rgba(0, 212, 255, 0.25);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.info-card div { display: flex; flex-direction: column; }

.info-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value { font-weight: 600; font-size: 0.95rem; }

.available { color: var(--success); }

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-stats { grid-template-columns: repeat(2, 1fr); }
  .availability-badge {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}
</style>