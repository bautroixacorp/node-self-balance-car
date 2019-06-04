import socketio
import time
import robot
import cv2
import base64

sio = socketio.Client()
sio.connect('http://uet1602.herokuapp.com')
# sio.connect('http://192.168.1.102:3000')
print "Connect to socket server ok"

robot.init()
directs = ['', 'W', 'D', 'S', 'A']

cameraOn = False
FPS = 30.0

vcap = cv2.VideoCapture(0)

print "Connect webcam ok"

@sio.on('connect')
def on_connect():
    print('I\'m connected!')

@sio.on('back-turn-camera-on')
def on_cam(onOff):
    cameraOn = onOff
    if onOff:
        vcap.release()
        vcap.open(0)
        vcap.set(cv2.CAP_PROP_FRAME_WIDTH, 150)
        vcap.set(cv2.CAP_PROP_FRAME_HEIGHT, 150)
    while cameraOn:
        print('streaming...')
        ret, frame = vcap.read()
        if not ret:
            print("Camera is disconnected!")
            vcap.release()
            return False
        else:
            image = cv2.imencode('.jpg', frame)[1]
            img64 = base64.encodestring(image)
            sio.emit('wcam', img64)
            time.sleep(1.0/FPS)
    if not cameraOn:
        vcap.release()

@sio.on('ping-robot')
def on_ping(server_timestamp):
    sio.emit('ping-res', server_timestamp)

@sio.on('back-control')
def on_message(direct):
    directNum = directs.index(direct)
    print('Robot go '+str(directNum))
    robot.robotMove(directNum)

@sio.on('back-control-start')
def on_control_start(direct):
    directNum = directs.index(direct)
    print('Robot start go '+str(directNum))
    robot.robotSocketStartMove(directNum)

@sio.on('back-control-end')
def on_control_end(direct):
    directNum = directs.index(direct)
    print('Robot stop go '+str(directNum))
    robot.robotSocketEndMove(directNum)

@sio.on('back-route')
def on_route(route):
    if route == 'stop':
        print('Robot STOP go route ')
        robot.robotStopTraveling()
    else:
        print('Robot go route: '+str(route))
        robot.robotTravel(route)

@sio.on('disconnect')
def on_disconnect():
    print('I\'m disconnected!')
    vcap.release()
    cv2.destroyAllWindows()

print('Running...')