<template>
  <section id="experience" class="experience">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Work <span>Experience</span></h2>
        <p class="section-subtitle">my professional journey</p>
      </div>

      <div class="timeline">
        <div
          v-for="(job, i) in experiences"
          :key="i"
          class="timeline-item fade-in"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content card">
            <div class="job-header">
              <div>
                <h3>{{ job.role }}</h3>
                <p class="company"><i class="fa-solid fa-building"></i> {{ job.company }}</p>
              </div>
              <span class="period">{{ job.period }}</span>
            </div>
            <ul>
              <li v-for="point in job.points" :key="point">{{ point }}</li>
            </ul>
            <div class="tech-tags">
              <span v-for="t in job.tech" :key="t" class="tech-tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experiences = [
  {
    role: 'IT Support Engineer',
    company: 'karachi shipyard & engineering works limited',
    period: '1-APR-2026 - 30-AUG-2026',
    points: [
      'Provide first and second-level technical support to 100+ users across the organization.',
      'Install, configure, and troubleshoot Windows desktops, laptops, printers, and peripherals.',
      'Manage Active Directory users, groups, and Group Policy objects.',
      'Maintain IT asset inventory and documentation of support tickets.',
    ],
    tech: ['Windows', 'Active Directory', 'Office 365', 'Ticketing'],
  },
  {
    role: 'Network Support Intern',
    company: ' Fauji Fertilizer Company Mirpur Mathelo',
    period: '05-Jan-2026 — 20-Feb-2026',
    points: [
      'Assisted in configuring Cisco routers and switches in a lab environment.',
      'Performed structured cabling, patch panel termination, and LAN setup.',
      'Monitored network performance and troubleshot connectivity issues.',
      'Documented network topology diagrams for internal use.',
    ],
    tech: ['Cisco', 'VLANs', 'TCP/IP', 'Packet Tracer'],
  },
  {
    role: 'Freelance IT Technician',
    company: 'Self-Employed',
    period: '2024 — 2025',
    points: [
      'Delivered on-site IT support for small businesses and home offices.',
      'Configured routers, Wi-Fi networks, and IP camera systems for clients.',
      'Performed OS installation, data backup, and malware removal.',
    ],
    tech: ['Networking', 'CCTV', 'Hardware', 'Windows'],
  },
]
</script>

<style scoped>
.experience { background: var(--bg-alt); }
.timeline { position: relative; padding-left: 2rem; }
.timeline::before {
  content: '';
  position: absolute;
  left: 6px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary), var(--accent));
  opacity: 0.4;
}
.timeline-item { position: relative; margin-bottom: 2rem; }
.timeline-dot {
  position: absolute;
  left: -2rem;
  top: 1.75rem;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid var(--bg-alt);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2);
  z-index: 1;
}
.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.job-header h3 { font-size: 1.15rem; font-weight: 700; color: var(--primary); }
.company { font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem; }
.period {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  background: var(--bg-alt);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  white-space: nowrap;
}
.timeline-content ul { list-style: none; margin-bottom: 1rem; }
.timeline-content li {
  color: var(--text-muted);
  font-size: 0.93rem;
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}
.timeline-content li::before { content: '▸'; position: absolute; left: 0; color: var(--primary); }
.tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 4px;
  font-family: var(--mono);
}
</style>