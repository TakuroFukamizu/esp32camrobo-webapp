const CONFIG = {
    DEVICE_NAME : "YHD2017W-CP-ONI",
    SERVICE_UUID : "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
    CHARACTERISTIC1_UUID : "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
    CHARACTERISTIC2_UUID : "6E400003-B5A3-F393-E0A9-E50E24DCCA9E",
}

const CMD = {
    FORWARD: 0x01,
    BACK: 0x02,
    STOP: 0xFF,
    SPIN_TURN: 0x11,
    TURN_LEFT: 0x12,
    TURN_RIGHT: 0x13,
    SRV_ON: 0x21,
    SRV_OFF: 0x22
}

export { CONFIG, CMD }