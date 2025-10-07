
import { areValuesPresent, isPositive, isPercentage } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

export function initMaxHeartRateCalculator() {
    const calculateBtn = document.getElementById('mhr-calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const age = parseInt(document.getElementById('mhr-age').value);
            const formula = document.getElementById('mhr-formula').value;
            const percentage = document.getElementById('mhr-percentage').value; // Can be empty
            const resultDiv = document.getElementById('mhr-result');

            if (!areValuesPresent([age], 'Por favor ingrese la edad.')) {
                return;
            }
            if (!isPositive(age, 'La edad debe ser un número positivo.')) {
                return;
            }

            let maxHeartRate;
            if (formula === '220-age') {
                maxHeartRate = 220 - age;
            } else { // 208 - (0.7 * age)
                maxHeartRate = 208 - (0.7 * age);
            }

            let resultMessage = `Su FCmáx es: ${Math.round(maxHeartRate)} pulsasiones por minuto.`;

            if (percentage) {
                const percentageValue = parseFloat(percentage);
                if (!isPercentage(percentageValue, 'El porcentaje debe estar entre 0 y 100.')) {
                    return;
                }
                const targetHeartRate = maxHeartRate * (percentageValue / 100);
                resultMessage += ` El ${percentageValue}% de su FCmáx es: ${Math.round(targetHeartRate)} pulsasiones por minuto.`;
            }

            showResult(resultDiv, resultMessage);
        });
    }
}
