void homing()
 {
    // Home X axis
    while (digitalRead(END_STOP_X) != 1) 
    {
        stepperx.setSpeed(-1000); // Move towards the limit switch
        stepperx.runSpeed();      // Execute the movement
    }
    stepperx.setCurrentPosition(0); // Set current position to zero
    delay(100);

    // Home Y axis
    while (digitalRead(END_STOP_Y) != 1) 
    {
        steppery.setSpeed(-1000); // Move towards the limit switch
        steppery.runSpeed();      // Execute the movement
    }
    steppery.setCurrentPosition(0); // Set current position to zero
    delay(100);
    //Serial.println("Y Axis Homed");

    // Home Z axis
    while (digitalRead(END_STOP_Z) != 1)
     {
        stepperz.setSpeed(-1000); // Move towards the limit switch
        stepperz.runSpeed();      // Execute the movement
    }
    stepperz.setCurrentPosition(0); // Set current position to zero
    delay(100);
   // Serial.println("Z Axis Homed");
}