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
            let result;

            if (!age || !weight || !hr || !timeInput) { alert('Please enter all values.'); return; }
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
            resultDiv.textContent = `Su VO2Max es: ${result.toFixed(3)}`;
            resultDiv.style.display = 'block';
        });

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