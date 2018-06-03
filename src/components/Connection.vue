<template lang="pug">
    div
        button(@click="connect") Connect
        button(@click="disconnect") Disconnect
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ESP32Controller from '../device/ESP32Controller'

@Component
export default class Connection extends Vue {
    @State('con') con: ESP32Controller
    @State('isConnected') isConnected: boolean

    async connect() {
        await this.con.connect()
        this.isConnected = true
    }

    disconnect() {
        this.con.disconnect()
        this.isConnected = false
    }
}
</script>

<style lang="scss" scoped>
.essential {
    a {
        color: tomato;
    }
}
</style>
