void updateThingSpeak() {
  ThingSpeak.setField(1, temperature);
  ThingSpeak.setField(2, vinVoltage);
  ThingSpeak.setField(3, current);
  ThingSpeak.setField(4, kWh);
  ThingSpeak.setField(5, accelX);
  ThingSpeak.setField(6, accelY);
  ThingSpeak.setField(7, accelZ);
  ThingSpeak.setField(8, faultcode);

  int responseCode = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  if (responseCode == 200) {
    Serial.println("Data sent successfully");
    digitalWrite(ONBOARD_LED_PIN, HIGH);
    delay(300);
    digitalWrite(ONBOARD_LED_PIN, LOW);
  } else {
    Serial.println("Error sending data. HTTP response code: " + String(responseCode));
  }
}
