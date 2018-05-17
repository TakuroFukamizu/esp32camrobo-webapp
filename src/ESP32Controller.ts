import CONFIG from "./config";

export default class ESP32Controller { 
    private service: BluetoothRemoteGATTService | null;
    private commandChar: BluetoothRemoteGATTCharacteristic | null;
    private receiveChar: BluetoothRemoteGATTCharacteristic | null;

    constructor() { 
        this.service = null;
        this.commandChar = null;
        this.receiveChar = null;
    }

    async connect() { 
        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [CONFIG.SERVICE_UUID.toLowerCase()],
            }]
        });
        const server = await device.gatt.connect();
        this.service = await server.getPrimaryService(CONFIG.SERVICE_UUID.toLowerCase());

        await this.getCommandCharacteristic();
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
        let binary = Uint8Array.of(value);
        // FIXIT: timeを追加
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




