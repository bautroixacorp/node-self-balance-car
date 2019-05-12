import socketio
import robot

sio = socketio.Client()
sio.connect('https://uet1602.herokuapp.com')

robot.init()
directs = ['', 'W', 'D', 'S', 'A']

@sio.on('connect')
def on_connect():
    print('I\'m connected!')

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
        robot.robotStopTraveling()
    else:
        print('Robot go route: '+str(route))
        robot.robotTravel(route)

@sio.on('disconnect')
def on_disconnect():
    print('I\'m disconnected!')

print('Running...')