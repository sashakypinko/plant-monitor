#ifndef DISPLAY_HANDLER_H
#define DISPLAY_HANDLER_H

#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

// Пины дисплея (измените под ваш модуль)
#define TFT_CS    10
#define TFT_DC    9
#define TFT_RST   8

// Количество секций (мониторов)
#define SECTION_COUNT 10

class DisplayHandler {
public:
    DisplayHandler();

    void begin();
    void updateDisplay();
    
    void nextSection();  // Переключение между секциями
    void prevSection();
    
    void enterEditMode();  // Вход в режим редактирования
    void exitEditMode();
    void nextEditField();  // Переключение между полями редактирования
    void changeValue(int delta);  // Изменение значений границ

    bool isEditMode() const; // Проверка режима редактирования

private:
    Adafruit_ILI9341 tft;
    
    int currentSection;  // Текущая секция (0-9)
    bool editMode;       // Флаг режима редактирования
    int editField;       // Какой параметр редактируется (0-3)

    struct SectionData {
        float temperature;
        float humidity;
        float soilMoisture;
        int light;
        
        float tempMin, tempMax;
        float humMin, humMax;
        float soilMin, soilMax;
        int lightMin, lightMax;
    } sections[SECTION_COUNT];

    void drawScreen();  // Отрисовка обычного экрана
    void drawEditScreen();  // Отрисовка режима редактирования
};

#endif
