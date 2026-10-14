<template>
  <section id="noms" class="noms">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">NOMS <span>Dashboard</span></h2>
        <p class="section-subtitle">network operations & monitoring system</p>
      </div>

      <div class="noms-wrapper tilt-card fade-in" @mousemove="tilt" @mouseleave="resetTilt">
        <div class="card-shine"></div>

        <!-- Dashboard Header -->
        <div class="dash-header">
          <div class="dash-title">
            <i class="fa-solid fa-chart-line"></i>
            <span>Network Operations Center</span>
          </div>
          <div class="dash-status">
            <span class="status-dot"></span>
            All Systems Online
          </div>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-box">
            <i class="fa-solid fa-server"></i>
            <div>
              <span class="stat-value">12</span>
              <span class="stat-label">Devices</span>
            </div>
          </div>
          <div class="stat-box">
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <span class="stat-value">12</span>
              <span class="stat-label">Online</span>
            </div>
          </div>
          <div class="stat-box">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>
              <span class="stat-value">0</span>
              <span class="stat-label">Offline</span>
            </div>
          </div>
          <div class="stat-box">
            <i class="fa-solid fa-gauge-high"></i>
            <div>
              <span class="stat-value">23ms</span>
              <span class="stat-label">Avg Latency</span>
            </div>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="dash-grid">
          <!-- Network Topology -->
          <div class="topology-panel">
            <h3><i class="fa-solid fa-network-wired"></i> Network Topology</h3>
            <div class="topology">
              <div class="topo-node node-internet">
                <i class="fa-solid fa-globe"></i>
                <span>Internet</span>
              </div>
              <div class="topo-line"></div>
              <div class="topo-node node-firewall">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Firewall</span>
              </div>
              <div class="topo-line"></div>
              <div class="topo-node node-core">
                <i class="fa-solid fa-server"></i>
                <span>Core Switch</span>
              </div>
              <div class="topo-line-branch"></div>
              <div class="topo-branch">
                <div class="topo-node node-access">
                  <i class="fa-solid fa-ethernet"></i>
                  <span>Access SW</span>
                </div>
                <div class="topo-node node-access">
                  <i class="fa-solid fa-ethernet"></i>
                  <span>Access SW</span>
                </div>
              </div>
              <div class="topo-line-branch"></div>
              <div class="topo-branch">
                <div class="topo-node node-end">
                  <i class="fa-solid fa-desktop"></i>
                  <span>PC-01</span>
                </div>
                <div class="topo-node node-end">
                  <i class="fa-solid fa-desktop"></i>
                  <span>PC-02</span>
                </div>
                <div class="topo-node node-end">
                  <i class="fa-solid fa-print"></i>
                  <span>Printer</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Traffic Graph -->
          <div class="traffic-panel">
            <h3><i class="fa-solid fa-chart-area"></i> Network Traffic</h3>
            <div class="traffic-graph">
              <svg viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="#00d4ff" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,120 L 30,100 L 60,110 L 90,80 L 120,90 L 150,60 L 180,75 L 210,50 L 240,65 L 270,40 L 300,55 L 330,30 L 360,45 L 400,25 L 400,150 L 0,150 Z"
                  fill="url(#trafficGrad)"
                />
                <path
                  d="M 0,120 L 30,100 L 60,110 L 90,80 L 120,90 L 150,60 L 180,75 L 210,50 L 240,65 L 270,40 L 300,55 L 330,30 L 360,45 L 400,25"
                  fill="none"
                  stroke="#00d4ff"
                  stroke-width="2"
                />
              </svg>
              <div class="graph-labels">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now</span>
              </div>
            </div>
            <div class="traffic-stats">
              <div>
                <span class="traffic-label">Inbound</span>
                <span class="traffic-value">↑ 45 Mbps</span>
              </div>
              <div>
                <span class="traffic-label">Outbound</span>
                <span class="traffic-value">↓ 32 Mbps</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Alerts Table -->
        <div class="alerts-panel">
          <h3><i class="fa-solid fa-bell"></i> Recent Alerts</h3>
          <div class="alerts-table">
            <div class="alert-row" v-for="(alert, i) in alerts" :key="i">
              <span class="alert-time">{{ alert.time }}</span>
              <span class="alert-device">{{ alert.device }}</span>
              <span class="alert-msg">{{ alert.message }}</span>
              <span class="alert-status" :class="alert.level">{{ alert.level }}</span>
            </div>
          </div>
        </div>

        <!-- Footer Note -->
        <div class="dash-footer">
          <i class="fa-solid fa-circle-info"></i>
          Demo preview — for illustration purposes
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tilt, resetTilt } from '../utils/tilt.js'

