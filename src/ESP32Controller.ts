import CONFIG from "./config";

export default class ESP32Controller {
    private device: BluetoothDevice | null;
    private service: BluetoothRemoteGATTService | null;
    private commandChar: BluetoothRemoteGATTCharacteristic | null;
    private receiveChar: BluetoothRemoteGATTCharacteristic | null;

    constructor() {
        this.device = null;
        this.service = null;
        this.commandChar = null;
        this.receiveChar = null;
    }

    async connect() { 
        // const device = await navigator.bluetooth.requestDevice({
        //     filters: [{
        //         services: [CONFIG.SERVICE_UUID.toLowerCase()],
        //     }]
        // });
        const device = await navigator.bluetooth.requestDevice({
            filters: [
                { services: [CONFIG.SERVICE_UUID.toLowerCase()] },
                { namePrefix: "YHD2017W-CP-ONI" }
            ]
        });
        const server = await device.gatt.connect();
        this.device = device;
        this.service = await server.getPrimaryService(CONFIG.SERVICE_UUID.toLowerCase());

        await this.getCommandCharacteristic();
    }

    async disconnect() {
        this.device.gatt.disconnect();
    }

    async getCommandCharacteristic() { 
        if (this.service == null) throw new Error("service is empty");
        const characteristic = await this.service.getCharacteristic(CONFIG.CHARACTERISTIC1_UUID.toLowerCase());
        
        if (characteristic === null) return new Error("characteristic1 is not found");
        this.commandChar = characteristic;
    }

    async sendCommand(value: number) {
        if (this.commandChar == null) throw new Error("characteristic is empty");
        let binary = Uint8Array.of(value);
        await this.commandChar.writeValue(binary);
    }

    async sendCommandWithTime(value: number, time: number) {
        if (this.commandChar == null) throw new Error("characteristic is empty");
        if (time > 65536) throw new Error("time is too large");
        // time(Uint26)をLitteEndianでUint8にして添付
        let buffer = new ArrayBuffer(2);
        let buf8 = new Uint8Array(buffer);
        let buf16 = new Uint16Array(buffer);
        buf16[0] = time;
        let binary = Uint8Array.of(value, buf8[1], buf8[0]);
        console.log(binary);
        console.log(this.commandChar);
        await this.commandChar.writeValue(binary);
    }

    async getReceiveCharacteristic() { 
        if (this.service == null) throw new Error("service is empty");
        const characteristic = await this.service.getCharacteristic(CONFIG.CHARACTERISTIC2_UUID);

        if (characteristic === null) return new Error("characteristic1 is not found");
        this.receiveChar = characteristic;

        await this.receiveChar.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', this.onReceiveState);
    }

    onReceiveState(event: Event) {
        // let characteristic = event.target;
        console.log(this.receiveChar.value);
    }
}




