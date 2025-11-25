<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import autoAnimate from "@formkit/auto-animate";
import { VMain } from "vuetify/components/VMain";
import { VApp } from "vuetify/components/VApp";
import { VAppBar, VAppBarTitle } from "vuetify/components/VAppBar";
</script>
<template>
  <VApp>
    <TheHeader />
    <VMain class="mt-2.5">
      <RouterView></RouterView>
    </VMain>
  </VApp>
</template>

<style scoped>
.fade-enter-active {
  animation: in 0.4s ease;
}
.fade-leave-active {
  animation: out 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px); /* Изменил направление для лучшего эффекта */
  }
}
</style>
