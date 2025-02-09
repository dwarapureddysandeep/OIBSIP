document.addEventListener('DOMContentLoaded', () => {
  const temperatureInput = document.getElementById('temperature');
  const convertBtn = document.getElementById('convert-btn');
  const errorDiv = document.getElementById('error');
  const resultDiv = document.getElementById('result');
  const resultValue = document.querySelector('.result-value');
  const unitButtons = document.querySelectorAll('.unit-btn');

  let selectedUnit = 'celsius';

  // Unit button click handlers
  unitButtons.forEach(button => {
    button.addEventListener('click', () => {
      unitButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedUnit = button.dataset.unit;
    });
  });

  // Convert button click handler
  convertBtn.addEventListener('click', () => {
    const temperature = parseFloat(temperatureInput.value);
    
    // Reset previous results
    errorDiv.textContent = '';
    resultDiv.classList.add('hidden');
    
    // Validate input
    if (isNaN(temperature)) {
      errorDiv.textContent = 'Please enter a valid number';
      return;
    }

    const results = [];
    
    // Perform conversions based on selected unit
    if (selectedUnit === 'celsius') {
      const fahrenheit = (temperature * 9/5) + 32;
      const kelvin = temperature + 273.15;
      results.push(`${fahrenheit.toFixed(2)}°F`);
      results.push(`${kelvin.toFixed(2)}K`);
    } else if (selectedUnit === 'fahrenheit') {
      const celsius = (temperature - 32) * 5/9;
      const kelvin = (temperature - 32) * 5/9 + 273.15;
      results.push(`${celsius.toFixed(2)}°C`);
      results.push(`${kelvin.toFixed(2)}K`);
    } else {
      const celsius = temperature - 273.15;
      const fahrenheit = (temperature - 273.15) * 9/5 + 32;
      results.push(`${celsius.toFixed(2)}°C`);
      results.push(`${fahrenheit.toFixed(2)}°F`);
    }

    // Display results
    resultValue.textContent = results.join(' / ');
    resultDiv.classList.remove('hidden');
  });

  // Add keyboard support
  temperatureInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      convertBtn.click();
    }
  });
});