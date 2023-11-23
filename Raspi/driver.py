
import RPi.GPIO as GPIO
from time import sleep
import math

TOP_POS = 2450

class Stepper:

    def __init__(self, **kwargs):
        self.enabled = 0
        self.position = 0
        # pins
        self.DIR = kwargs.get("dir")
        self.STEP = kwargs.get("step")
        self.ENABLE = kwargs.get("enable")

        print(self.DIR)
        print(self.STEP)
        print(self.ENABLE)

        GPIO.setup(self.DIR, GPIO.OUT)
        GPIO.setup(self.STEP, GPIO.OUT)
        GPIO.setup(self.ENABLE, GPIO.OUT)

        GPIO.output(self.ENABLE, GPIO.HIGH)

    def enableMotor(self):
        GPIO.output(self.ENABLE, GPIO.LOW)
        self.enabled = 1

    def disableMotor(self):
        GPIO.output(self.ENABLE, GPIO.HIGH)
        self.enabled = 0

    def turn(self, dir, steps, speed):

        # set direction 0 / 1
        GPIO.output(self.DIR, dir)

        if dir== 0:
            diff = -1
        else:
            diff = 1

        for i in range(steps):
            GPIO.output(self.STEP,GPIO.HIGH)
            sleep(1/(speed*2))
            GPIO.output(self.STEP,GPIO.LOW)
            sleep(1/(speed*2))

            self.position += diff

        print(f"potition: {self.position}")


    def calibrate(self):

        while (GPIO.input(self.ZEROBTN) == 1):
            self.turn(1, 1, 500)

        self.turn(1, 5, 500)

        while (GPIO.input(self.ZEROBTN) == 0):
            self.turn(0, 1, 300)

        self.position = 0


def main():
    GPIO.setmode(GPIO.BCM)

    stepper = Stepper(
        dir=23,
        step=24,
        enable=27,
    )

    stepper.enableMotor()
#   stepper.turn(1, 400, 300)
    sleep(1)
    stepper.turn(1, 100, 300)
    sleep(5)

    stepper.disableMotor()


main()
