import sys
import platform

if platform.system() == "Windows":
    print("Windows")
else:
    rpi = True
    import driver

argument1 = sys.argv[1]  # component identifier 1 = elevator...
argument2 = sys.argv[2]  # command

stepper = driver.Stepper(
        dir=23,
        step=24,
        enable=27,
    )


if argument1 == "1":
    # commands with elevator
    if argument2 == "0":  # zero elevator
        #stepper.calibrate()
        print("INVALID ARG1")
    elif argument2 == "1":  # moveUp function
        stepper.enableMotor()
        argument3 = int(sys.argv[3])  # steps
        spd = int(sys.argv[4])  # speed
        stepper.turn(1, argument3, spd)
        stepper.disableMotor()

    elif argument2 == "2":  # moveDown function
        argument3 = int(sys.argv[3])  # steps
        spd = int(sys.argv[4])  # speed
        stepper.turn(0, argument3, spd)

