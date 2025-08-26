import { areValuesPresent, isPositive } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

export function initBmiCalculator() {
    const systemSelect = document.getElementById('bmi-system');
    const calculateBtn = document.getElementById('bmi-calculate-btn');

    if (systemSelect) {
        systemSelect.addEventListener('change', (e) => {
            const weightUnit = document.getElementById('bmi-weight-unit');
            const heightUnit = document.getElementById('bmi-height-unit');
            if (e.target.value === 'metric') {
                weightUnit.textContent = 'kg';
                heightUnit.textContent = 'm';
            } else {
                weightUnit.textContent = 'lbs';
                heightUnit.textContent = 'pies (ft)';
            }
        });
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const system = document.getElementById('bmi-system').value;
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            const heightInput = parseFloat(document.getElementById('bmi-height').value);
            const resultDiv = document.getElementById('bmi-result');

            if (!areValuesPresent([weight, heightInput], 'Por favor rellene todos los espacios.')) {
                return;
            }
            if (!isPositive(heightInput, 'La Estatura debe ser mayor a 0.')) {
                return;
            }

            let result;
            if (system === 'metric') {
                result = weight / (heightInput * heightInput);
            } else {
                const heightInInches = heightInput * 12;
                result = (weight / (heightInInches * heightInInches)) * 703;
            }

            let category = '';
            if (result < 18.5) {
                category = 'Bajo peso';
            } else if (result < 25) {
                category = 'Normal';
            } else if (result < 30) {
                category = 'Sobrepeso';
            } else {
                category = 'Obesidad';
            }

            showResult(resultDiv, `Su IMC es: ${result.toFixed(2)} - Categoría: ${category}`);
        });
    }
}
