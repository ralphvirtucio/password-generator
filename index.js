
// Initialize all the elements
const range = document.querySelector('#range');
const output = document.querySelector('#output');
const chkBoxes = document.querySelectorAll('[type="checkbox"]');
const form = document.querySelector('.form')
// const uppercaseChkbox = document.querySelector('#uppercase')
// const lowercaseChkbox = document.querySelector('#lowercase')
// const numberChkbox = document.querySelector('#number')
// const symbolChkbox = document.querySelector('#symbol')

// Initialize a array for balance selection
const selectedCharTypes = []

// Initialize a variable for filling up the remaining spots of the password
let charPool = ''

// 
let strengthCount = 0;

const characterTypes = {
  uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`"
}

const inclusionOptions = () => {
  const chkBoxArr = []

  chkBoxes.forEach(el => {
    chkBoxArr.push(el)
  })

  const updatedChkboxArr = chkBoxArr.map(val => {
    return {
      name: val.getAttribute('name'),
      value: val?.checked ? val.checked : false
    }
  })

  return updatedChkboxArr
}


const countPasswordStrength = () => {


  const passwordLength = range.value
  const characterOptions = inclusionOptions().filter(option => option.value);


  // if(passwordLength < 8 && passwordLength < 10 || ((passwordLength < 8 && passwordLength < 10) && characterOptions.length === 1)) {
  //   strengthCount += 1;
  // } else if (passwordLength > 8 && passwordLength < 10 || ((passwordLength > 8 && passwordLength < 10) && characterOptions.length === 2)) {
  //   strengthCount += 1;
  // } else if ((passwordLength > 10 && passwordLength < 12) && characterOptions.length === 3) {
  //   strengthCount += 1;
  // } else if (passwordLength > 12 && characterOptions.length === 4) {
  //   strengthCount += 1;
  // }



  

}

// To handle the changes in the input range
const handleInputRange = (e) => {
  const {min, max, value, style } = e.target;

  const computedBackgroundSize = ((value - min) / (max - min)) * 100 +"% 100%";

  // dynamic updates of the input range background size
  style.backgroundSize = computedBackgroundSize

  countPasswordStrength()

  // Set the range value to the output element
  output.textContent = value;

}

const handleInputChkbox = (e) => {
  const {name, checked} = e.target

  // Reset the character pool
  charPool = ''

  // Push the selected character types to selectedCharTypes array
  if(checked) {
    selectedCharTypes.push(name)
  } else {
    const index = selectedCharTypes.indexOf(name)
    selectedCharTypes.splice(index, 1);
  }

  // Include the selected character types in the character pool
  for(let i = 0; i < selectedCharTypes.length; i++) {
    charPool += characterTypes[selectedCharTypes[i]];
  }
}

const renderPassword = (generatedPassword) => {
  password.textContent = generatedPassword;
  password.classList.remove('unactive')
  password.classList.add('active')
}

const shufflePassword = (password) => {

  // Convert password to array using spread operator
  const arr = [...password];

  // Initialize the last index of the password
  let lastIndex = arr.length - 1;

  while(lastIndex > 0) {
    const randomIndex = Math.floor(Math.random() * lastIndex);

    // Swap the placement of characters in password
    let temp = arr[lastIndex];
    arr[lastIndex] = arr[randomIndex]
    arr[randomIndex] = temp

    lastIndex--;
  }

  return arr.join('');
}


// Generate a balance random characters 
const generateRandomChars = (length) => {
    let generatedChar = ''

    selectedCharTypes.forEach(type => {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterTypes[type].length)
        generatedChar += characterTypes[type][randomIndex]
      }
    })

    return generatedChar;
}

// Generate a random characters from Character Pool
const generateRandomCharInPool = (charLength, length) => {
    let generatedChar = ''

    for(let i = 0; i < charLength - length; i++) {
      const randomIndex = Math.floor(Math.random() * charLength);
      generatedChar += charPool[randomIndex]
    }

    return generatedChar;
}

const handleGeneratePassword = (e) => {
  e.preventDefault();

  const characterLength = range.value;
  
  let balancedPassword = '';

  // Calculate the portion length for balanced selection
  // Math.trunc: to avoid decimal point when dividing the character length and selected character types length
  const computedPortionLength = Math.trunc(characterLength / selectedCharTypes.length);
balancedPassword
  balancedPassword += generateRandomChars(computedPortionLength);

  // Check if theres still remaining password to fill in
  if(balancedPassword.length < characterLength) {
    // Generate a random characters based in the character pool
    balancedPassword += generateRandomCharInPool(characterLength, balancedPassword.length)
  }

  // Shuffle the password, making it less predictable and more secure
  const generatedPassword = shufflePassword(balancedPassword)

  renderPassword(generatedPassword)
} 


// EventListeners
form.addEventListener('submit', handleGeneratePassword)
range.addEventListener('input', handleInputRange)
chkBoxes.forEach(el => {
  el.addEventListener('change', handleInputChkbox)
})