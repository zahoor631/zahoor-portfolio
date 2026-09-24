<template>
  <Navbar :activeSection="activeSection" @navigate="changeSection" />

  <main>
    <Hero v-if="activeSection === 'home'" @navigate="changeSection" />
    <About v-else-if="activeSection === 'about'" />
    <Skills v-else-if="activeSection === 'skills'" />
    <Experience v-else-if="activeSection === 'experience'" />
    <Education v-else-if="activeSection === 'education'" />
    <Projects v-else-if="activeSection === 'projects'" />
    <NetworkingLabs v-else-if="activeSection === 'labs'" />
    <Certifications v-else-if="activeSection === 'certifications'" />
    <Training v-else-if="activeSection === 'training'" />
    <Contact v-else-if="activeSection === 'contact'" />
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

const activeSection = ref('home')

const changeSection = (section) => {
  activeSection.value = section
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const applyFadeIn = async () => {
  await nextTick()
  setTimeout(() => {
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
      setTimeout(() => el.classList.add('visible'), 50)
    })
  }, 100)
}

watch(activeSection, applyFadeIn)

onMounted(applyFadeIn)
</script>