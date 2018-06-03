<template lang="pug">
  div
    div.main
      //- img(src="./assets/logo.png")
      h1 {{ title }}
      router-link(tag="button" :to="{ 'name': 'Connection' }") CONNECT
      router-link(tag="button" :to="{ 'name': 'SendCommand' }") SEND COMMAND
      router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  title: string = 'ESP32CAMROBO'
}
</script>

<style lang="scss">
.main {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

button {
  padding: 4px 6px;
  color: #42b983;
  border: 1px solid #42b983;
  outline: none;
  transition: 0.25s;
  cursor: pointer;

  &:hover,
  &.router-link-active {
    color: #ffffff;
    background-color: #42b983;
  }
}

button + button {
  margin-left: 4px;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
