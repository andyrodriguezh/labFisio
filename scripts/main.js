import { initQueensCalculator } from './calculators/queens.js';
import { initRockportCalculator } from './calculators/rockport.js';
import { initLanderCalculator } from './calculators/lander.js';
import { initYoYoCalculator } from './calculators/yoyo.js';
import { initBmiCalculator } from './calculators/bmi.js';
import { initDurninCalculator } from './calculators/durnin.js';

document.addEventListener('DOMContentLoaded', () => {
    initQueensCalculator();
    initRockportCalculator();
    initLanderCalculator();
    initYoYoCalculator();
    initBmiCalculator();
    initDurninCalculator();
});
