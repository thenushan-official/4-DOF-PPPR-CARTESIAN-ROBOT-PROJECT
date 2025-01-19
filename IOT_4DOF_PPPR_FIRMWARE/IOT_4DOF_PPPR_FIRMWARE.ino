#include <Wire.h>
#include <WiFi.h>
#include <ThingSpeak.h>
#include <LiquidCrystal_I2C.h>

#define NO_PROBLEM 400
#define HIGH_VOLTAGE 401
#define HIGH_CURRENT 402
#define VIBRATION_X_HIGH 403
#define VIBRATION_Y_HIGH 404
#define VIBRATION_Z_HIGH 405
#define HIGH_TEMPERATURE 406
#define NO_POWER_TO_ROBOT 407
#define EMERGENCY_STOPPED 408
#define ANOMALY_SENSOR_DETECTED 409
#define COLLISION_DETECTION 410
#define POWER_SUPPLY_FAULT 411



// Define I2C LCD address and dimensions
LiquidCrystal_I2C lcd(0x27, 16, 2);

// WiFi credentials
const char *ssid = "FOT-WiFi";
const char *password = "fot@2021";

// ThingSpeak settings
unsigned long myChannelNumber = 2808728;
const char *myWriteAPIKey = "Q399NBLVRJUHPPCM";

// ThingSpeak channel settings
unsigned long readChannelID = 2808732;  
const char *readAPIKey = "UGTJOT4WKEMDX0Y7";  

WiFiClient client;

// Define GPIO pins and constants
#define NTC_PIN 35
#define ACS_PIN 34
#define VIN_PIN 33
#define BUZZER_PIN 32
#define STATUS_PIN 18
#define ESTOP_PIN 5
#define ONBOARD_LED_PIN 2

#define BETA 3950
#define ROOM_TEMP 298.15  // Room temperature in Kelvin (25°C)
#define ROOM_RESISTANCE 10000

#define ADC_RESOLUTION 4095
#define ADC_VREF 3.3

#define ACS712_OFFSET 2.3
#define ACS712_SENSITIVITY 0.100

#define VOLTAGE_DIVIDER_RATIO 14.04

// ADXL345 I2C address
#define ADXL345_ADDR 0x53

// Number of samples to average
#define NUM_SAMPLES 10  

// Variables
float temperature, current, vinVoltage, power;
int16_t accelX, accelY, accelZ;
int status,powerStaus;
int  SwitchStatus = 0;
int  ResetStatus = 0;
int faultcode;

// Time management variables
unsigned long previousUpdateTime = 0;
unsigned long previousMeasurementTime = 0;
unsigned long measurementInterval = 20000; // 20 seconds

// Energy calculation variables
float kWh = 0.0; // Accumulated energy (kWh)

// Function Prototypes
void initLCD();
void initADXL345();
float readTemperature();
float readCurrent();
float readVoltage();
void readAcceleration();
int readStatusPin();
void displayData();
void updateThingSpeak();
void Serialprint();
void checkFaults();

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  initLCD();
  
  pinMode(ONBOARD_LED_PIN, OUTPUT);
  pinMode(NTC_PIN, INPUT);
  pinMode(ACS_PIN, INPUT);
  pinMode(VIN_PIN, INPUT);
  pinMode(STATUS_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  // Connect to Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(" ROBO SENSE IOT");
  lcd.setCursor(0, 1);
  lcd.print("CONNECTING......");
  delay(1000);
  Serial.println("Connecting to WiFi...");
  }
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("ROBO SENSE IOT");
  lcd.setCursor(0, 1);
  lcd.print("CONNECTED");
  delay(1000);
  Serial.println("Connected to WiFi");

  // Initialize ThingSpeak
  ThingSpeak.begin(client);

  // Initialize ADXL345
  Wire.begin();
  initADXL345();
}

void loop() {
  unsigned long currentTime = millis();

  if (currentTime - previousMeasurementTime >= measurementInterval) {
    // Read sensor values
    temperature = readTemperature();
    current = readCurrent();
    vinVoltage = readVoltage();
    readAcceleration(); // Update accelX, accelY, accelZ
    status = readStatusPin();

    // Read datas from channel to activate commands
    SwitchStatus = ThingSpeak.readLongField(readChannelID, 1, readAPIKey);  // Field 1
    ResetStatus = ThingSpeak.readLongField(readChannelID, 2, readAPIKey);   // Field 2


    Serial.print("SwitchStatus: ");
    Serial.println(SwitchStatus);  // Outputs the integer value from Field 1

    Serial.print("ResetStatus: ");
    Serial.println(ResetStatus);  // Outputs the integer value from Field 2

    // Calculate power and energy
    power = vinVoltage * current; // Power in Watts
    kWh += (power * (measurementInterval / 3600000.0)); // Convert ms to hours
    
    // Determine falult code
    faultcode = determineFaultCode().toInt();

    // Display values
    displayData();
    Serialprint();
    
    // Send data to ThingSpeak
    updateThingSpeak();

    previousMeasurementTime = currentTime;
  }
}

