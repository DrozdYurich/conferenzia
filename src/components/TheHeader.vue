<template>
  <header>
    <h1 class="h1">Модуль расчета вероятности протестного голосования</h1>

    <!-- 
    <div class="two">
      <router-link to="/puncttwo"><span>Пункт2</span></router-link>
    </div>
    <div class="three">
      <router-link to="/punctthree"><span>Пункт3</span></router-link>
    </div> -->
  </header>
  <div class="hed">
    <div class="glavn">
      <router-link to="/"><span>Главная</span></router-link>
    </div>
    <div class="one">
      <router-link to="/punctone"><span>Дашборд</span></router-link>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { VAppBar, VAppBarTitle } from "vuetify/components/VAppBar";
const route = useRoute();
const navItems = [
  { to: "/punctone", title: "Пункт1" },
  { to: "/puncttwo", title: "Пункт2" },
  { to: "/punctthree", title: "Пункт3" },
];
</script>
<style scoped>
header {
  background-color: var(--fonHeadr);
  font-size: 20px;
  padding: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: grid;
  color: var(--act);
  grid-template-areas: "h1. . glavn  . . one two three";
  align-items: center;
  position: sticky;
  top: 0;
}
.hed {
  margin-top: 0rem;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  background-color: var(--fonHeadr);
  font-size: 20px;
}
div {
  transition: all 0.4s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}
.h1 {
  grid-area: h1;
  color: var(--act);
  font-size: 27px;
}
.one {
  grid-area: one;
}

.two {
  grid-area: two;
}

.three {
  grid-area: three;
}

.glavn {
  grid-area: glavn;
}
.glavn:hover,
.one:hover {
  transform: translateY(-5px);
  color: var(--act-dark);
}
a {
  text-decoration: none;
  color: var(--act);
  padding: 3px;
}
a.active {
  border-bottom: 3px solid var(--act);
  color: var(--content-color);
}
</style>
