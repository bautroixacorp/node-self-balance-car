import os
import serial
import time

#
#     1 U
# 4 L     2 R
#     3 D

ser = serial.Serial('/dev/ttyMCC', 9600, timeout=0)

def init():
    pass
    

def robotSocketStartMove(direct):
    if direct == 1:
        ser.write('1'.encode())
    if direct == 2:
        ser.write('2'.encode())
    if direct == 3:
        ser.write('3'.encode())
    if direct == 4:
        ser.write('4'.encode())
    return

def robotSocketEndMove(direct):
    ser.write('5'.encode())
    return

def robotTravel(route):
    for direct in route:
        pass
    return

def robotStopTraveling():
    pass
    return