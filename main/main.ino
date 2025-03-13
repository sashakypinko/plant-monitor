#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// ПОДКЛЮЧЕНИЕ ДАТЧИКОВ
#define ONE_WIRE_BUS 8
#define MOISTURE_PIN A0
#define LIGHT_SENSOR A1
#define HEATER_PIN 5
#define PUMP_PIN 4
#define FAN_PIN 6
#define KLAPAN_PIN 7

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature ds18b20(&oneWire);
Adafruit_BMP280 bmp;

String inputString = "";  // Buffer to store input commands
String command = "";  // Store parsed command

void setup() {
    Serial.begin(115200);

    ds18b20.begin();

    if (!bmp.begin(0x76)) {
        Serial.println("Ошибка! Не найден BMP280!");
        while (1);
    }

    pinMode(HEATER_PIN, OUTPUT);
    pinMode(PUMP_PIN, OUTPUT);
    pinMode(FAN_PIN, OUTPUT);

    digitalWrite(HEATER_PIN, LOW);
    digitalWrite(PUMP_PIN, LOW);
    digitalWrite(FAN_PIN, LOW);
}

void loop() {
    ds18b20.requestTemperatures();
    float airTemperature = bmp.readTemperature();
    float soilTemperature = ds18b20.getTempCByIndex(0);
    float airMoisture = 46;  // Placeholder value

    int soilMoisture = analogRead(MOISTURE_PIN);
    soilMoisture = map(soilMoisture, 0, 1023, 0, 100);

    float pressure = bmp.readPressure() / 100.0F;

    int light = analogRead(LIGHT_SENSOR);
    light = map(light, 0, 1023, 0, 100);

    Serial.print("[");
    for (int i = 0; i < 10; i++) {
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
        inputString = Serial.readStringUntil('\n');  // Read input until newline
        inputString.trim();  // Remove whitespace

        int value = parseCommand(inputString);

        if (command == "HEATER") {
            Serial.print("Changing heater to ");
            Serial.println(value);
            analogWrite(HEATER_PIN, value);
        } else if (command == "FAN") {
            Serial.print("Changing fan to ");
            Serial.println(value);
            analogWrite(FAN_PIN, value);
        } else if (command == "KLAPAN") {
            Serial.print("Changing klapan to ");
            Serial.println(value);

            if (value == 0) {
              digitalWrite(KLAPAN_PIN, LOW);
            } else {
              digitalWrite(KLAPAN_PIN, HIGH);
            }
        } else {
            Serial.println("Invalid command!");
        }
    }

    delay(20);
}

int parseCommand(String input) {
    int separatorIndex = input.indexOf(':');

    if (separatorIndex != -1) {
        command = input.substring(0, separatorIndex);
        String valueStr = input.substring(separatorIndex + 1);
        valueStr.trim();

        return valueStr.toInt();
    } else {
        Serial.println("Invalid format! Use: COMMAND:VALUE");
        return 0;
    }
}
