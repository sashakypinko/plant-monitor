#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ПОДКЛЮЧЕНИЕ ДАТЧИКОВ
#define ONE_WIRE_BUS 8
#define MOISTURE_PIN A0 
#define LIGHT_SENSOR A1  
#define HEATER_PIN 3 
#define PUMP_PIN 4     

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature ds18b20(&oneWire);
Adafruit_BMP280 bmp;

void setup() {
    Serial.begin(115200);

    ds18b20.begin();

    if (!bmp.begin(0x76)) {
        Serial.println("Ошибка! Не найден BMP280!");
        while (1);
    }

    pinMode(HEATER_PIN, OUTPUT);
    pinMode(PUMP_PIN, OUTPUT);

    digitalWrite(HEATER_PIN, LOW);
    digitalWrite(PUMP_PIN, LOW);
}

void loop() {
    ds18b20.requestTemperatures();
    float airTemperature = bmp.readTemperature();
    float soilTemperature = ds18b20.getTempCByIndex(0);

    float airMoisture = 46;

    int soilMoisture = analogRead(MOISTURE_PIN);
    soilMoisture = map(soilMoisture, 0, 1023, 0, 100);

    float pressure = bmp.readPressure() / 100.0F;

    int light = analogRead(LIGHT_SENSOR);
    light = map(light, 0, 1023, 0, 100);

    Serial.print("[");
      
    for(int i = 0; i < 10; i++) {
      Serial.print("{\"id\":");
      Serial.print(i);
      Serial.print(",\"airTemperature\":");
      Serial.print(airTemperature);
      Serial.print(",\"soilTemperature\":");
      Serial.print(soilTemperature);
      Serial.print(",\"airMoisture\":");
      Serial.print(airMoisture);
      Serial.print(",\"soilMoisture\":");
      Serial.print(soilMoisture);
      Serial.print(",\"light\":");
      Serial.print(light);
      Serial.print(",\"pressure\":");
      Serial.print(pressure);
      Serial.print("}");

      if (i < 9) {
        Serial.print(",");
      }
    }
    Serial.println("]");
   
    if (Serial.available()) {
        String command = Serial.readStringUntil('\n');
        command.trim();

        if (command == "HEATER_ON") {
            digitalWrite(HEATER_PIN, HIGH);
        } else if (command == "HEATER_OFF") {
            digitalWrite(HEATER_PIN, LOW);
        } else if (command == "PUMP_ON") {
            digitalWrite(PUMP_PIN, HIGH);
        } else if (command == "PUMP_OFF") {
            digitalWrite(PUMP_PIN, LOW);
        }
    }

    delay(20);
}
