import os
import time

#
#     1 U
# 4 L     2 R
#     3 D

PIN_U = 16
PIN_R = 17
PIN_D = 18
PIN_L = 19

def init():
    os.system("echo out > /gpio/pin"+str(PIN_U)+"/direction")
    os.system("echo out > /gpio/pin"+str(PIN_R)+"/direction")
    os.system("echo out > /gpio/pin"+str(PIN_D)+"/direction")
    os.system("echo out > /gpio/pin"+str(PIN_L)+"/direction")

def pinHigh(number):
    os.system("echo 1 > /gpio/pin"+str(number)+"/value")

def pinLow(number):
    os.system("echo 0 > /gpio/pin"+str(number)+"/value")

def blink(number, delay):
    pinHigh(number)
    time.sleep(delay)
    pinLow(number)

def robotMove(direct):
    if direct == 1:
        blink(PIN_U, 0.2)
    if direct == 2:
        blink(PIN_R, 0.2)
    if direct == 3:
        blink(PIN_D, 0.2)
    if direct == 4:
        blink(PIN_L, 0.2)
    return

def robotSocketStartMove(direct):
    if direct == 1:
        pinHigh(PIN_U)
    if direct == 2:
        pinHigh(PIN_R)
    if direct == 3:
        pinHigh(PIN_D)
    if direct == 4:
        pinHigh(PIN_L)
    return
def robotSocketEndMove(direct):
    if direct == 1:
        pinLow(PIN_U)
    if direct == 2:
        pinLow(PIN_R)
    if direct == 3:
        pinLow(PIN_D)
    if direct == 4:
        pinLow(PIN_L)
    return

def robotTravel(route):
    for direct in route:
        if direct == 'U':
            blink(PIN_U, 0.5)
        if direct == 'R':
            blink(PIN_R, 0.5)
        if direct == 'D':
            blink(PIN_D, 0.5)
        if direct == 'L':
            blink(PIN_L, 0.5)
    return

def robotStopTraveling():
    pass
    return