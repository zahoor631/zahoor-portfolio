<template>
  <section id="certifications" class="certifications">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Certifi<span>cations</span></h2>
        <p class="section-subtitle">credentials & achievements</p>
      </div>

      <div class="certs-grid">
        <a
          v-for="(cert, i) in certs"
          :key="cert.name"
          :href="cert.file"
          target="_blank"
          rel="noopener noreferrer"
          class="cert-card card fade-in"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="cert-icon">
            <i class="fa-solid fa-award"></i>
          </div>
          <h3>{{ cert.name }}</h3>
          <p class="cert-issuer">{{ cert.issuer }}</p>
          <p class="cert-date"><i class="fa-regular fa-calendar"></i> {{ cert.date }}</p>
          <span class="cert-view">
            View Certificate <i class="fa-solid fa-arrow-right"></i>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const certs = [
  {
    name: 'Network Technician Career Path',
    issuer: 'Cisco Networking Academy',
    date: '04 Aug 2026',
    file: '/certificates/network-technician.pdf',
  },
  {
    name: 'Artificial Intelligence Fundamentals',
    issuer: 'Huawei ICT Academy',
    date: '09 Aug 2026',
    file: '/certificates/ai-fundamentals.pdf',
  },
  {
    name: 'Internship Certificate — IT Department',
    issuer: 'Karachi Shipyard & Engineering Works Ltd (KS&EW)',
    date: 'Apr 2026 — Aug 2026',
    file: '/certificates/karachi-shipyard-internship.pdf',
  },
  {
    name: 'Internship Certificate — IT Department',
    issuer: 'FFC Fauji Fertilizer Company Limited',
    date: 'Jan 2026 — Feb 2026',
    file: '/certificates/ffc-internship.pdf',
  },
  {
    name: 'Internship Certificate — Software Development',
    issuer: 'Ability (Pvt) Ltd',
    date: 'Jan 2025 — Feb 2025',
    file: '/certificates/ability-internship.pdf',
  },
  {
    name: 'Internship Certificate — Tech Division',
    issuer: 'Sybrid (Pvt) Ltd — A Lakson Group Company',
    date: 'Jan 2024 — Feb 2024',
    file: '/certificates/sybrid-internship.pdf',
  },
]
</script>

<style scoped>
.certifications {
  background: var(--bg-alt);
}

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.cert-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem 1.5rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.cert-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15));
  border: 1px solid var(--border);
  border-radius: 50%;
  font-size: 1.5rem;
  color: var(--primary);
}

.cert-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.cert-issuer {
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.cert-date {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-family: var(--mono);
  margin-bottom: 1rem;
}

.cert-view {
  font-size: 0.82rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
  transition: color 0.2s ease;
  margin-top: auto;
}

.cert-card:hover .cert-view {
  color: var(--primary);
}
</style>