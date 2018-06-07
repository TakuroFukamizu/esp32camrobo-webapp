<template lang="pug">
div#send-command.tile.is-ancestor
    div.tile.is-vertical.is-parent
        .tile.is-child
            b-field(label="Time(ms)")
                b-input.is-primary(type="number" v-model="time")
    div.tile.is-vertical.is-parent
        .tile.is-child
            button.button(@click="forward") FORWARD
            button.button(@click="back") BACK
            button.button(@click="stop") STOP
        .tile.is-child
            button.button(@click="spinturn") SPIN_TURN
            button.button(@click="turnleft") TURN_LEFT
            button.button(@click="turnlight") TURN_RIGHT
        .tile.is-child
            button.button(@click="srvon") SRV_ON
            button.button(@click="srvoff") SRV_OFF
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ESP32Controller from '../device/ESP32Controller'
import { CMD } from '../device/config'

@Component
export default class SendCommand extends Vue {
    @State('con') con: ESP32Controller

    time: number = 1000

    forward() {
        console.log(this.time)
        this.con.sendCommandWithTime(CMD.FORWARD, this.time)
    }
    back() {
        console.log(this.time)
        this.con.sendCommandWithTime(CMD.BACK, this.time)
    }
    stop() {
        this.con.sendCommand(CMD.STOP)
    }

    spinturn() {
        this.con.sendCommand(CMD.SPIN_TURN)
    }
    turnleft() {
        console.log(this.time)
        this.con.sendCommandWithTime(CMD.TURN_LEFT, this.time)
    }
    turnlight() {
        console.log(this.time)
        this.con.sendCommandWithTime(CMD.TURN_RIGHT, this.time)
    }

    srvon() {
        this.con.sendCommand(CMD.SRV_ON)
    }
    srvoff() {
        this.con.sendCommand(CMD.SRV_OFF)
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
