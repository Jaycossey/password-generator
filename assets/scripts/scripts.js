// GLOBALS--------------------------------------------------------
const TEXT_DISPLAY = document.getElementById('instructions');
const INPUT = document.getElementById('length-input');
const GENERATE_BUTTON = document.getElementById('generate');

// validation regex
/**
 * As regex is complex, I will quickly explain each section of this:
 * ^ caret indicates beginning of the string
 * ?= positive lookahead assertion, checking ahead for other matches
 * .* matches any character 0 or more times
 * followed by [a-z] / [!-\/] character searches
 * \d indicates a search for integers
 * {2} at least 2 of those parameters
 * \ is the escape character to allow special / reserved keys
 */
const REGEX = /^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[!-\/]){2})/;

// desired length of password
let desiredLength = 16;

// password character array
let characterArray;

// final valid password
let finalPassword;


// FUNCTION DECLARATIONS ---------------------------------------
// validate length is correct
function validateLength() {
    INPUT.style.boxShadow = "0 0 0";
    // if length is correct, generate password
    if (INPUT.value >= 16 && INPUT.value <= 32) {
        desiredLength = INPUT.value;
        generate(desiredLength);
    // else alert user
    } else {
        INPUT.style.boxShadow = "5px 5px 5px red";
        return;
    } 
}

// generate dependant on length
function generate(length) {
    // assign empty array
    characterArray = [];

    // loop for desired password length
    for (let i = 0; i < length; i++) {
        // create random ascii value
        let randomAscii = Math.floor(Math.random() * (122 - 33)) + 33;
        // ensure no potential special characters
        if (randomAscii >= 90 && randomAscii <= 96) {
            randomAscii += 7;
        }
        // push character to array
        characterArray.push(String.fromCharCode(randomAscii));
    }
    // ensure password meets requirements
    validate();
}

// validate the password with regex
function validate() {
    // create temporary string to validate with regex
    let tempString = "";

    // assign characters to string
    for (let i = 0; i < characterArray.length; i++) {
        tempString += characterArray[i];
    }

    // print to screen if valid
    if (tempString.match(REGEX)) {
        finalPassword = tempString;
        displayPassword();
    // else regenerate
    } else {
        generate(desiredLength);
    }
}

// display the password on screen after generation
function displayPassword() {
    TEXT_DISPLAY.innerText = "Your new password is: \n";
    for (let i = 0; i < finalPassword.length; i++) {
        setTimeout(() => {
            TEXT_DISPLAY.innerText += finalPassword[i];
        }, i * 40);
    }
}


// FUNCTION CALLS AND EVENT HANDLERS ------------------------------