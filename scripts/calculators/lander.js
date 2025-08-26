import { areValuesPresent } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

export function initLanderCalculator() {
    const calculateBtn = document.getElementById('lander-calculate-btn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const weightLifted = parseFloat(document.getElementById('lander-weight-lifted').value);
        const reps = parseInt(document.getElementById('lander-reps').value);
        const resultDiv = document.getElementById('lander-result');

        if (!areValuesPresent([weightLifted, reps], 'Por favor rellene todos los espacios.')) {
            return;
        }

        const result = (100 * weightLifted) / (101.3 - 2.67123 * reps);
        showResult(resultDiv, `El RM Maximo estimado es: ${result.toFixed(2)}`);
    });
}
