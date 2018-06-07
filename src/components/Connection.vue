<template lang="pug">
div#connection
    button.button.is-success(@click="connect") Connect
    button.button.is-danger(@click="disconnect") Disconnect
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import ESP32Controller from '../device/ESP32Controller'

@Component
export default class Connection extends Vue {
    @State('con') con: ESP32Controller
    @State('isConnected') isConnected: boolean
    @Action('toggleConnection') toggleConnection

    async connect() {
        await this.con.connect()
        this.toggleConnection(true)
        // this.isConnected = true //[Vue warn]: Computed property "isConnected" was assigned to but it has no setter.
        this.$toast.open({
            message: 'CAMROBO Connected',
            type: 'is-success'
        })
    }

    disconnect() {
        this.con.disconnect()
        this.toggleConnection(false);
        // this.isConnected = false
        this.$toast.open({
            message: 'CAMROBO Disconnected',
            type: 'is-success'
        })
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
