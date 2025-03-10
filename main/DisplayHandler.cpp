#include "DisplayHandler.h"

DisplayHandler::DisplayHandler()
    : tft(TFT_CS, TFT_DC, TFT_RST), currentSection(0), editMode(false), editField(0) {
    // Захардкоженные значения для тестов
    for (int i = 0; i < SECTION_COUNT; i++) {
        sections[i] = {25.0, 60.0, 30.0, 700, 18.0, 30.0, 50.0, 80.0, 20.0, 50.0, 300, 1000};
    }
}

void DisplayHandler::begin() {
    tft.begin();
    tft.setRotation(3); // Повернуть дисплей горизонтально
    updateDisplay();
}

void DisplayHandler::updateDisplay() {
    if (editMode) {
        drawEditScreen();
    } else {
        drawScreen();
    }
}

void DisplayHandler::nextSection() {
    if (!editMode) {
        currentSection = (currentSection + 1) % SECTION_COUNT;
        updateDisplay();
    }
}

void DisplayHandler::prevSection() {
    if (!editMode) {
        currentSection = (currentSection - 1 + SECTION_COUNT) % SECTION_COUNT;
        updateDisplay();
    }
}

void DisplayHandler::enterEditMode() {
    editMode = true;
    editField = 0;
    updateDisplay();
}

void DisplayHandler::exitEditMode() {
    editMode = false;
    updateDisplay();
}

void DisplayHandler::nextEditField() {
    if (editMode) {
        editField = (editField + 1) % 5; // 4 параметра + кнопка "Назад"
        updateDisplay();
    }
}

void DisplayHandler::changeValue(int delta) {
    if (editMode) {
        SectionData &data = sections[currentSection];

        switch (editField) {
            case 0: data.tempMin += delta; break;
            case 1: data.tempMax += delta; break;
            case 2: data.humMin += delta; break;
            case 3: data.humMax += delta; break;
            case 4: exitEditMode(); return; // Кнопка "Назад"
        }
        updateDisplay();
    }
}

bool DisplayHandler::isEditMode() const {
    return editMode;
}

// ======= Отрисовка главного экрана =======
void DisplayHandler::drawScreen() {
    tft.fillScreen(ILI9341_BLACK);
    tft.setTextSize(2);
    tft.setTextColor(ILI9341_WHITE);

    SectionData &data = sections[currentSection];

    tft.setCursor(20, 20);
    tft.print("Section: ");
    tft.print(currentSection + 1);

    tft.setCursor(20, 60);
    tft.print("Temp: "); tft.print(data.temperature); tft.print(" C");

    tft.setCursor(20, 100);
    tft.print("Humidity: "); tft.print(data.humidity); tft.print(" %");

    tft.setCursor(20, 140);
    tft.print("Soil: "); tft.print(data.soilMoisture); tft.print(" %");

    tft.setCursor(20, 180);
    tft.print("Light: "); tft.print(data.light); tft.print(" lx");

    tft.setCursor(20, 220);
    tft.setTextColor(ILI9341_YELLOW);
    tft.print("Press to edit");
}

// ======= Отрисовка режима редактирования =======
void DisplayHandler::drawEditScreen() {
    tft.fillScreen(ILI9341_BLUE);
    tft.setTextSize(2);
    tft.setTextColor(ILI9341_WHITE);

    SectionData &data = sections[currentSection];

    const char* labels[] = {"Temp Min: ", "Temp Max: ", "Hum Min: ", "Hum Max: ", "Back"};

    float values[] = {data.tempMin, data.tempMax, data.humMin, data.humMax, 0};

    for (int i = 0; i < 5; i++) {
        tft.setCursor(20, 50 + i * 40);
        if (i == editField) {
            tft.setTextColor(ILI9341_YELLOW);
        } else {
            tft.setTextColor(ILI9341_WHITE);
        }

        tft.print(labels[i]);
        if (i < 4) tft.print(values[i]);
    }
}
