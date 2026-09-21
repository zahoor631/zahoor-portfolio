<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">My <span>Projects</span></h2>
        <p class="section-subtitle">things i've built</p>
      </div>

      <div class="projects-grid">
        <article
          v-for="(project, i) in projects"
          :key="project.title"
          class="project-card card fade-in"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="project-top">
            <div class="project-icon"><i :class="project.icon"></i></div>
            <div class="project-links">
              <a v-if="project.github" :href="project.github" target="_blank" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" aria-label="Live">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="project-tags">
            <span v-for="t in project.tech" :key="t">{{ t }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Small Office Network Design',
    desc: 'Designed and simulated a complete small-office network with VLANs, inter-VLAN routing, DHCP, and OSPF in Cisco Packet Tracer.',
    icon: 'fa-solid fa-network-wired',
    tech: ['Cisco', 'VLANs', 'OSPF', 'Packet Tracer'],
    github: '#',
  },
  {
    title: 'IT Helpdesk Ticketing System',
    desc: 'Built a lightweight web-based ticketing system for tracking IT support requests with priority levels and status updates.',
    icon: 'fa-solid fa-ticket',
    tech: ['Vue.js', 'Node.js', 'SQLite'],
    github: '#',
  },
  {
    title: 'Home Lab — Windows Server & AD',
    desc: 'Configured a Windows Server home lab with Active Directory, DNS, DHCP, Group Policy, and client domain joining.',
    icon: 'fa-solid fa-server',
    tech: ['Windows Server', 'Active Directory', 'DNS'],
    github: '#',
  },
  {
    title: 'Network Monitoring Dashboard',
    desc: 'Created a lightweight dashboard to monitor network device uptime and latency using Python and SNMP.',
    icon: 'fa-solid fa-chart-line',
    tech: ['Python', 'SNMP', 'Flask'],
    github: '#',
  },
  {
    title: 'CCTV & Access Control Setup',
    desc: 'Deployed IP camera surveillance and access control system for a small business, including remote viewing configuration.',
    icon: 'fa-solid fa-video',
    tech: ['IP Cameras', 'NVR', 'Networking'],
  },
  {
    title: 'Linux File Server',
    desc: 'Set up an Ubuntu-based file server with Samba sharing, user permissions, and automated backups.',
    icon: 'fa-brands fa-linux',
    tech: ['Ubuntu', 'Samba', 'Bash'],
    github: '#',
  },
]
</script>

<style scoped>
.projects { background: var(--bg-alt); }
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.project-card { display: flex; flex-direction: column; }
.project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}
.project-icon {
  width: 48px; height: 48px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 10px;
  font-size: 1.2rem;
}
.project-links { display: flex; gap: 0.75rem; }
.project-links a { color: var(--text-muted); font-size: 1rem; transition: color 0.2s ease; }
.project-links a:hover { color: var(--primary); }
.project-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; }
.project-card p { color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.25rem; flex: 1; }
.project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.project-tags span {
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
  font-family: var(--mono);
}
</style>