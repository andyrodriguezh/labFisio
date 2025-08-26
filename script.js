// Queens College Step Test
document.getElementById('queens-calculate-btn').addEventListener('click', () => {
    const gender = document.getElementById('queens-gender').value;
    const hr = parseFloat(document.getElementById('queens-hr').value);
    const resultDiv = document.getElementById('queens-result');
    let result;

    if (!hr) { alert('Please enter all values.'); return; }

    if (gender === 'M') {
        result = 111.33 - (0.42 * hr);
    } else {
        result = 65.81 - (0.1847 * hr);
    }
    resultDiv.textContent = `Su VO2Max es: ${result.toFixed(2)}`;
    resultDiv.style.display = 'block';
});

// Rockport 1 Mile Walk Test
document.getElementById('rockport-calculate-btn').addEventListener('click', () => {
    const age = parseInt(document.getElementById('rockport-age').value);
    let weight = parseFloat(document.getElementById('rockport-weight').value);
    const weightUnit = document.getElementById('rockport-weight-unit').value;
    const gender = document.getElementById('rockport-gender').value;
    const hr = parseFloat(document.getElementById('rockport-hr').value);
    const timeInput = document.getElementById('rockport-time').value;
    const resultDiv = document.getElementById('rockport-result');
    const referenceTable = document.getElementById('rockport-reference');
    let result;

    if (!age || !weight || !hr || !timeInput) { alert('Por favor rellene todos los espacios.'); return; }
    if (age < 18 || age > 79) { alert('Edad debe estar entre 18 y 79.'); return; }

    if (weightUnit === 'kg') {
        weight = weight * 2.20462;
    }

    const timeParts = timeInput.split(':');
    if (timeParts.length !== 2) { alert('Ingrese el tiempo en formato mm:ss .'); return; }
    const time = parseFloat(timeParts[0]) + (parseFloat(timeParts[1]) / 60);

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

    // Mostrar el resultado básico
    resultDiv.textContent = `Su VO2Max es: ${result.toFixed(2)} ml/kg/min`;
    resultDiv.style.display = 'block';

    // Mostrar la tabla de referencia
    showRockportReference(result, age, gender);
});

