import { areValuesPresent, isNotNegative } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

export function initYoYoCalculator() {
    const calculateBtn = document.getElementById('yoyo-calculate-btn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const distance = parseFloat(document.getElementById('yoyo-distance').value);
        const resultDiv = document.getElementById('yoyo-result');

        if (!areValuesPresent([distance], 'Por favor rellene todos los espacios.')) {
            return;
        }
        if (!isNotNegative(distance, 'La distancia no puede ser negativa.')) {
            return;
        }

        const result = distance * 0.0084 + 36.4;
        showResult(resultDiv, `Su VO2Max es: ${result.toFixed(2)}`);
    });
}
