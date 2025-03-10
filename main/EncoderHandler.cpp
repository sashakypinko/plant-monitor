#include "EncoderHandler.h"

EncoderHandler::EncoderHandler(uint8_t clkPin, uint8_t dtPin, uint8_t swPin)
    : encoder(clkPin, dtPin), button(), encoderValue(0), buttonState(false) {
    button.attach(swPin, INPUT_PULLUP);
    button.interval(5); // Антидребезг 5 мс
}

void EncoderHandler::begin() {
    // Можно добавить инициализацию при необходимости
}

void EncoderHandler::update() {
    int newValue = encoder.read() / 4; // Учитываем особенности библиотеки
    if (newValue != encoderValue) {
        int delta = newValue - encoderValue; // Разница (направление вращения)
        encoderValue = newValue;
        
        // Вызываем коллбэк при изменении энкодера
        if (onRotate) {
            onRotate(delta);
        }
    }

    button.update();
    if (button.fell()) { // Кнопка нажата
        buttonState = !buttonState;

        // Вызываем коллбэк при нажатии кнопки
        if (onButtonPress) {
            onButtonPress(buttonState);
        }
    }
}

// Методы для установки коллбэков
void EncoderHandler::setRotateCallback(void (*callback)(int)) {
    onRotate = callback;
}

void EncoderHandler::setButtonCallback(void (*callback)(bool)) {
    onButtonPress = callback;
}

int EncoderHandler::getEncoderValue() const {
    return encoderValue;
}

bool EncoderHandler::isButtonPressed() const {
    return buttonState;
}
