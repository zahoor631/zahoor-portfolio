<template>
  <Navbar :activeSection="activeSection" @navigate="changeSection" />

  <main>
    <Transition name="section-fade" mode="out-in">
      <Hero v-if="activeSection === 'home'" key="home" />
      <About v-else-if="activeSection === 'about'" key="about" />
      <Skills v-else-if="activeSection === 'skills'" key="skills" />
      <Experience v-else-if="activeSection === 'experience'" key="experience" />
      <Education v-else-if="activeSection === 'education'" key="education" />
      <Projects v-else-if="activeSection === 'projects'" key="projects" />
      <NetworkingLabs v-else-if="activeSection === 'labs'" key="labs" />
      <Certifications v-else-if="activeSection === 'certifications'" key="certifications" />
      <Training v-else-if="activeSection === 'training'" key="training" />
      <Contact v-else-if="activeSection === 'contact'" key="contact" />
    </Transition>
  </main>

  <Footer @navigate="changeSection" />
  <AIChat />
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Education from './components/Education.vue'
import Projects from './components/Projects.vue'
import NetworkingLabs from './components/NetworkingLabs.vue'
import Certifications from './components/Certifications.vue'
import Training from './components/Training.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AIChat from './components/AIChat.vue'

// Home default
const activeSection = ref('home')

const changeSection = (section) => {
  activeSection.value = section
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Har section change pe fade-in apply
watch(activeSection, async () => {
  await nextTick()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fade-in').forEach((el) => {
    el.classList.remove('visible')
    observer.observe(el)
  })
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})
</script>

<style>
.section-fade-enter-active,
.section-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.section-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>