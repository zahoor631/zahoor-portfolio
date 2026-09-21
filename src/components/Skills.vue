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
          class="skill-card card fade-in"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
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
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}
.skill-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.skill-header i {
  width: 42px; height: 42px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 10px;
  font-size: 1.1rem;
}
.skill-header h3 { font-size: 1.15rem; font-weight: 700; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag {
  font-size: 0.82rem;
  padding: 0.4rem 0.85rem;
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-family: var(--mono);
  transition: all 0.2s ease;
}
.tag:hover { color: var(--primary); border-color: var(--primary); transform: translateY(-2px); }
</style>