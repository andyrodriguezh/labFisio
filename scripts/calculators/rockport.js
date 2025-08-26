import { referenceData } from '../data/reference-tables.js';
import { areValuesPresent, isValueInRange } from '../utils/validation.js';
import { showResult } from '../utils/ui.js';

function showRockportReference(result, age, gender) {
    const referenceTable = document.getElementById('rockport-reference');
    const referenceBody = document.getElementById('rockport-reference-body');
    const marker = document.getElementById('rockport-marker');
    const rangeLabels = document.getElementById('rockport-range-labels');
    const classificationDiv = document.getElementById('rockport-classification');

    referenceBody.innerHTML = '';
    rangeLabels.innerHTML = '';

    let ageGroup;
    if (age >= 20 && age <= 29) ageGroup = '20-29';
    else if (age >= 30 && age <= 39) ageGroup = '30-39';
    else if (age >= 40 && age <= 49) ageGroup = '40-49';
    else if (age >= 50 && age <= 59) ageGroup = '50-59';
    else if (age >= 60 && age <= 69) ageGroup = '60-69';
    else if (age >= 70 && age <= 79) ageGroup = '70-79';
    else ageGroup = '20-29';

    const ageGroupData = referenceData[gender][ageGroup];
    const maxVO2 = ageGroupData[0].value + 5;
    const minVO2 = ageGroupData[ageGroupData.length - 1].value - 5;

    let categoryIndex = -1;
    for (let i = 0; i < ageGroupData.length; i++) {
        if (result >= ageGroupData[i].value) {
            categoryIndex = i;
            break;
        }
    }

    let classification = '';
    let percentile = 0;

    if (categoryIndex !== -1) {
        if (ageGroupData[categoryIndex].rank && ageGroupData[categoryIndex].rank !== '-') {
            classification = ageGroupData[categoryIndex].rank;
            percentile = ageGroupData[categoryIndex].percentile;
        } else {
            let j = categoryIndex;
            while (j >= 0) {
                if (ageGroupData[j].rank && ageGroupData[j].rank !== '-') {
                    classification = ageGroupData[j].rank;
                    percentile = ageGroupData[categoryIndex].percentile;
                    break;
                }
                j--;
            }
        }
    } else {
        classification = 'Por debajo del mínimo';
        percentile = 5;
    }

    classificationDiv.textContent = `Clasificación: ${classification} (Percentil ${percentile})`;
    classificationDiv.className = 'classification-result';

    if (classification === 'Superior' || classification === 'Excelente') {
        classificationDiv.classList.add('excellent-result');
    } else if (classification === 'Bueno' || classification === 'Aceptable') {
        classificationDiv.classList.add('good-result');
    } else {
        classificationDiv.classList.add('poor-result');
    }

    rangeLabels.innerHTML = `
        <span>${Math.floor(minVO2)}</span>
        <span>${Math.round((minVO2 + maxVO2) / 2)}</span>
        <span>${Math.ceil(maxVO2)}</span>
    `;

    const position = Math.min(Math.max((result - minVO2) / (maxVO2 - minVO2), 0), 1) * 100;
    marker.style.left = `${position}%`;

    for (let i = 0; i < ageGroupData.length; i++) {
        const row = document.createElement('tr');
        const currentData = ageGroupData[i];
        if (i === categoryIndex) {
            row.classList.add('highlighted');
        }
        row.innerHTML = `
            <td>${currentData.rank || '-'}</td>
            <td>${currentData.percentile}</td>
            <td>≥ ${currentData.value.toFixed(1)}</td>
        `;
        referenceBody.appendChild(row);
    }

    if (categoryIndex === -1) {
        const row = document.createElement('tr');
        row.classList.add('highlighted');
        row.innerHTML = `
            <td>Por debajo del mínimo</td>
            <td>< 10</td>
            <td>< ${ageGroupData[ageGroupData.length - 1].value.toFixed(1)}</td>
        `;
        referenceBody.appendChild(row);
    }

    referenceTable.style.display = 'block';
}

export function initRockportCalculator() {
    const calculateBtn = document.getElementById('rockport-calculate-btn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const age = parseInt(document.getElementById('rockport-age').value);
        let weight = parseFloat(document.getElementById('rockport-weight').value);
        const weightUnit = document.getElementById('rockport-weight-unit').value;
        const gender = document.getElementById('rockport-gender').value;
        const hr = parseFloat(document.getElementById('rockport-hr').value);
        const timeInput = document.getElementById('rockport-time').value;
        const resultDiv = document.getElementById('rockport-result');

        if (!areValuesPresent([age, weight, hr, timeInput], 'Por favor rellene todos los espacios.')) {
            return;
        }
        if (!isValueInRange(age, 18, 79, 'Edad debe estar entre 18 y 79.')) {
            return;
        }

        const timeParts = timeInput.split(':');
        if (timeParts.length !== 2) {
            alert('Ingrese el tiempo en formato mm:ss .');
            return;
        }
        const time = parseFloat(timeParts[0]) + (parseFloat(timeParts[1]) / 60);

        if (weightUnit === 'kg') {
            weight = weight * 2.20462;
        }

        let result;
        if (gender === 'M') {
            if (age >= 18 && age <= 29) {
                result = 97.660 - (0.0957 * weight) - (1.4537 * time) - (0.1194 * hr);
            } else {
                result = 139.168 - (0.3877 * age) - (0.1692 * weight) - (3.2649 * time) - (0.1565 * hr);
            }
        } else { // Female
            if (age >= 18 && age <= 29) {
                result = 88.768 - (0.0957 * weight) - (1.4537 * time) - (0.1194 * hr);
            } else {
                result = 132.853 - (0.3877 * age) - (0.1692 * weight) - (3.2649 * time) - (0.1565 * hr);
            }
        }

        showResult(resultDiv, `Su VO2Max es: ${result.toFixed(2)} ml/kg/min`);
        showRockportReference(result, age, gender);
    });
}
