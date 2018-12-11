const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Readline = require('@serialport/parser-readline')
const SerialPort = require('serialport')
const midiLib = require('midi')
const midi = new midiLib.output()
const sqlite3 = require('sqlite3').verbose()

const db = createDB()

app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
		console.log('a user connected');
		

	socket.on('saveUserData', (data) => {
		const {key, human1, human2} = data;
		if (!human1 || !human2) {
			console.error('error getting user info!', key, human1, human2)
			return
		}
		const stmt = db.prepare(`
			INSERT INTO userlist (human1name, human1phone, human2name, human2phone) VALUES (?, ?, ?, ?)
		`)
		stmt.run(human1.name, human1.phone, human2.name, human2.phone)
		stmt.finalize((err) => {
			if (err) {
				console.error(err.message)
			} else {
				io.emit('userDataSaved', key)
				console.log('wrote user info!')
			}
		})
	})
})

http.listen(3000, function(){
	  console.log('listening on *:3000');
});

function listenArduino(portPath) {
	console.log('connecting to serial port', portPath)
	const port = new SerialPort(portPath, {
		baudRate: 9600,
	})
	port.on('error', (err) => {
		console.log('Error: ', err.message)
	})
	const parser = port.pipe(new Readline())
	connectMidi()
	parser.on('data', (data) => {
		const params = data.split(':');
		if (!params.length) {
			return
		}
		console.log('has params from board: ', params)
		if (params[0] === 'r') {
			const channel = parseInt(params[1], 10)
			const rate = parseInt(params[2], 10)
			console.log({type: 'update_rate', channel, rate})
			writeMidiMessage(channel, rate)
			io.emit('rate', {connection: channel, rate});
			writeDbRate(channel, rate)
		}
		if (params[0] === 'b') {
			const channel = parseInt(params[1], 10)
			console.log({type: 'has_beat', channel})
			io.emit('beat', {connection: channel});
			writeMidiMessage(channel + 10)
			writeDbRate(channel, null)
		}
	})
}

function writeDbRate(channel, rate) {
	const stmt = db.prepare("INSERT INTO beats (channel, bpm) VALUES (?, ?)")
	stmt.run(channel, rate)
	stmt.finalize((err) => {
		if (err) {
			console.log(err.message);
		}
	})
}


function connectMidi() {
	console.log('connecting midi')
	const ports = [];
	for (let i = 0; i < midi.getPortCount(); i++) {
		if (midi.getPortName(i) === 'IAC Driver LovePort') {
			console.log('opening loveport')
			midi.openPort(i);
		}
	}
}

function createDB() {
	const newDb = new sqlite3.Database(`./data/${new Date().toISOString().substring(0, 10)}.sqlite3`);
	newDb.run(`
		CREATE TABLE IF NOT EXISTS userlist (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			created datetime default current_timestamp,
			human1name text,
			human1phone text,
			human2name text,
			human2phone text
		);
	`);
	newDb.run(`
		CREATE TABLE IF NOT EXISTS beats (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			created datetime default current_timestamp,
			channel integer NOT NULL,
			bpm integer
		);
	`);
	return newDb;
}

function writeMidiMessage(chan, rate) {
	let valToWrite = 1
	if (rate) {
		valToWrite = Math.floor(((rate * 127) / 130) - 50)
	}
	// 176 === CONTROL_CHANGE message packet
	midi.sendMessage([176, chan, valToWrite])
}

function fakeBeat() {
	console.log('faking beat!');
	setInterval(() => {
		io.emit('beat', {connection: 1});
	}, 4000);
	
	setInterval(() => {
		io.emit('beat', {connection: 2});
	}, 10000);
}

process.on('exit', () => {
	db.close();
	midi.close();
});

if (process.argv.length >= 3) {
	listenArduino(process.argv[2]);
} else {
	fakeBeat();
}