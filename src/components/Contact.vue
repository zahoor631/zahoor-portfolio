<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="fade-in">
        <h2 class="section-title">Get in <span>Touch</span></h2>
        <p class="section-subtitle">let's work together</p>
      </div>

      <div class="contact-grid fade-in">
        <div class="contact-info">
          <h3>Let's build something reliable.</h3>
          <p>
            Whether you need IT support, network setup, or just want to
            connect — my inbox is always open.
          </p>

          <div class="contact-items">
            <a href="mailto:zahoorillahi117@gmail.com" class="contact-item">
              <i class="fa-solid fa-envelope"></i>
              <div><span>Email</span><strong>zahoorillahi117@gmail.com</strong></div>
            </a>
            <a href="tel:+923113238520" class="contact-item">
              <i class="fa-solid fa-phone"></i>
              <div><span>Phone</span><strong>+92 311 3238520</strong></div>
            </a>
            <a href="https://www.linkedin.com/in/engr-zahoor-illahi-043453242" target="_blank" class="contact-item">
              <i class="fa-brands fa-linkedin-in"></i>
              <div><span>LinkedIn</span><strong>linkedin.com/in/zahoor</strong></div>
            </a>
            <a href="https://github.com/" target="_blank" class="contact-item">
              <i class="fa-brands fa-github"></i>
              <div><span>GitHub</span><strong>github.com/zahoor</strong></div>
            </a>
          </div>
        </div>

        <form class="contact-form card" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" v-model="form.name" type="text" required placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" required placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input id="subject" v-model="form.subject" type="text" required placeholder="What is this about?" />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="5" required placeholder="Your message..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="sending">
            <i class="fa-solid fa-paper-plane"></i>
            {{ sending ? 'Sending...' : 'Send Message' }}
          </button>
          <p v-if="sent" class="form-success">
            <i class="fa-solid fa-circle-check"></i> Message sent successfully!
          </p>
          <p v-if="error" class="form-error">
            <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
const sent = ref(false)
const error = ref('')

// 🔴 YAHAN apna Formspree URL daalo (jaise https://formspree.io/f/mzbqkxyz)
const FORMSPREE_URL = 'https://formspree.io/f/xnpnjjyz'

const submitForm = async () => {
  sending.value = true
  error.value = ''

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }),
    })

    if (response.ok) {
      sent.value = true
      Object.assign(form, { name: '', email: '', subject: '', message: '' })
      setTimeout(() => (sent.value = false), 5000)
    } else {
      const data = await response.json()
      error.value = data.errors?.[0]?.message || 'Message send nahi ho saka. Dobara try karo.'
    }
  } catch (err) {
    error.value = 'Network error. Internet connection check karo.'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact { background: var(--bg-alt); }
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}
.contact-info h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
.contact-info > p { color: var(--text-muted); margin-bottom: 2rem; }
.contact-items { display: flex; flex-direction: column; gap: 1rem; }
.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  transition: all 0.25s ease;
}
.contact-item:hover { border-color: var(--primary); transform: translateX(6px); }
.contact-item i {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary);
  border-radius: 8px;
  font-size: 1rem;
}
.contact-item span {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.contact-item strong { font-size: 0.92rem; font-weight: 600; }
.contact-form { display: flex; flex-direction: column; gap: 1.1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
.form-group input,
.form-group textarea {
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--text);
  font-family: var(--font);
  font-size: 0.92rem;
  transition: border-color 0.2s ease;
  resize: vertical;
}
.form-group input:focus,
.form-group textarea:focus { outline: none; border-color: var(--primary); }
.contact-form .btn { justify-content: center; }
.form-success {
  color: var(--success);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}
.form-error {
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}
@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
}
</style>