// Función corregida para mostrar la tabla de referencia del test de Rockport
function showRockportReference(result, age, gender) {
    const referenceTable = document.getElementById('rockport-reference');
    const referenceBody = document.getElementById('rockport-reference-body');
    const marker = document.getElementById('rockport-marker');
    const rangeLabels = document.getElementById('rockport-range-labels');
    const classificationDiv = document.getElementById('rockport-classification');

    // Limpiar contenido anterior
    referenceBody.innerHTML = '';
    rangeLabels.innerHTML = '';

    // Determinar el grupo de edad
    let ageGroup;
    if (age >= 20 && age <= 29) ageGroup = '20-29';
    else if (age >= 30 && age <= 39) ageGroup = '30-39';
    else if (age >= 40 && age <= 49) ageGroup = '40-49';
    else if (age >= 50 && age <= 59) ageGroup = '50-59';
    else if (age >= 60 && age <= 69) ageGroup = '60-69';
    else if (age >= 70 && age <= 79) ageGroup = '70-79';
    else ageGroup = '20-29'; // Default para edades fuera de rango

    // Datos de referencia
    const referenceData = {
        'M': {
            '20-29': [
                { rank: 'Superior', percentile: 90, value: 61.8 },
                { rank: 'Excelente', percentile: 80, value: 57.1 },
                { rank: 'Bueno', percentile: 70, value: 53.7 },
                { rank: '-', percentile: 60, value: 50.2 },
                { rank: 'Aceptable', percentile: 50, value: 48.0 },
                { rank: '-', percentile: 40, value: 44.2 },
                { rank: 'Pobre', percentile: 30, value: 41.0 },
                { rank: '-', percentile: 20, value: 37.1 },
                { rank: 'Muy pobre', percentile: 10, value: 33.0 }
            ],
            '30-39': [
                { rank: 'Superior', percentile: 90, value: 56.5 },
                { rank: 'Excelente', percentile: 80, value: 51.6 },
                { rank: 'Bueno', percentile: 70, value: 48.0 },
                { rank: '-', percentile: 60, value: 44.8 },
                { rank: 'Aceptable', percentile: 50, value: 42.4 },
                { rank: '-', percentile: 40, value: 38.9 },
                { rank: 'Pobre', percentile: 30, value: 36.7 },
                { rank: '-', percentile: 20, value: 33.0 },
                { rank: 'Muy pobre', percentile: 10, value: 29.8 }
            ],
            '40-49': [
                { rank: 'Superior', percentile: 90, value: 52.1 },
                { rank: 'Excelente', percentile: 80, value: 46.7 },
                { rank: 'Bueno', percentile: 70, value: 43.9 },
                { rank: '-', percentile: 60, value: 40.9 },
                { rank: 'Aceptable', percentile: 50, value: 38.1 },
                { rank: '-', percentile: 40, value: 35.4 },
                { rank: 'Pobre', percentile: 30, value: 32.7 },
                { rank: '-', percentile: 20, value: 29.8 },
                { rank: 'Muy pobre', percentile: 10, value: 26.5 }
            ],
            '50-59': [
                { rank: 'Superior', percentile: 90, value: 45.6 },
                { rank: 'Excelente', percentile: 80, value: 41.2 },
                { rank: 'Bueno', percentile: 70, value: 38.2 },
                { rank: '-', percentile: 60, value: 35.7 },
                { rank: 'Aceptable', percentile: 50, value: 33.8 },
                { rank: '-', percentile: 40, value: 31.2 },
                { rank: 'Pobre', percentile: 30, value: 28.9 },
                { rank: '-', percentile: 20, value: 25.9 },
                { rank: 'Muy pobre', percentile: 10, value: 23.1 }
            ],
            '60-69': [
                { rank: 'Superior', percentile: 90, value: 40.3 },
                { rank: 'Excelente', percentile: 80, value: 36.1 },
                { rank: 'Bueno', percentile: 70, value: 32.9 },
                { rank: '-', percentile: 60, value: 31.0 },
                { rank: 'Aceptable', percentile: 50, value: 29.1 },
                { rank: '-', percentile: 40, value: 27.1 },
                { rank: 'Pobre', percentile: 30, value: 25.1 },
                { rank: '-', percentile: 20, value: 22.7 },
                { rank: 'Muy pobre', percentile: 10, value: 20.1 }
            ],
            '70-79': [
                { rank: 'Superior', percentile: 90, value: 36.6 },
                { rank: 'Excelente', percentile: 80, value: 32.6 },
                { rank: 'Bueno', percentile: 70, value: 29.5 },
                { rank: '-', percentile: 60, value: 26.8 },
                { rank: 'Aceptable', percentile: 50, value: 24.4 },
                { rank: '-', percentile: 40, value: 22.5 },
                { rank: 'Pobre', percentile: 30, value: 20.6 },
                { rank: '-', percentile: 20, value: 18.9 },
                { rank: 'Muy pobre', percentile: 10, value: 17.1 }
            ]
        },
        'F': {
            '20-29': [
                { rank: 'Superior', percentile: 90, value: 51.3 },
                { rank: 'Excelente', percentile: 80, value: 46.5 },
                { rank: 'Bueno', percentile: 70, value: 43.2 },
                { rank: '-', percentile: 60, value: 40.0 },
                { rank: 'Aceptable', percentile: 50, value: 37.8 },
                { rank: '-', percentile: 40, value: 35.2 },
                { rank: 'Pobre', percentile: 30, value: 33.0 },
                { rank: '-', percentile: 20, value: 29.9 },
                { rank: 'Muy pobre', percentile: 10, value: 27.0 }
            ],
            '30-39': [
                { rank: 'Superior', percentile: 90, value: 41.4 },
                { rank: 'Excelente', percentile: 80, value: 37.5 },
                { rank: 'Bueno', percentile: 70, value: 34.6 },
                { rank: '-', percentile: 60, value: 32.8 },
                { rank: 'Aceptable', percentile: 50, value: 31.0 },
                { rank: '-', percentile: 40, value: 28.9 },
                { rank: 'Pobre', percentile: 30, value: 27.3 },
                { rank: '-', percentile: 20, value: 24.9 },
                { rank: 'Muy pobre', percentile: 10, value: 22.0 }
            ],
            '40-49': [
                { rank: 'Superior', percentile: 90, value: 38.4 },
                { rank: 'Excelente', percentile: 80, value: 34.0 },
                { rank: 'Bueno', percentile: 70, value: 31.1 },
                { rank: '-', percentile: 60, value: 29.3 },
                { rank: 'Aceptable', percentile: 50, value: 27.5 },
                { rank: '-', percentile: 40, value: 25.9 },
                { rank: 'Pobre', percentile: 30, value: 24.2 },
                { rank: '-', percentile: 20, value: 22.0 },
                { rank: 'Muy pobre', percentile: 10, value: 19.6 }
            ],
            '50-59': [
                { rank: 'Superior', percentile: 90, value: 32.0 },
                { rank: 'Excelente', percentile: 80, value: 28.6 },
                { rank: 'Bueno', percentile: 70, value: 26.8 },
                { rank: '-', percentile: 60, value: 24.9 },
                { rank: 'Aceptable', percentile: 50, value: 23.8 },
                { rank: '-', percentile: 40, value: 22.2 },
                { rank: 'Pobre', percentile: 30, value: 21.1 },
                { rank: '-', percentile: 20, value: 19.5 },
                { rank: 'Muy pobre', percentile: 10, value: 17.5 }
            ],
            '60-69': [
                { rank: 'Superior', percentile: 90, value: 27.0 },
                { rank: 'Excelente', percentile: 80, value: 24.6 },
                { rank: 'Bueno', percentile: 70, value: 23.1 },
                { rank: '-', percentile: 60, value: 21.9 },
                { rank: 'Aceptable', percentile: 50, value: 20.9 },
                { rank: '-', percentile: 40, value: 19.6 },
                { rank: 'Pobre', percentile: 30, value: 18.3 },
                { rank: '-', percentile: 20, value: 16.9 },
                { rank: 'Muy pobre', percentile: 10, value: 15.1 }
            ],
            '70-79': [
                { rank: 'Superior', percentile: 90, value: 23.1 },
                { rank: 'Excelente', percentile: 80, value: 21.9 },
                { rank: 'Bueno', percentile: 70, value: 20.5 },
                { rank: '-', percentile: 60, value: 19.4 },
                { rank: 'Aceptable', percentile: 50, value: 18.3 },
                { rank: '-', percentile: 40, value: 17.2 },
                { rank: 'Pobre', percentile: 30, value: 16.1 },
                { rank: '-', percentile: 20, value: 14.4 },
                { rank: 'Muy pobre', percentile: 10, value: 13.0 }
            ]
        }
    };

    // Obtener los datos de referencia para el género y grupo de edad
    const ageGroupData = referenceData[gender][ageGroup];

    // MEJORA: Calcular el rango específico para este grupo de edad y género
    // Usar el valor más alto (Superior) + un pequeño margen y el más bajo (Muy pobre) - un pequeño margen
    const maxVO2 = ageGroupData[0].value + 5; // Valor Superior + margen
    const minVO2 = ageGroupData[ageGroupData.length - 1].value - 5; // Valor Muy pobre - margen

    // Determinar categoría del resultado
    let categoryIndex = -1;

    // Buscar en qué categoría cae el resultado (de mayor a menor valor)
    for (let i = 0; i < ageGroupData.length; i++) {
        if (result >= ageGroupData[i].value) {
            categoryIndex = i;
            break;
        }
    }

    // Determinar la clasificación basada en la categoría
    let classification = '';
    let percentile = 0;

    if (categoryIndex !== -1) {
        // Si la categoría tiene nombre, usarlo directamente
        if (ageGroupData[categoryIndex].rank && ageGroupData[categoryIndex].rank !== '-') {
            classification = ageGroupData[categoryIndex].rank;
            percentile = ageGroupData[categoryIndex].percentile;
        } else {
            // Si no tiene nombre, buscar hacia arriba la primera categoría con nombre
            let j = categoryIndex;
            while (j >= 0) {
                if (ageGroupData[j].rank && ageGroupData[j].rank !== '-') {
                    classification = ageGroupData[j].rank;
                    percentile = ageGroupData[categoryIndex].percentile; // Mantener percentil original
                    break;
                }
                j--;
            }
        }
    } else {
        // Si está por debajo del valor mínimo
        classification = 'Por debajo del mínimo';
        percentile = 5;
    }

    // Mostrar la clasificación
    classificationDiv.textContent = `Clasificación: ${classification} (Percentil ${percentile})`;
    classificationDiv.className = 'classification-result';

    // Añadir clase según la clasificación
    if (classification === 'Superior' || classification === 'Excelente') {
        classificationDiv.classList.add('excellent-result');
    } else if (classification === 'Bueno' || classification === 'Aceptable') {
        classificationDiv.classList.add('good-result');
    } else {
        classificationDiv.classList.add('poor-result');
    }

    // MEJORA: Generar etiquetas para la barra de rango usando valores específicos del grupo de edad y género
    rangeLabels.innerHTML = `
        <span>${Math.floor(minVO2)}</span>
        <span>${Math.round((minVO2 + maxVO2) / 2)}</span>
        <span>${Math.ceil(maxVO2)}</span>
    `;

    // MEJORA: Posicionar el marcador en la barra con el rango específico
    const position = Math.min(Math.max((result - minVO2) / (maxVO2 - minVO2), 0), 1) * 100;
    marker.style.left = `${position}%`;

    // Generar filas de la tabla
    for (let i = 0; i < ageGroupData.length; i++) {
        const row = document.createElement('tr');
        const currentData = ageGroupData[i];

        // Resaltar la fila correspondiente a la categoría encontrada
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

    // Si el resultado es menor que el valor más bajo de la tabla
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

    // Mostrar la tabla de referencia
    referenceTable.style.display = 'block';
}

// Lander RM
document.getElementById('lander-calculate-btn').addEventListener('click', () => {
    const weightLifted = parseFloat(document.getElementById('lander-weight-lifted').value);
    const reps = parseInt(document.getElementById('lander-reps').value);
    const resultDiv = document.getElementById('lander-result');
    let result;

    if (!weightLifted || !reps) { alert('Por favor rellene todos los espacios.'); return; }

    result = (100 * weightLifted) / (101.3 - 2.67123 * reps);
    resultDiv.textContent = `El RM Maximo estimado es: ${result.toFixed(2)}`;
    resultDiv.style.display = 'block';
});

// Yo-Yo Test
document.getElementById('yoyo-calculate-btn').addEventListener('click', () => {
    const distance = parseFloat(document.getElementById('yoyo-distance').value);
    const resultDiv = document.getElementById('yoyo-result');
    let result;

    if (!distance) { alert('Por favor rellene todos los espacios.'); return; }
    if (distance < 0) { alert('Distance no puede ser negativa.'); return; }

    result = distance * 0.0084 + 36.4;
    resultDiv.textContent = `Su VO2Max es: ${result.toFixed(2)}`;
    resultDiv.style.display = 'block';
});

// Body Mass Index (BMI)
document.getElementById('bmi-system').addEventListener('change', (e) => {
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

document.getElementById('bmi-calculate-btn').addEventListener('click', () => {
    const system = document.getElementById('bmi-system').value;
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const heightInput = parseFloat(document.getElementById('bmi-height').value);
    const resultDiv = document.getElementById('bmi-result');
    let heightInInches;
    let result;

    if (!weight || !heightInput) { alert('Por favor rellene todos los espacios.'); return; }
    if (heightInput <= 0) { alert('La Estatura debe ser mayor a 0.'); return; }

    if (system === 'metric') {
        result = weight / (heightInput * heightInput);
    } else {
        heightInInches = heightInput * 12;
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

    resultDiv.textContent = `Su IMC es: ${result.toFixed(2)} - Categoría: ${category}`;
    resultDiv.style.display = 'block';
});