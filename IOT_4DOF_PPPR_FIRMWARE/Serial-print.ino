void Serialprint(){
  // Print all values to serial monitor
    Serial.print("Temperature: ");
    Serial.print(temperature, 1);
    Serial.print(" C, Current: ");
    Serial.print(current, 1);
    Serial.print(" A, Voltage: ");
    Serial.print(vinVoltage, 1);
    Serial.print(" V, Power: ");
    Serial.print(power, 1);
    Serial.print(" W, kWh: ");
    Serial.print(kWh, 4);
    Serial.print(", AccelX: ");
    Serial.print(accelX);
    Serial.print(", AccelY: ");
    Serial.print(accelY);
    Serial.print(", AccelZ: ");
    Serial.print(accelZ);
    Serial.print(", Status: ");
    Serial.println(status);
}