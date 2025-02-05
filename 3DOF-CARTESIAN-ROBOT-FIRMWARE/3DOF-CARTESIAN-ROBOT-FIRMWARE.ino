/* Written by N.Thenushan  USJP FOT MMT MECHATRONICS*/
#include <Wire.h> 
#include <math.h>
#include <Servo.h>
#include <AccelStepper.h>
#include <MultiStepper.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);

// Define End-stops, Servo and Abort Pins 
#define END_STOP_X 9
#define END_STOP_Y 10
#define END_STOP_Z 11
#define ABORT_PIN A0
#define SERVO_PIN A1 // HOLD IN CNC SHEILD

// Define the stepper motors and the pins (Type:driver, STEP, DIR)
AccelStepper stepperx(1, 2, 5); 
AccelStepper steppery(1, 3, 6);
AccelStepper stepperz(1, 4, 7);

// Lead screw Stepper motor motor driver paramters  float distance = steps / STEPS_PER_MM;
#define LEAD 8.0  // Lead screw pitch (mm per revolution)
#define STEPS_PER_REV 200  // Stepper motor steps per revolution (1.8° stepper)
#define MICROSTEPPING 1  // Microstepping mode 

// Calculate steps per mm
const float STEPS_PER_MM = (STEPS_PER_REV * MICROSTEPPING) / LEAD;

Servo gripperServo;

int XPosition, YPosition, ZPosition;

String content = "";
int data[10];

int XArray[100];
int YArray[100];
int ZArray[100];
int GripperArray[100];
int positionsCounter = 0;

void setup() 
{
  Serial.begin(115200);

  pinMode(END_STOP_X , INPUT_PULLUP);
  pinMode(END_STOP_Y , INPUT_PULLUP);
  pinMode(END_STOP_Z , INPUT_PULLUP);
  pinMode(ABORT_PIN , INPUT_PULLUP);

  stepperx.setMaxSpeed(4000);
  stepperx.setAcceleration(2000);

  steppery.setMaxSpeed(4000);
  steppery.setAcceleration(2000);

  stepperz.setMaxSpeed(4000);
  stepperz.setAcceleration(2000);

  // initial servo value - open gripper
  data[6] = 180;
  gripperServo.attach(SERVO_PIN, 600, 2500);
  gripperServo.write(data[6]);
  delay(500);

  // Call homing function
  homing();
  delay(100);
}

void loop()
{
  mainloop();
}
