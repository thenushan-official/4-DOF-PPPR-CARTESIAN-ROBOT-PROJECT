// #define NO_PROBLEM 1400
// #define HIGH_VOLTAGE 1401
// #define HIGH_CURRENT 1402
// #define VIBRATION_X_HIGH 1403
// #define VIBRATION_Y_HIGH 1404
// #define VIBRATION_Z_HIGH 1405
// #define HIGH_TEMPERATURE 1406
// #define NO_POWER_TO_ROBOT 1407
// #define EMERGENCY_STOPPED 1408
// #define ANOMALY_SENSOR_DETECTED 1409
// #define COLLISION_DETECTION 1410
// #define POWER_SUPPLY_FAULT 1411




// void checkFaults() {
//   if (vinVoltage > 240) {
//     Serial.println("Fault: High Voltage (1401)");
//   }
//   if (current > 10) {
//     Serial.println("Fault: High Current (1402)");
//   }
//   if (abs(accelX) > 5.0) {
//     Serial.println("Fault: Vibration X High (1403)");
//   }
//   if (abs(accelY) > 5.0) {
//     Serial.println("Fault: Vibration Y High (1404)");
//   }
//   if (abs(accelZ) > 5.0) {
//     Serial.println("Fault: Vibration Z High (1405)");
//   }
//   if (temperature > 75.0) {
//     Serial.println("Fault: High Temperature (1406)");
//   }
// }

String determineFaultCode() {
  if (vinVoltage > 14) {
    return String(status) + String(HIGH_VOLTAGE);
  }
  if (current > 8) {
    return  String(status) + String(HIGH_CURRENT);
  }
  if (abs(accelX) > 5.0) {
    return  String(VIBRATION_X_HIGH); 
  }
  if (abs(accelY) > 5.0) {
    return String(VIBRATION_Y_HIGH); 
  }
  if (abs(accelZ) > 5.0) {
    return String(VIBRATION_Z_HIGH); 
  }
  if (temperature > 45) {
    return String(HIGH_TEMPERATURE); 
  }
  return String(NO_PROBLEM); 
}
