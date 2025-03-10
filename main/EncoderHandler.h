#ifndef ENCODER_HANDLER_H
#define ENCODER_HANDLER_H

#include <Arduino.h>
#include <Encoder.h>
#include <Bounce2.h>

class EncoderHandler {
public:
    EncoderHandler(uint8_t clkPin, uint8_t dtPin, uint8_t swPin);

    void begin(); // Инициализация
    void update(); // Обновление состояния

    int getEncoderValue() const; // Получить текущее значение энкодера
    bool isButtonPressed() const; // Получить состояние кнопки

    // Установка обработчиков событий
    void setRotateCallback(void (*callback)(int));
    void setButtonCallback(void (*callback)(bool));

private:
    Encoder encoder;
    Bounce button;
    
    int encoderValue;
    bool buttonState;

    // Коллбэки
    void (*onRotate)(int) = nullptr;
    void (*onButtonPress)(bool) = nullptr;
};

#endif