const alerts = [
  { time: '12:34', device: 'Core Switch', message: 'CPU usage 85% for 5 min', level: 'warning' },
  { time: '11:20', device: 'Firewall FW-01', message: 'Blocked 245 suspicious connections', level: 'info' },
  { time: '10:15', device: 'Access SW-02', message: 'Interface Gi0/5 flapped', level: 'warning' },
  { time: '09:42', device: 'Server SRV-03', message: 'Backup completed successfully', level: 'success' },
]
</script>

<style scoped>
.noms {
  background: var(--bg);
}

.noms-wrapper {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  perspective: 1200px;
  overflow: hidden;
}

/* === Dashboard Header === */
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dash-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--primary);
  font-weight: 700;
  font-size: 1rem;
}

.dash-title i {
  font-size: 1.1rem;
}

.dash-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--success);
  font-size: 0.82rem;
  font-weight: 600;
  font-family: var(--mono);
  padding: 0.4rem 0.9rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 999px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse-green 2s infinite;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
}

@keyframes pulse-green {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

/* === Stats Row === */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(0, 212, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.15);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  border-color: var(--primary);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
  transform: translateY(-2px);
}

.stat-box > i {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 8px;
  font-size: 1rem;
  flex-shrink: 0;
}

.stat-box > div {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--primary);
  font-family: var(--mono);
  line-height: 1;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.2rem;
}

/* === Dashboard Grid === */
.dash-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.topology-panel,
.traffic-panel {
  background: rgba(0, 212, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
}

.topology-panel h3,
.traffic-panel h3,
.alerts-panel h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.topology-panel h3 i,
.traffic-panel h3 i,
.alerts-panel h3 i {
  color: var(--primary);
}

/* === Topology === */
.topology {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.topo-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  font-size: 0.7rem;
  font-family: var(--mono);
  color: var(--text);
  transition: all 0.3s ease;
  min-width: 70px;
}

.topo-node i {
  color: var(--primary);
  font-size: 0.95rem;
}

.topo-node:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: var(--primary);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
  transform: scale(1.05);
}

.topo-line {
  width: 2px;
  height: 15px;
  background: linear-gradient(180deg, var(--primary), transparent);
  opacity: 0.5;
}

.topo-line-branch {
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  opacity: 0.4;
  margin: 0.25rem 0;
}

.topo-branch {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.topo-node.node-firewall { border-color: rgba(239, 68, 68, 0.4); }
.topo-node.node-firewall i { color: #ef4444; }
.topo-node.node-end { font-size: 0.65rem; min-width: 55px; }

/* === Traffic Graph === */
.traffic-graph {
  width: 100%;
  height: 150px;
  margin-bottom: 1rem;
}

.traffic-graph svg {
  width: 100%;
  height: 120px;
}

.graph-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--text-muted);
  font-family: var(--mono);
  margin-top: 0.25rem;
}

.traffic-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.traffic-stats > div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.traffic-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.traffic-value {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary);
  font-family: var(--mono);
}

/* === Alerts Panel === */
.alerts-panel {
  background: rgba(0, 212, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.alerts-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alert-row {
  display: grid;
  grid-template-columns: 50px 120px 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.6rem 0.75rem;
  background: rgba(0, 212, 255, 0.03);
  border-radius: 6px;
  font-size: 0.78rem;
  font-family: var(--mono);
  transition: all 0.25s ease;
}

.alert-row:hover {
  background: rgba(0, 212, 255, 0.08);
}

.alert-time { color: var(--text-muted); }
.alert-device { color: var(--primary); font-weight: 600; }
.alert-msg { color: var(--text-muted); }

.alert-status {
  font-size: 0.68rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
  font-weight: 700;
}

.alert-status.warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.alert-status.info { background: rgba(0, 212, 255, 0.15); color: var(--primary); }
.alert-status.success { background: rgba(16, 185, 129, 0.15); color: var(--success); }

/* === Footer Note === */
.dash-footer {
  text-align: center;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-family: var(--mono);
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

.dash-footer i {
  color: var(--primary);
}

/* === Responsive === */
@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .dash-grid { grid-template-columns: 1fr; }
  .alert-row {
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem;
  }
  .alert-row .alert-msg { grid-column: 1 / -1; }
}
</style>