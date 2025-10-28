<template>
  <div class="landing-container">
    <header class="hero">
      <h1>🎟️ Ticket Management System</h1>
      <p>Organize, track, and manage your tickets easily.</p>
      <router-link to="/tickets" class="cta-button">Go to Dashboard</router-link>
    </header>

    <section class="features">
      <div class="feature-card">
        <h3>Fast</h3>
        <p>Create and manage tickets in seconds.</p>
      </div>
      <div class="feature-card">
        <h3>Simple</h3>
        <p>Clean and easy-to-use interface.</p>
      </div>
      <div class="feature-card">
        <h3>Reliable</h3>
        <p>Keep track of all your tickets safely.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing-container {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
}

.hero {
  background: linear-gradient(135deg, #2563eb, #1e3a8a);
  color: #fff;
  padding: 100px 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 25px;
}

.cta-button {
  background: #fff;
  color: #1e3a8a;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s;
}

.cta-button:hover {
  background: #f3f4f6;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;
}

.feature-card {
  background: #fff;
  padding: 30px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #1e3a8a;
  margin-bottom: 10px;
}
</style>
