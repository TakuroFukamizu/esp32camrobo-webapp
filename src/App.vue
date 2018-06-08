<template lang="pug">
    #app
        div.menu.box
            .content
                H1 Menu
                router-link.button.is-primary.is-outlined(tag="button" :to="{ 'name': 'Connection' }") CONNECT
                router-link.button.is-primary.is-outlined(tag="button" :to="{ 'name': 'SendCommand' }") SEND COMMAND
        div.main.box
            router-view
        footer.footer
            .container
                .content.has-text-centered
                    p(v-if="isConnected") CAMROBO: Connecting
                    p(v-else) CAMROBO: Not connected

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class App extends Vue {
    title: string = 'ESP32CAMROBO'

    @State('isConnected') isConnected: boolean
    @State('sidebar') sidebar: any

}
</script>

<style lang="scss">
.app-sidebar {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 180px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 1024 - 1;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
//   @include mobile() {
//     transform: translate3d(-180px, 0, 0);
//   }
  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      transition: transform .377s ease;
    }
  }
  .menu-label {
    padding-left: 5px;
  }
  .menu-list {
    li a {
      &[aria-expanded="true"] {
        .is-angle {
          transform: rotate(180deg);
        }
      }
    }
    li a + ul {
      margin: 0 10px 0 15px;
    }
  }
}
</style>
