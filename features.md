# Features

- Generating Random Password
  - function for generating a balance inclusion of the options provided
  - function to shuffle the password to generate more complex password using Fisher Yates method

- User can set the characters length
    - Using the input slider users can adjust the passwords length

- User can include a uppercase letters
- User can include a lowercase letters
- User can include a numbers
- User can include a symbols
    - Using the checkbox user can include numbers, symbols and uppercase, lowercase letters.

- User can view the strength of the generated password
    - By calculating the strength of the password which involves length and complexity, user can view what is the strength of the generated password

      Too Weak Password
        - Length Less than 8 characters
        - Only uses one type of character
          e.g, lowercase or numbers
        - Low entropy < 40bits
      
      Weak
        - Length 8-10 characters
        - Only uses two types of characters
             e.g, lowercase or numbers
             but lacks diversity
        - Predictable might include a dictionary words or slight variations
        - Low entropy < 40bits
      
      Medium
        - Length  10 - 12 characters
        - Uses at least three types of characters
        - Moderate Predictability
        - Randomness
        - Moderate entropy 40-60 bits

      Strong
        - Length 12+ characters
        - Uses all four types of characters
        - Unpredicatable
        - High entropy > 60 bits

- User can copy the generated password

