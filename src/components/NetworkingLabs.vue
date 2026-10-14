<template>
  <section id="labs" class="labs">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Networking <span>Labs</span></h2>
        <p class="section-subtitle">hands-on practice & configurations</p>
      </div>

      <div class="labs-grid">
        <div
          v-for="(lab, i) in labs"
          :key="lab.title"
          class="lab-card card fade-in tilt-card"
          :style="{ transitionDelay: `${i * 0.1}s` }"
          @mousemove="tilt"
          @mouseleave="resetTilt"
        >
          <div class="card-shine"></div>

          <div class="lab-icon">
            <i :class="lab.icon"></i>
          </div>

          <h3>{{ lab.title }}</h3>
          <p class="lab-desc">{{ lab.desc }}</p>

          <div class="lab-tags">
            <span v-for="tag in lab.tags" :key="tag">{{ tag }}</span>
          </div>

          <div class="lab-status" :class="lab.status">
            <span class="status-dot"></span>
            {{ lab.statusText }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tilt, resetTilt } from '../utils/tilt.js'

const labs = [
  {
    title: 'VLAN & Inter-VLAN Routing',
    icon: 'fa-solid fa-diagram-project',
    desc: 'Configured VLANs on Cisco switches, set up trunk ports, and implemented inter-VLAN routing (Router-on-a-Stick and Layer 3 switching).',
    tags: ['Cisco', 'VLAN', 'ROAS', 'Trunk'],
    status: 'completed',
    statusText: 'Completed',
  },
  {
    title: 'Spanning Tree Protocol (STP)',
    icon: 'fa-solid fa-sitemap',
    desc: 'Explored STP operation, root bridge election, port states, and loop prevention. Tested convergence with Rapid STP.',
    tags: ['STP', 'RSTP', 'Loop Prevention'],
    status: 'completed',
    statusText: 'Completed',
  },
  {
    title: 'OSPF Dynamic Routing',
    icon: 'fa-solid fa-route',
    desc: 'Configured single-area and multi-area OSPF. Verified neighbor adjacencies, LSAs, and route summarization.',
    tags: ['OSPF', 'Routing', 'LSA'],
    status: 'completed',
    statusText: 'Completed',
  },
  {
    title: 'BGP Fundamentals',
    icon: 'fa-solid fa-globe',
    desc: 'Studied BGP path selection, eBGP vs iBGP, and route advertisement. Practiced basic neighbor configuration.',
    tags: ['BGP', 'eBGP', 'iBGP'],
    status: 'learning',
    statusText: 'Currently Learning',
  },
  {
    title: 'ACL Configuration',
    icon: 'fa-solid fa-shield',
    desc: 'Implemented standard and extended ACLs to filter traffic. Tested inbound and outbound rules on router interfaces.',
    tags: ['ACL', 'Security', 'Filtering'],
    status: 'completed',
    statusText: 'Completed',
  },
  {
    title: 'VPN & Site-to-Site',
    icon: 'fa-solid fa-lock',
    desc: 'Explored IPSec VPN concepts, tunnel configuration, and site-to-site connectivity between remote networks.',
    tags: ['VPN', 'IPSec', 'Tunnel'],
    status: 'learning',
    statusText: 'Currently Learning',
  },
]
</script>

<style scoped>
.labs {
  background: var(--bg-alt);
}

.labs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  perspective: 1200px;
}

.lab-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  position: relative;
}

.lab-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15));
  color: var(--primary);
  border-radius: 12px;
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.tilt-card:hover .lab-icon {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(124, 58, 237, 0.25));
}

.lab-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
  line-height: 1.3;
}

.tilt-card:hover h3 {
  color: var(--primary);
}

.lab-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.lab-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.lab-tags span {
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 4px;
  color: var(--primary);
  font-family: var(--mono);
}

.lab-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: var(--mono);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  align-self: flex-start;
}

.lab-status.completed {
  color: var(--success);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.lab-status.learning {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}

@media (max-width: 768px) {
  .labs-grid {
    grid-template-columns: 1fr;
  }
}
</style>