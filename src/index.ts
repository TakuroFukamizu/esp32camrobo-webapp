// import ESP32Controller from "./ESP32Controller";

// const init = async function() { 
//     const con = new ESP32Controller();

//     const CMD_FORWARD = 0x01;

//     document.getElementById("btnConnect").onclick = async (event) => { 
//         await con.connect();
//         console.info("connected");
//     };
//     document.getElementById("btnForward").onclick = async (event) => { 
//         console.info("btnForward");
//         con.sendCommand(CMD_FORWARD); //CMD_FORWARD
//     };
// }

// window.onload = function () {
//     init();
//     console.log(Uint8Array.of(16));
//     console.log(Uint8Array.from([0x10, 0x10]));
//     console.log(Uint8Array.from([16, 256]));
// };

import { app } from './app'

app.$mount('#app')