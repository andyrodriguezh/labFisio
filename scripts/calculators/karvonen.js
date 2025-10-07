
import { areValuesPresent, isPositive, isPercentage } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

export function initKarvonenCalculator() {
    const calculateBtn = document.getElementById('karvonen-calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const age = parseInt(document.getElementById('karvonen-age').value);
            const restingHr = parseInt(document.getElementById('karvonen-resting-hr').value);
            const intensity = parseFloat(document.getElementById('karvonen-intensity').value);
            const resultDiv = document.getElementById('karvonen-result');

            if (!areValuesPresent([age, restingHr, intensity], 'Por favor rellene todos los espacios.')) {
                return;
            }
            if (!isPositive(age, 'La edad debe ser un número positivo.') || !isPositive(restingHr, 'La FC en reposo debe ser un número positivo.')) {
                return;
            }
            if (!isPercentage(intensity, 'La intensidad debe estar entre 0 y 100.')) {
                return;
            }

            // Calculate FCmax using Tanaka formula
            const maxHr = 208 - (0.7 * age);

            // Calculate Target Heart Rate using Karvonen formula
            const targetHr = ((maxHr - restingHr) * (intensity / 100)) + restingHr;

            const resultMessage = `Su Frecuencia Cardíaca Objetivo es: ${Math.round(targetHr)} pulsaciones por minuto.`;

            showResult(resultDiv, resultMessage);
        });
    }
}
