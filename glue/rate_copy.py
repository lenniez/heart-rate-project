import mido
import serial
import sys


"""
valid inputs:
    r:1:90 - heart rate chan 1 for bpm 90
    r:2:90 - heart rate chan 2 for bpm 90

    b:1 - beat for sensor 1
    b:2 - beat for sensor 2
"""
def publish_serial_hr_to_midi(ser, port):
    while True:
        line = ser.readline().strip()
        if line[:2] == b'r:':
            channel = int(line[2:3])
            rate = int(line[4:])
            print('has heartrate {}'.format(rate))
            rate_midi = int(((rate * 127) / 130) - 50)
            if (rate_midi < 0 and rate_midi > 127):
                print('rate_midi out of range: {}'.format(rate_midi))
                break
            msg = mido.Message(
                'control_change',
                control=channel,
                value=rate_midi,
                channel=0,
            )
            print('sending midi {}'.format(msg))
            port.send(msg)
        if line[:2] == b'b:':
            channel = int(line[2:])
            msg = mido.Message('note_on', note=1, channel=8+channel)
            print('has beat channel {}'.format(channel))
            print('sending midi {}'.format(msg))
            port.send(msg)



if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise Exception('first arg is arduino serial port')
    ser = serial.Serial(sys.argv[1], 9600)
    port = mido.open_output('IAC Driver LovePort')
    publish_serial_hr_to_midi(ser, port)

