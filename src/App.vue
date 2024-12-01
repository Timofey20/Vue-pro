<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">WebSocket</RouterLink>
      </nav>
      <span class="time">
        {{ time }}
      </span>
    </div>
  </header>

  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import fetchBybitTime from '@/stores/getServerTime';
import formatTimestamp from './components/formatTimestamp';

const time: any = ref([]);

onMounted(async () => {
  time.value = formatTimestamp(await fetchBybitTime())
  setInterval(async () => {
    time.value = formatTimestamp(await fetchBybitTime())
  }, 10000);
})

</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 16px 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: start;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    width: 100%;
    display: flex;
    place-items: flex-start;
    justify-content: space-between;

    .time{
    font-size: 1.5rem;
      
    }
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
