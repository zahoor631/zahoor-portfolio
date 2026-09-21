<template>
  <section id="training" class="training">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Training & <span>Workshops</span></h2>
        <p class="section-subtitle">continuous learning</p>
      </div>

      <div class="training-list">
        <div
          v-for="(item, i) in trainings"
          :key="i"
          class="training-item fade-in"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div class="training-icon"><i :class="item.icon"></i></div>
          <div class="training-content">
            <div class="training-header">
              <h3>{{ item.title }}</h3>
              <span class="training-year">{{ item.year }}</span>
            </div>
            <p class="training-provider">
              <i class="fa-solid fa-building-columns"></i> {{ item.provider }}
            </p>
            <p class="training-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const trainings = [
  {
    icon: 'fa-solid fa-id-card',
  title: 'PEC Registered Engineer Training',
  provider: 'Pakistan Engineering Council (PEC)',
  year: '2026',
  desc: 'Registered as a professional engineer with the Pakistan Engineering Council. Completed all required training and ethical standards.',
  },
  {
    icon: 'fa-brands fa-windows',
    title: 'Windows Server Administration',
    provider: 'Microsoft Learn',
    year: '2024',
    desc: 'Training on AD DS, DNS, DHCP, Group Policy, and managing Windows Server roles.',
  },
 /* {
    icon: 'fa-brands fa-linux',
    title: 'Linux Command Line Essentials',
    provider: 'Linux Foundation',
    year: '2024',
    desc: 'Mastered Linux file system navigation, permissions, package management, and shell scripting basics.',
  },*/
  {
    icon: 'fa-solid fa-lock',
    title: 'Network Security & Firewalls',
    provider: 'Self-paced / Lab',
    year: '2024',
    desc: 'Configured firewalls, VPNs, and ACLs; explored IDS/IPS concepts and secure network design.',
  },
    {
    icon: 'fa-brands fa-google',
    title: 'Google IT Support Professional',
    provider: 'Coursera',
    year: '2023',
    desc: 'Comprehensive program covering troubleshooting, networking, operating systems, system administration, and IT security.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Cybersecurity Fundamentals',
    provider: 'Online Workshop',
    year: '2023',
    desc: 'Hands-on workshop on threat detection, firewalls, and basic incident response.',
  },
]
</script>

<style scoped>
.training-list { display: flex; flex-direction: column; gap: 1.25rem; }
.training-item {
  display: flex;
  gap: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem 1.75rem;
  transition: all 0.25s ease;
}
.training-item:hover { border-color: var(--primary); transform: translateX(8px); }
.training-icon {
  flex-shrink: 0;
  width: 50px; height: 50px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 10px;
  font-size: 1.25rem;
}
.training-content { flex: 1; }
.training-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}
.training-header h3 { font-size: 1.05rem; font-weight: 700; }
.training-year {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--primary);
  background: rgba(0, 212, 255, 0.08);
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
}
.training-provider { font-size: 0.85rem; color: var(--primary); margin-bottom: 0.5rem; }
.training-desc { font-size: 0.9rem; color: var(--text-muted); }
@media (max-width: 600px) {
  .training-item { flex-direction: column; gap: 1rem; }
}
</style>