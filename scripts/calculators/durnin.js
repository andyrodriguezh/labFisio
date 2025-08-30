export function initDurninCalculator() {
    const calculateBtn = document.getElementById('durnin-calculate-btn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const sex = document.getElementById('durnin-gender').value;
        const age = parseInt(document.getElementById('durnin-age').value, 10);
        const weight = parseFloat(document.getElementById('durnin-weight').value);

        const skinfolds = {
            biceps: parseFloat(document.getElementById('durnin-biceps').value),
            triceps: parseFloat(document.getElementById('durnin-triceps').value),
            subscapular: parseFloat(document.getElementById('durnin-subscapular').value),
            suprailiac: parseFloat(document.getElementById('durnin-suprailiac').value)
        };

        const result = calculateDurninWomersley(sex, age, weight, skinfolds);
        const resultDiv = document.getElementById('durnin-result');

        if (result) {
            resultDiv.innerHTML = `
                <p><strong>Porcentaje de Grasa Corporal:</strong> ${result.bodyFatPercentage}%</p>
                <p><strong>Masa Grasa:</strong> ${result.fatMass} kg</p>
                <p><strong>Masa Magra:</strong> ${result.leanMass} kg</p>
            `;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.innerHTML = '<p>Por favor, revise los valores ingresados. Todos los campos son obligatorios.</p>';
            resultDiv.style.display = 'block';
        }
    });
}

/**
 * Calculates body composition using the Durnin-Womersley 1974 skinfold method.
 *
 * @param {string} sex - The individual's sex ('male' or 'female').
 * @param {number} age - The individual's age in years.
 * @param {number} weight - The individual's total body weight in kilograms.
 * @param {object} skinfolds - The skinfold measurements in millimeters.
 * @param {number} skinfolds.biceps - Biceps skinfold measurement.
 * @param {number} skinfolds.triceps - Triceps skinfold measurement.
 * @param {number} skinfolds.subscapular - Subscapular skinfold measurement.
 * @param {number} skinfolds.suprailiac - Suprailiac skinfold measurement.
 * @returns {{bodyDensity: string, bodyFatPercentage: string, fatMass: string, leanMass: string}|null} An object with the calculated results, or null if inputs are invalid.
 */
function calculateDurninWomersley(sex, age, weight, skinfolds) {
    const { biceps, triceps, subscapular, suprailiac } = skinfolds;

    if (!sex || !age || !weight || isNaN(biceps) || isNaN(triceps) || isNaN(subscapular) || isNaN(suprailiac)) {
        console.error("Invalid inputs: All parameters are required and must be valid numbers.");
        return null;
    }

    const sumOfFolds = biceps + triceps + subscapular + suprailiac;
    if (sumOfFolds <= 0) {
        console.error("Sum of skinfolds must be positive.");
        return null;
    }

    let C, M;
    const lowerCaseSex = sex.toLowerCase();

    if (lowerCaseSex === 'male') {
        if (age < 17) { C = 1.1533; M = 0.0643; }
        else if (age <= 19) { C = 1.1620; M = 0.0630; }
        else if (age <= 29) { C = 1.1631; M = 0.0632; }
        else if (age <= 39) { C = 1.1422; M = 0.0544; }
        else if (age <= 49) { C = 1.1620; M = 0.0700; }
        else { C = 1.1715; M = 0.0779; } // 50+
    } else if (lowerCaseSex === 'female') {
        if (age < 17) { C = 1.1369; M = 0.0598; }
        else if (age <= 19) { C = 1.1549; M = 0.0678; }
        else if (age <= 29) { C = 1.1599; M = 0.0717; }
        else if (age <= 39) { C = 1.1423; M = 0.0632; }
        else if (age <= 49) { C = 1.1333; M = 0.0612; }
        else { C = 1.1339; M = 0.0645; } // 50+
    } else {
        console.error("Invalid sex specified. Must be 'male' or 'female'.");
        return null;
    }

    const logOfFolds = Math.log10(sumOfFolds);
    const bodyDensity = C - (M * logOfFolds);

    // Siri formula for body fat percentage
    const bodyFatPercentage = (495 / bodyDensity) - 450;

    // Calculate fat mass and lean mass
    const fatMass = weight * (bodyFatPercentage / 100);
    const leanMass = weight - fatMass;

    return {
        bodyDensity: bodyDensity.toFixed(4),
        bodyFatPercentage: bodyFatPercentage.toFixed(2),
        fatMass: fatMass.toFixed(2),
        leanMass: leanMass.toFixed(2)
    };
}
