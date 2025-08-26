import { areValuesPresent } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

export function initQueensCalculator() {
    const calculateBtn = document.getElementById('queens-calculate-btn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const gender = document.getElementById('queens-gender').value;
        const hr = parseFloat(document.getElementById('queens-hr').value);
        const resultDiv = document.getElementById('queens-result');

        if (!areValuesPresent([hr], 'Por favor, ingrese todos los valores.')) {
            return;
        }

        let result;
        if (gender === 'M') {
            result = 111.33 - (0.42 * hr);
        } else {
            result = 65.81 - (0.1847 * hr);
        }

        showResult(resultDiv, `Su VO2Max es: ${result.toFixed(2)}`);
    });
}
