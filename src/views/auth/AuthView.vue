<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<template>
     <main class="auth-view">
          <RouterView />
     </main>
</template>

<style lang="scss" scoped>
.auth-view {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100dvh;
}
</style>
