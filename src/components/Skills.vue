<template>
  <section id="skills" class="skills">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">My <span>Skills</span></h2>
        <p class="section-subtitle">tech stack & expertise</p>
      </div>

      <div class="skills-grid">
        <div
          v-for="(group, i) in skillGroups"
          :key="group.title"
          class="skill-card card fade-in tilt-card"
          :style="{ transitionDelay: `${i * 0.1}s` }"
          @mousemove="handleTilt"
          @mouseleave="resetTilt"
        >
          <div class="card-shine"></div>
          <div class="skill-header">
            <i :class="group.icon"></i>
            <h3>{{ group.title }}</h3>
          </div>
          <div class="skill-tags">
            <span v-for="skill in group.skills" :key="skill" class="tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillGroups = [
  {
    title: 'Networking',
    icon: 'fa-solid fa-network-wired',
    skills: ['TCP/IP', 'Routing & Switching', 'VLANs', 'OSPF', 'Subnetting', 'DNS / DHCP', 'Firewall Config', 'Packet Tracer'],
  },
  {
    title: 'IT Support',
    icon: 'fa-solid fa-headset',
    skills: ['Windows 10/11', 'Hardware Troubleshooting', 'Software Installation', 'Active Directory', 'Printer Support', 'Remote Desktop', 'Ticketing Systems', 'User Training'],
  },
  {
    title: 'Systems & Servers',
    icon: 'fa-solid fa-server',
    skills: ['Windows Server', 'Linux (Ubuntu)', 'VMware', 'VirtualBox', 'Backup & Recovery', 'File Sharing', 'Group Policy', 'System Monitoring'],
  },
  {
    title: 'Security',
    icon: 'fa-solid fa-shield-halved',
    skills: ['CCTV / IP Cameras', 'Access Control', 'Antivirus Management', 'Network Security Basics', 'Firewall Rules', 'Security Auditing'],
  },
  {
    title: 'Tools',
    icon: 'fa-solid fa-screwdriver-wrench',
    skills: ['Wireshark', 'Nmap', 'TeamViewer', 'AnyDesk', 'Git & GitHub', 'MS Office 365', 'Cisco Packet Tracer', 'PuTTY'],
  },
  {
    title: 'Soft Skills',
    icon: 'fa-solid fa-people-group',
    skills: ['Problem Solving', 'Communication', 'Teamwork', 'Time Management', 'Documentation', 'Customer Service'],
  },
]

// === 3D Tilt Effect ===
const handleTilt = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // Max tilt angle (in degrees)
  const maxTilt = 10
  const rotateY = ((x - centerX) / centerX) * maxTilt
  const rotateX = ((centerY - y) / centerY) * maxTilt

  // Set CSS variables for shine effect position
  card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
  card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)

  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(15px)
    scale3d(1.02, 1.02, 1.02)
  `
  card.style.transition = 'transform 0.1s ease-out'
}

const resetTilt = (e) => {
  const card = e.currentTarget
  card.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    translateZ(0)
    scale3d(1, 1, 1)
  `
  card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
}
</script>

<style scoped>
/* ===== Skills Grid ===== */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  perspective: 1200px;
}

/* ===== Tilt Card Base ===== */
.tilt-card {
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
}

/* ===== Glow on Hover ===== */
.tilt-card:hover {
  border-color: var(--primary);
  box-shadow:
    0 25px 50px -12px rgba(0, 212, 255, 0.35),
    0 0 30px rgba(0, 212, 255, 0.15),
    inset 0 0 20px rgba(0, 212, 255, 0.05);
}

/* ===== Dynamic Shine Effect (follows mouse) ===== */
.card-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(0, 212, 255, 0.25) 0%,
    rgba(0, 212, 255, 0.08) 30%,
    transparent 60%
  );
  z-index: 1;
}

.tilt-card:hover .card-shine {
  opacity: 1;
}

/* ===== Content Above Shine ===== */
.skill-header,
.skill-tags {
  position: relative;
  z-index: 2;
  transform: translateZ(20px);
  transform-style: preserve-3d;
}

/* ===== Skill Header ===== */
.skill-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.skill-header i {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 10px;
  font-size: 1.1rem;
  transition: all 0.4s ease;
}

.tilt-card:hover .skill-header i {
  background: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
  transform: translateZ(30px) scale(1.1);
}

.skill-header h3 {
  font-size: 1.15rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.tilt-card:hover .skill-header h3 {
  color: var(--primary);
}

/* ===== Skill Tags ===== */
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.82rem;
  padding: 0.4rem 0.85rem;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-family: var(--mono);
  transition: all 0.25s ease;
  transform: translateZ(15px);
}

.tag:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateZ(25px) translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.2);
}

/* ===== Mobile Support ===== */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .tilt-card:hover {
    transform: none !important;
  }
}
</style>