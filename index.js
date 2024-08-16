
// Initialize all the elements
const range = document.querySelector('#range');
const output = document.querySelector('#output');
const chkBoxes = document.querySelectorAll('[type="checkbox"]');
const form = document.querySelector('.form')
const uppercaseChkbox = document.querySelector('#uppercase')
const lowercaseChkbox = document.querySelector('#lowercase')
const numberChkbox = document.querySelector('#number')
const symbolChkbox = document.querySelector('#symbol')
const scaleLabel = document.querySelector('.password-scale__label')
const scales = document.querySelectorAll('.scale')
const scaleContainer = document.querySelector('[data-password-strength]')
const generateBtn = document.querySelector('.btn__submit')
const password = document.querySelector('#password')
const copyButton = document.querySelector('.btn__copy')
const dialog = document.querySelector('dialog')
const dialogMsg = document.querySelector('.dialog-msg')
const body = document.querySelector('body')


// Initialize a array for balance selection
const selectedCharTypes = []

// Initialize a variable for filling up the remaining spots of the password
let charPool = ''


const characterTypes = {
  uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`"
}

// Closing the dialog by clicking the body element
const handleDialogClose = () => {
    dialog.close()
}

const renderDialog = (message, classStyle) => {
  dialog.showModal();
  dialog.classList.remove('error')
  dialogMsg.textContent = message

  setTimeout(() => {
    dialog.close()
  }, 3000)
}

const renderInvalidDialog = (message) => {
  dialog.showModal();
  dialog.classList.add('error')
  dialogMsg.textContent = message

  setTimeout(() => {
    dialog.close()
  }, 3000)
}



const handleCopyButton = async () => {
  try {
    const value = password.textContent
    if(value !== 'P4$5W0rD!') {
      await navigator.clipboard.writeText(value)
      renderDialog('Successfully copied to clipboard!')
    }
  } catch(error) {
    renderInvalidDialog("Something went wrong: " + error.message)
  }
}

// To handle the changes in the input range
const handleInputRange = (e) => {
  const {min, max, value, style } = e.target;

  const computedBackgroundSize = ((value - min) / (max - min)) * 100 +"% 100%";

  // dynamic updates of the input range background size
  style.backgroundSize = computedBackgroundSize


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

const calculateEntropy = (password) => {
  const arr = [...password]

  let total = 0;
  let hasUpperCase =  false;
  let hasLowerCase =  false;
  let hasNumberCase =  false;
  let hasSymbolCase =  false;

  arr.forEach(char => {
    if(characterTypes.lowercase.includes(char)) {
      hasLowerCase = true
    } else if(characterTypes.uppercase.includes(char)) {
      hasUpperCase = true
    } else if(characterTypes.numbers.includes(char)) {
      hasNumberCase = true
    } else if(characterTypes.symbols.includes(char)) {
      hasSymbolCase = true
    }
  })
  

  if(hasLowerCase) {
    total += 26
  }
  if(hasUpperCase) {
    total += 26
  }
  if(hasNumberCase) {
    total += 10
  }
  if(hasSymbolCase) {
    total += 26
  }

  const entropy = password.length * Math.log2(total);

  const truncatedEntropy = Math.trunc(entropy)


  return truncatedEntropy

}

const validatePasswordStrength = (computedEntropy) => {
  if(computedEntropy < 56) {
    scaleLabel.textContent = 'Too Weak!'
    scaleContainer.dataset.passwordStrength = 'tooweak'
    scales[0].classList.add('tooweak')
  } else if(computedEntropy >= 56  && computedEntropy <= 81) {
    scaleLabel.textContent = 'Weak'
    scaleContainer.dataset.passwordStrength = 'weak'
  
    scales[0].classList.add('weak')
    scales[1].classList.add('weak')


  } else if (computedEntropy >= 81 && computedEntropy <= 111) {
    scaleLabel.textContent = 'Medium'
    scaleContainer.dataset.passwordStrength = 'medium'

    scales[0].classList.add('medium')
    scales[1].classList.add('medium')
    scales[2].classList.add('medium')


  } else if (computedEntropy > 111) {
    scaleLabel.textContent = 'Strong'
    scaleContainer.dataset.passwordStrength = 'strong'

    scales[0].classList.add('strong')
    scales[1].classList.add('strong')
    scales[2].classList.add('strong')
    scales[3].classList.add('strong')
  }
}

const handleGeneratePassword = (e) => {
  e.preventDefault();
  const characterLength = range.value;

  if(selectedCharTypes.length === 0 || characterLength === 0) {
    renderInvalidDialog('Please select an length and inclusion')
    return;
  }
  
  let balancedPassword = '';
  scaleLabel.textContent = ''

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

  const computedEntropy = calculateEntropy(generatedPassword)

  // Removing the class to avoid overlapping of the class which make the other strength bar bg not work
  scales.forEach(el => {
    if(el.classList.contains(scaleContainer.dataset.passwordStrength)) {
      el.classList.remove(scaleContainer.dataset.passwordStrength)
    }
  })
  
  validatePasswordStrength(computedEntropy)
 
  renderPassword(generatedPassword)
} 


// EventListeners

form.addEventListener('submit', handleGeneratePassword)
range.addEventListener('input', handleInputRange)
chkBoxes.forEach(el => {
  el.addEventListener('change', handleInputChkbox)
})
copyButton.addEventListener('click', handleCopyButton);

body.addEventListener('click', handleDialogClose)