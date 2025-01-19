// Function Definitions
void initLCD() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("   4 DOF PPPR");
  lcd.setCursor(0, 1);
  lcd.print("CARTESIAN ROBOT");
  digitalWrite(BUZZER_PIN, HIGH);
  delay(1000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(" ROBO SENSE IOT");
  lcd.setCursor(0, 1);
  lcd.print("INITALIZING.....");
  digitalWrite(BUZZER_PIN, LOW);
  delay(1000);
}



void displayData() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temperature, 1);
  lcd.print("C I:");
  lcd.print(current, 1);
  lcd.print("A");

  lcd.setCursor(0, 1);
  lcd.print("V:");
  lcd.print(vinVoltage, 1);
  lcd.print("V U:");
  lcd.print(kWh, 1);
}



