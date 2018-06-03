import ESP32Controller from '../../src/device/ESP32Controller'

declare module '*.vue' {
  import { Vue, VueConstructor } from 'vue/types/vue'
  const _default: VueConstructor<Vue>
  export default _default
}


// --------------------------------- 
// | Types
// ---------------------------------
declare namespace Types {
  interface Link {
    label: string
    link: string
  }
}

// ---------------------------------
// | Vuex State
// ---------------------------------
declare namespace State {
  interface Root {
    com: ESP32Controller
    isConnected: boolean
  }
}
