<template>
  <section id="skills" class="skills">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Technical <span>Skills</span></h2>
        <p class="section-subtitle">tech stack & expertise</p>
      </div>

      <div class="skills-grid">
        <div
          v-for="(group, i) in skillGroups"
          :key="group.title"
          class="skill-card card fade-in tilt-card"
          :style="{ transitionDelay: `${i * 0.1}s` }"
          @mousemove="tilt"
          @mouseleave="resetTilt"
        >
          <div class="card-shine"></div>

          <div class="skill-header">
            <div class="skill-icon-wrap">
              <i :class="group.icon"></i>
            </div>
            <h3>{{ group.title }}</h3>
          </div>

          <div class="skill-bars">
            <div
              v-for="skill in group.skills"
              :key="skill.name"
              class="skill-bar-item"
            >
              <div class="skill-bar-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percent">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar-track">
                <div
                  class="skill-bar-fill"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tilt, resetTilt } from '../utils/tilt.js'

const skillGroups = [
  {
    title: 'Networking',
    icon: 'fa-solid fa-network-wired',
    skills: [
      { name: 'LAN/WAN, TCP/IP, Routing, Switching', level: 85 },
      { name: 'VLAN, OSPF, BGP Fundamentals', level: 80 },
      { name: 'Subnetting & IP Addressing', level: 85 },
      { name: 'Network Troubleshooting', level: 80 },
    ],
  },
  {
    title: 'Operating Systems',
    icon: 'fa-solid fa-server',
    skills: [
      { name: 'Windows 10/11, Windows Server', level: 80 },
      { name: 'Linux (Ubuntu) Fundamentals', level: 70 },
      { name: 'System Administration', level: 75 },
    ],
  },
  {
    title: 'Programming',
    icon: 'fa-solid fa-code',
    skills: [
      { name: 'Python, JavaScript', level: 75 },
      { name: 'Vue.js, React (Basics)', level: 70 },
      { name: 'HTML, CSS, Git', level: 80 },
    ],
  },
  {
    title: 'Web Technologies',
    icon: 'fa-solid fa-globe',
    skills: [
      { name: 'Vue 3, Vite', level: 75 },
      { name: 'React Fundamentals', level: 65 },
      { name: 'Tailwind CSS', level: 70 },
    ],
  },
  {
    title: 'Databases & ERP',
    icon: 'fa-solid fa-database',
    skills: [
      { name: 'MySQL, Oracle Basics', level: 70 },
      { name: 'IFS ERP Exposure', level: 65 },
      { name: 'Database Management', level: 70 },
    ],
  },
  {
    title: 'Tools & Others',
    icon: 'fa-solid fa-screwdriver-wrench',
    skills: [
      { name: 'Cisco Packet Tracer', level: 80 },
      { name: 'VMware, VirtualBox', level: 75 },
      { name: 'Wireshark, Nmap', level: 70 },
    ],
  },
]
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.75rem;
  perspective: 1200px;
}

.skill-card {
  position: relative;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* === Skill Header === */
.skill-header {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.skill-icon-wrap {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 12px;
  font-size: 1.15rem;
  transition: all 0.4s ease;
  flex-shrink: 0;
}

.tilt-card:hover .skill-icon-wrap {
  background: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 25px rgba(0, 212, 255, 0.5);
  transform: scale(1.08) rotate(-5deg);
}

.skill-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.tilt-card:hover .skill-header h3 {
  color: var(--primary);
}

/* === Skill Bars === */
.skill-bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-bar-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.skill-bar-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
}

.skill-name {
  color: var(--text-muted);
  font-family: var(--mono);
  font-weight: 500;
}

.skill-percent {
  color: var(--primary);
  font-family: var(--mono);
  font-weight: 700;
  font-size: 0.78rem;
}

.skill-bar-track {
  width: 100%;
  height: 6px;
  background: rgba(0, 212, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.skill-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #7c3aed);
  border-radius: 999px;
  transition: width 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 
    0 0 10px rgba(0, 212, 255, 0.6),
    0 0 20px rgba(0, 212, 255, 0.3);
  position: relative;
}

/* Shimmer effect on bar */
.skill-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* === Mobile === */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>