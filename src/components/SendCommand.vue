<template lang="pug">
div#send-command
    div.box
        h2 SEND COMMAND
    .tile.is-ancestor
        div.tile.is-vertical.is-parent.box
            .tile.is-child
                h3 FORWARD
                b-field(label="Time(ms)")
                    b-input.is-primary(type="number" v-model="timeForward")
                button.button.is-primary(@click="forward") SEND
            .tile.is-child
                h3 BACK
                b-field(label="Time(ms)")
                    b-input.is-primary(type="number" v-model="timeBack")
                button.button.is-primary(@click="back") SEND
            .tile.is-child
                h3 STOP
                button.button.is-primary(@click="stop") SEND
        div.tile.is-vertical.is-parent.box
            .tile.is-child
                h3 SPIN TURN
                button.button.is-primary(@click="spinturn") SEND
            .tile.is-child
                h3 TURN LEFT
                b-field(label="Time(ms)")
                    b-input.is-primary(type="number" v-model="timeTurnLeft")
                button.button.is-primary(@click="turnleft") SEND
            .tile.is-child
                h3 TURN RIGHT
                b-field(label="Time(ms)")
                    b-input.is-primary(type="number" v-model="timeTurnRight")
                button.button.is-primary(@click="turnlight") SEND
        div.tile.is-vertical.is-parent.box
            .tile.is-child
                h3 SRV ON
                button.button.is-primary(@click="srvon") SEND
            .tile.is-child
                h3 SRV OFF
                button.button.is-primary(@click="srvoff") SEND
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import ESP32Controller from '../device/ESP32Controller'
import { CMD } from '../device/config'

@Component
export default class SendCommand extends Vue {
    @State('con') con: ESP32Controller

    timeForward: number = 1000
    timeBack: number = 1000
    timeTurnLeft: number = 1000
    timeTurnRight: number = 1000

    forward() {
        console.log(this.timeForward)
        this.con.sendCommandWithTime(CMD.FORWARD, this.timeForward)
    }
    back() {
        console.log(this.timeBack)
        this.con.sendCommandWithTime(CMD.BACK, this.timeBack)
    }
    stop() {
        this.con.sendCommand(CMD.STOP)
    }

    spinturn() {
        this.con.sendCommand(CMD.SPIN_TURN)
    }
    turnleft() {
        console.log(this.timeTurnLeft)
        this.con.sendCommandWithTime(CMD.TURN_LEFT, this.timeTurnLeft)
    }
    turnlight() {
        console.log(this.timeTurnRight)
        this.con.sendCommandWithTime(CMD.TURN_RIGHT, this.timeTurnRight)
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
