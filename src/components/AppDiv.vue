<template>
  <v-card class="text-white h-full" color="var(--contentfon)">
    <div class="flex justify-around">
      <v-card-title color="red">
        {{ title }}
      </v-card-title>
      <slot name="exel" />
    </div>
    <slot name="federal" />
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>
<style scoped>
.all {
  margin-top: 10px;
  background-color: var(--contentfon);
  padding: 20px;
  border-radius: 5px; /* Добавляет скругленные углы */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  height: 750px;
}
h1 {
  text-align: center;
  font-size: 25px;
  color: var(--content-color);
}
.h1 {
  display: flex;
  justify-content: space-around;
}
</style>
