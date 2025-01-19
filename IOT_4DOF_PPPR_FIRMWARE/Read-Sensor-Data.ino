void initADXL345() {
  Wire.beginTransmission(ADXL345_ADDR);
  Wire.write(0x2D);  // Power Control register
  Wire.write(0x08);  // Set measurement mode
  Wire.endTransmission();

  Wire.beginTransmission(ADXL345_ADDR);
  Wire.write(0x31);  // Data Format register
  Wire.write(0x0B);  // Full resolution, +/-16g
  Wire.endTransmission();
}

float readTemperature() {
  int analogValueNTC = analogRead(NTC_PIN);
  float voltage = analogValueNTC * ADC_VREF / ADC_RESOLUTION;
  float resistance = (ADC_VREF * ROOM_RESISTANCE / voltage) - ROOM_RESISTANCE;
  float tempK = 1.0 / (1.0 / ROOM_TEMP + log(resistance / ROOM_RESISTANCE) / BETA);
  return tempK - 273.15;  // Convert Kelvin to Celsius
}

float readCurrent() {
  long totalAnalogValue = 0;

  // Take multiple readings
  for (int i = 0; i < NUM_SAMPLES; i++) {
    totalAnalogValue += analogRead(ACS_PIN);
    delay(10);  // Small delay between readings for stability
  }

  // Calculate the average analog value
  float averageAnalogValue = totalAnalogValue / (float)NUM_SAMPLES;

  // Convert average analog value to voltage
  float acsVoltage = averageAnalogValue * ADC_VREF / ADC_RESOLUTION;

  // Calculate and return the current
  return abs((acsVoltage - ACS712_OFFSET) / ACS712_SENSITIVITY);
}

float readVoltage() {
  int analogValueVin = analogRead(VIN_PIN);
  float vinReading = analogValueVin * ADC_VREF / ADC_RESOLUTION;
  return vinReading * VOLTAGE_DIVIDER_RATIO;
}

void readAcceleration() {
  Wire.beginTransmission(ADXL345_ADDR);
  Wire.write(0x32);  // Start with the data register 0x32
  Wire.endTransmission(false);
  Wire.requestFrom(ADXL345_ADDR, 6);

  if (Wire.available() == 6) {
    accelX = Wire.read() | (Wire.read() << 8);
    accelY = Wire.read() | (Wire.read() << 8);
    accelZ = Wire.read() | (Wire.read() << 8);
  }
}

int readStatusPin() {
  return digitalRead(STATUS_PIN);
}