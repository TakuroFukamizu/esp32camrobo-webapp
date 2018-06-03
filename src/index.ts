// import ESP32Controller from "./ESP32Controller";

// const init = async function() { 
//     const con = new ESP32Controller();
    // const CMD_FORWARD = 0x01;
    // const CMD_BACK = 0x02;
    // const CMD_STOP = 0xFF;
    // const CMD_SPIN_TURN = 0x11;
    // const CMD_TURN_LEFT = 0x12;
    // const CMD_TURN_RIGHT = 0x13;
    // const CMD_SRV_ON = 0x21;
    // const CMD_SRV_OFF = 0x22;

    // document.getElementById("btnConnect").onclick = async (event) => { 
    //     await con.connect();
    //     console.info("connected");
    // };
    // document.getElementById("btnDisconnect").onclick = async (event) => { 
    //     await con.disconnect();
    //     console.info("disconnected");
    // };

    // document.getElementById("btnForward").onclick = async (event) => { 
    //     console.info("btnForward");
    //     await con.sendCommandWithTime(CMD_FORWARD, 5000);
    //     console.info("btnForward - end");
    // };
    // document.getElementById("btnBack").onclick = async (event) => { 
    //     console.info("btnBack");
    //     await con.sendCommandWithTime(CMD_BACK, 5000);
    //     console.info("btnBack - end");
    // };
    // document.getElementById("btnStop").onclick = async (event) => { 
    //     console.info("btnStop");
    //     con.sendCommand(CMD_STOP);
    // };
    // document.getElementById("btnTurnLeft").onclick = async (event) => { 
    //     console.info("btnTurnLeft");
    //     con.sendCommandWithTime(CMD_TURN_LEFT, 5000);
    // };
    // document.getElementById("btnTurnRight").onclick = async (event) => { 
    //     console.info("btnTurnRight");
    //     con.sendCommandWithTime(CMD_TURN_RIGHT, 5000);
    // };
// }

// window.onload = function () {
//     init();
//     console.log(Uint8Array.of(16));
//     console.log(Uint8Array.from([0x10, 0x10]));
//     console.log(Uint8Array.from([16, 256]));
// };

import { app } from './app'

app.$mount('#app')
