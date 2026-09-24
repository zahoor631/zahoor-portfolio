<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">My <span>Projects</span></h2>
        <p class="section-subtitle">things i've built</p>
      </div>

      <div class="projects-grid">
        <component
          :is="project.github || project.demo ? 'a' : 'article'"
          v-for="(project, i) in projects"
          :key="project.title"
          :href="project.demo || project.github || undefined"
          :target="project.demo || project.github ? '_blank' : undefined"
          :rel="project.demo || project.github ? 'noopener noreferrer' : undefined"
          class="project-card card fade-in"
          :class="{ clickable: project.github || project.demo }"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="project-top">
            <div class="project-icon"><i :class="project.icon"></i></div>
            <div class="project-links">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                @click.stop
              >
                <i class="fa-brands fa-github"></i>
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                @click.stop
              >
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="project-tags">
            <span v-for="t in project.tech" :key="t">{{ t }}</span>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'NOMS — Network Operations & Monitoring System',
    desc: 'A comprehensive system for real-time monitoring, managing, and reporting on network devices, traffic, and incidents. Streamlines network administration with alerts, dashboards, and logs.',
    icon: 'fa-solid fa-network-wired',
    tech: ['Python', 'SNMP', 'Flask', 'MySQL'],
    github: 'https://github.com/zahoor631/noms-network-monitoring',
  },
  {
    title: 'Dental Patient Manager',
    desc: 'A desktop application designed for dental/medical practices to manage patient records, appointments, and practice operations efficiently.',
    icon: 'fa-solid fa-tooth',
    tech: ['Python', 'Tkinter', 'SQLite'],
    github: 'https://github.com/zahoor631/dental-patient-manager',
  },
  {
    title: 'Academic Pages Portfolio',
    desc: 'Personal academic portfolio website built with Jekyll and hosted on GitHub Pages. Showcases research, publications, and professional background.',
    icon: 'fa-solid fa-graduation-cap',
    tech: ['Jekyll', 'GitHub Pages', 'Markdown', 'HTML'],
    github: 'https://github.com/zahoor631/academicpages.github.io',
  },
  {
    title: 'Portfolio Website (This Site)',
    desc: 'A modern, responsive personal portfolio built with Vue 3 and Vite, featuring dark theme, smooth animations, and AI chatbot integration. Deployed on Netlify.',
    icon: 'fa-solid fa-globe',
    tech: ['Vue 3', 'Vite', 'CSS', 'Netlify'],
    github: 'https://github.com/zahoor631/zahoor-portfolio',
    demo: 'https://zahoor-illahi.netlify.app',
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

/* Project Card */
.project-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

/* Clickable card */
.project-card.clickable {
  cursor: pointer;
}

.project-card.clickable:hover {
  border-color: var(--primary);
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.15);
}

.project-card.clickable:hover h3 {
  color: var(--primary);
}

/* Clickable card — show a hint */
.project-card.clickable::after {
  content: 'Click to view →';
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  font-size: 0.75rem;
  color: var(--primary);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  font-family: var(--mono);
  pointer-events: none;
}

.project-card.clickable:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* Make sure the card is relative */
.project-card {
  position: relative;
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.project-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 10px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.project-card.clickable:hover .project-icon {
  transform: scale(1.1) rotate(-5deg);
  background: rgba(0, 212, 255, 0.2);
}

.project-links {
  display: flex;
  gap: 0.75rem;
}

.project-links a {
  color: var(--text-muted);
  font-size: 1rem;
  transition: color 0.2s ease;
  z-index: 2;
  position: relative;
}

.project-links a:hover {
  color: var(--primary);
}

.project-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  transition: color 0.25s ease;
}

.project-card p {
  color: var(--text-muted);
  font-size: 0.92rem;
  margin-bottom: 1.25rem;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tags span {
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
  font-family: var(--mono);
  transition: all 0.25s ease;
}

.project-card.clickable:hover .project-tags span {
  border-color: rgba(0, 212, 255, 0.3);
}
</style>