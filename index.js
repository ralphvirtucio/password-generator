const range = document.querySelector('#range');
const output = document.querySelector('#output')
const form = document.querySelector('.form');
const checkboxes = document.querySelectorAll('[type="checkbox"]');
const password = document.querySelector('#password')
const strengthRating = document.querySelector('#strength-rating__label')
const ratings = document.querySelectorAll('.rating')

const selectedChars = []
let charPool = ''

const inclusionOptions = {
  uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`"
}

const strengthStates = ['too weak', 'weak', 'medium', 'strong']
// const strengthStates = {}

const handleInputRange = (e) => {
  const { target } = e
 
  const min = target.min;
  const max = target.max;
  const currentVal = target.value;
  
  output.textContent = target.value;

  range.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 +"% 100%"
}


const handleCheckbox = (e) => {
  const {name, checked} = e.target
  charPool = ''
  if(checked) {
    selectedChars.push(name)
  } else {
    const index = selectedChars.indexOf(name)
    selectedChars.splice(index, 1)
  }
  
  for(let i = 0; i < selectedChars.length; i++) {
    charPool += inclusionOptions[selectedChars[i]];
  }

 
}

checkboxes.forEach(el => {
  el.addEventListener('change', handleCheckbox)
})

const shufflePassword = (password) => {

  const arrPassword = [...password]
  let i = arrPassword.length - 1
  while(i > 0) {
    const randomIndex = Math.floor(Math.random() * i);
    let temp = arrPassword[i]
    arrPassword[i] = arrPassword[randomIndex]
    arrPassword[randomIndex] = temp;
    i--;
  }

  return arrPassword.join('')
}

const handleSubmit = (e) => {
  e.preventDefault();
  let generatedPassword = '';

  const computedPortionLength = Math.trunc(range.value / selectedChars.length)

  const portionLength = isNaN(computedPortionLength) ? 0 : computedPortionLength

  selectedChars.forEach(char => {
    for(let i = 0; i < portionLength; i++) {
      const randomIndex = Math.floor(Math.random() * inclusionOptions[char].length)
      generatedPassword += inclusionOptions[char][randomIndex]
    }
  })

  if(generatedPassword.length < range.value) {
    for(let i = 0; i < range.value - generatedPassword.length; i++) {
        const randomIndex = Math.floor(Math.random() * range.value);
        generatedPassword += charPool[randomIndex]
    }
  }

  let ratingCount = 0


  // strengthStates.forEach((state, i) => {
  //   console.log(state, i)
  // })
  //  ** IMPORTANT
  if(range.value >= 1 && range.value < 5 ) {
    strengthRating.textContent = strengthStates[ratingCount] + "!"
    ratings[ratingCount].classList.add(strengthStates[ratingCount].replace(" ", ""))
  } else if (range.value >= 5 && range.value < 10) {
    strengthRating.textContent = 'Weak'
    console.log(ratingCount)
  } else if (range.value >= 10 && range.value < 15) {
    strengthRating.textContent = 'Medium'
  } else if (range.value >= 15 && range.value < 20) {
    strengthRating.textContent = 'Strong'
  } else {
    strengthRating.textContent = ''
  }


  
  password.textContent = shufflePassword(generatedPassword)
  password.classList.remove('unactive')
  password.classList.add('active')
}

form.addEventListener('submit', handleSubmit)
range.addEventListener('input', handleInputRange)
