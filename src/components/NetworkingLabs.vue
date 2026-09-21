<template>
  <section id="labs" class="labs">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Networking <span>Labs</span></h2>
        <p class="section-subtitle">hands-on practice</p>
      </div>

      <div class="labs-grid">
        <div
          v-for="(lab, i) in labs"
          :key="lab.title"
          class="lab-card fade-in"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div class="lab-number">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="lab-body">
            <h3>{{ lab.title }}</h3>
            <p>{{ lab.desc }}</p>
            <div class="lab-meta">
              <span><i class="fa-solid fa-wrench"></i> {{ lab.tool }}</span>
              <span><i class="fa-solid fa-signal"></i> {{ lab.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const labs = [
  {
    title: 'VLAN Configuration & Trunking',
    desc: 'Created multiple VLANs, configured trunk links between switches, and verified inter-VLAN routing using a router-on-a-stick setup.',
    tool: 'Cisco Packet Tracer',
    level: 'Intermediate',
  },
  {
    title: 'Static & Dynamic Routing',
    desc: 'Implemented static routes, RIP, and OSPF across multiple routers and verified end-to-end connectivity.',
    tool: 'Packet Tracer',
    level: 'Intermediate',
  },
  {
    title: 'DHCP & DNS Server Setup',
    desc: 'Configured a Windows Server as DHCP and DNS, joined clients to the domain, and tested name resolution.',
    tool: 'Windows Server',
    level: 'Intermediate',
  },
  {
    title: 'Subnetting Practice',
    desc: 'Solved dozens of VLSM and CIDR subnetting scenarios to build speed and accuracy in IP planning.',
    tool: 'Paper / Subnet Calculators',
    level: 'Beginner → Advanced',
  },
  {
    title: 'Network Security — ACLs',
    desc: 'Configured standard and extended ACLs to filter traffic between departments and block unauthorized access.',
    tool: 'Packet Tracer',
    level: 'Intermediate',
  },
  {
    title: 'Wireshark Traffic Analysis',
    desc: 'Captured and analyzed packets to understand TCP handshakes, DNS queries, and troubleshoot latency issues.',
    tool: 'Wireshark',
    level: 'Intermediate',
  },
  {
    title: 'Home Lab — Virtualization',
    desc: 'Built a home lab with VMware and VirtualBox running multiple VMs for testing and learning.',
    tool: 'VMware / VirtualBox',
    level: 'Beginner',
  },
  {
    title: 'Structured Cabling',
    desc: 'Practiced RJ-45 crimping, patch panel termination, and cable testing to T568A/B standards.',
    tool: 'Crimper / Tester',
    level: 'Beginner',
  },
]
</script>

<style scoped>
.labs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}
.lab-card {
  display: flex;
  gap: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: all 0.25s ease;
}
.lab-card:hover { border-color: var(--primary); transform: translateY(-4px); box-shadow: var(--shadow); }
.lab-number {
  font-family: var(--mono);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  opacity: 0.4;
  line-height: 1;
}
.lab-body h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
.lab-body p { color: var(--text-muted); font-size: 0.88rem; margin-bottom: 0.85rem; }
.lab-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: var(--mono);
}
.lab-meta i { color: var(--primary); margin-right: 0.25rem; }
</style>