const range = document.querySelector('#range');
const output = document.querySelector('#output')

range.addEventListener('input', (e) => {

  const { target } = e
 
  const min = target.min;
  const max = target.max;
  const currentVal = target.value;

  output.textContent = target.value;

  range.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 +"% 100%"
})