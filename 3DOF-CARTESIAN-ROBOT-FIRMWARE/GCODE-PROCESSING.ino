void mainloop(){

if (Serial.available()) 
{
    content = Serial.readString(); // Read the incomding data from Processing

    // Extract the data from the string and put into separate integer variables (data[] array)
    for (int i = 0; i < 10; i++) 
    {
      int index = content.indexOf(","); // locate the first ","
      data[i] = atol(content.substring(0, index).c_str()); //Extract the number from start to the ","
      content = content.substring(index + 1); //Remove the number from the string
    }
    /*
     data[0] - SAVE BUTTON STATUS
     data[1] - RUN BUTTON STATUS
     data[2] - X POSITION
     data[3] - Y POSITION
     data[4] - Z POSITION
     data[5] - HOME BUTTON STATUS
     data[6] - GRIPPER VALUE
     data[7] - SPEED VALUE
     data[8] - ACCELERTION VALUE
    */

    // If SAVE button is pressed, store the data into the appropriate arrays
    if (data[0] == 1)
     {
      XArray[positionsCounter] = data[2] * STEPS_PER_MM; 
      YArray[positionsCounter] = data[3] * STEPS_PER_MM;
      ZArray[positionsCounter] = data[4] * STEPS_PER_MM;
      GripperArray[positionsCounter] = data[6];
      positionsCounter++;
     }

    //  Clear datas set the array data to 0
    if (data[0] == 2) 
    {
      memset(XArray, 0, sizeof(XArray));
      memset(YArray, 0, sizeof(YArray));
      memset(ZArray, 0, sizeof(ZArray));
      memset(GripperArray, 0, sizeof(GripperArray));
      positionsCounter = 0;
    }
  }



  // If RUN button is pressed
  while (data[1] == 1) 
  {
    stepperx.setSpeed(data[7]);
    steppery.setSpeed(data[7]);
    stepperz.setSpeed(data[7]);
    stepperx.setAcceleration(data[8]);
    steppery.setAcceleration(data[8]);
    stepperz.setAcceleration(data[8]);

    // execute the stored steps
    for (int i = 0; i <= positionsCounter - 1; i++) 
    {
      if (data[1] == 0) 
      {
        break;
      }
      stepperx.moveTo(XArray[i]);
      steppery.moveTo(YArray[i]);
      stepperz.moveTo(YArray[i]);

      while (stepperx.currentPosition() != XArray[i] || steppery.currentPosition() != YArray[i] || stepperz.currentPosition() !=ZArray[i] )
       {
        stepperx.run();
        steppery.run();
        stepperz.run();
       }

      if (i == 0) 
      {
        gripperServo.write(GripperArray[i]);
      }

      else if (GripperArray[i] != GripperArray[i - 1]) 
      {
        gripperServo.write(GripperArray[i]);
        delay(800); // wait 0.8s for the servo to grab or drop
      }

      //check for change in speed and acceleration or program stop
      if (Serial.available())
       {
        content = Serial.readString(); // Read the incomding data from Processing
        // Extract the data from the string and put into separate integer variables (data[] array)
        for (int i = 0; i < 10; i++) 
        {
          int index = content.indexOf(","); // locate the first ","
          data[i] = atol(content.substring(0, index).c_str()); //Extract the number from start to the ","
          content = content.substring(index + 1); //Remove the number from the string
        }

        if (data[1] == 0)
         {
          break;
        }
        // change speed and acceleration while running the program
        stepperx.setSpeed(data[7]);
        steppery.setSpeed(data[7]);
        stepperz.setSpeed(data[7]);
        stepperx.setAcceleration(data[8]);
        steppery.setAcceleration(data[8]);
        stepperz.setAcceleration(data[8]);
      }
    }
    /*
      // execute the stored steps in reverse
      for (int i = positionsCounter - 2; i >= 0; i--)
       {
      if (data[1] == 0) 
      {
        break;
      }
      stepperz.moveTo(theta1Array[i]);
      steppery.moveTo(theta2Array[i]);
      stepperz.moveTo(phiArray[i]);
      while (stepperx.currentPosition() != XArray[i] || steppery.currentPosition() != YArray[i] || stepperz.currentPosition() !=ZArray[i] ) 
      {
        stepperx.run();
        steppery.run();
        stepperz.run();
      }
      gripperServo.write(gripperArray[i]);

      if (Serial.available()) 
      {
        content = Serial.readString(); // Read the incomding data from Processing
        // Extract the data from the string and put into separate integer variables (data[] array)
        for (int i = 0; i < 10; i++) {
          int index = content.indexOf(","); // locate the first ","
          data[i] = atol(content.substring(0, index).c_str()); //Extract the number from start to the ","
          content = content.substring(index + 1); //Remove the number from the string
        }
        if (data[1] == 0) {
          break;
        }
      }
      }
    */
  }

  XPosition = data[2] * STEPS_PER_MM;
  YPosition = data[3] * STEPS_PER_MM;
  ZPosition = data[4] *STEPS_PER_MM;

  stepperx.setSpeed(data[7]);
  steppery.setSpeed(data[7]);
  stepperz.setSpeed(data[7]);

  stepperx.setAcceleration(data[8]);
  steppery.setAcceleration(data[8]);
  stepperz.setAcceleration(data[8]);

  stepperx.moveTo(XPosition);
  steppery.moveTo(YPosition);
  stepperz.moveTo(ZPosition);

  while (stepperx.currentPosition() != XPosition || steppery.currentPosition() != YPosition || stepperz.currentPosition() != ZPosition)
   { 
    stepperx.run();
    steppery.run();
    stepperz.run();
   }
  delay(100);
  gripperServo.write(data[6]);
  delay(300);
}





void serialFlush() 
{
  while (Serial.available() > 0) //while there are characters in the serial buffer, because Serial.available is >0
  {  
    Serial.read();         // get one character
  }
}