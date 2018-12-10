const uDMX = require('udmx');
const midiLib = require('midi');
const inquirer = require('inquirer');
const debounce = require('debounce');
const tty = require('tty');
const dmx = new uDMX();
const midi = new midiLib.input();

dmx.on('connected', () => {
    console.log('DMX connected');
    dmx.set(1, 100);
});

console.log('connecting DMX');
dmx.connect();

function bindSave() {
    process.openStdin().on('keypress', (chunk, key) => {
        if (key && key.name === 's' && key.ctrl) {
            console.log('save!!!');
        }
    });
    process.stdin.setRawMode(true);
}

const sendMsg = debounce((chan, val) => {
  dmx.set(chan, val);										
}, 20);

function connectMidi() {
    const ports = [];
    for (let i = 0; i < midi.getPortCount(); i++) {
        ports.push({name: midi.getPortName(i), value: i});
    }
    inquirer.prompt({name: 'MIDI Port', choices: ports, type: 'list'}).then(choice => {
        console.log('has port', choice);
        midi.openPort(choice['MIDI Port']);
        // bindSave();
    });
}

const chanMap = {};

midi.on('message', (dt, msg) => {
    const dmxVal = msg[2] * 2;
    const dmxChan = msg[1] + 1;

    if (!(dmxChan in chanMap)) {
        chanMap[dmxChan] = null;
    }

    chanMap[dmxChan] = dmxVal;
    console.log('chanMap', chanMap);
		//dmx.set(dmxChan, dmxVal);
		sendMsg(dmxChan, dmxVal);
});





connectMidi();
