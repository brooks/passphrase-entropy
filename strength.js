var strength = function(password){
  if(keyPattern(password) || numericalPattern(password) || repetitious(password) || common(password)) {
    return Math.round(logNormalized(password) * 0.5) 
  }
  return Math.round(logNormalized(password))
};

var logNormalized = function(password){
  return 15.5 * Math.log(entropy(password) / 13.62)
};

var entropy = function(password){
  return Math.log(Math.pow(count(password), length(password)))/Math.log(2)
};

var length = function(password){
  return password.length
};

var count = function(password){
  return letters(password) + digits(password) + symbols(password)
};

var letters = function(password){
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    return 52
  }
  else if (password.match(/[a-z]|[A-Z]/)){
    return 26
  }
  else {
    return 0
  }
};

var digits = function(password){
  if(password.match(/\d/)){
    return 10
  }
  else {
    return 0
  }
};

var symbols = function(password){
  if(password.match(/\W/)){
    return 33
  }
  else {
    return 0
  }
};

var keyPattern = function(password){
  KEY_PATTERNS = ["zxc", "cxz", "bnm", "mnb", "jkl", "lkj", "asd", "dsa", "qwe", "ewq", "iop", "poi"]
  for(var i = 0; i < KEY_PATTERNS.length; i++) {
    if(password.toLowerCase().indexOf(KEY_PATTERNS[i]) !== -1){
      return true
    }
  }
  return false
};

var numericalPattern = function(password){
  characters = password.split('')
  for (var i = 0; i < characters.length; i++) {
    if(parseInt(characters[i + 1]) === (parseInt(characters[i]) + 1) && parseInt(characters[i + 2]) === (parseInt(characters[i]) + 2) && parseInt(characters[i + 3]) === (parseInt(characters[i]) + 3)){
      return true
    }
    if(parseInt(characters[i + 1]) === (parseInt(characters[i]) - 1) && parseInt(characters[i + 2]) === (parseInt(characters[i]) - 2) && parseInt(characters[i + 3]) === (parseInt(characters[i]) - 3)){
      return true
    }
  }
  return false
};

var repetitious = function(password){
  characters = password.split('')
  for(var i = 0; i < characters.length; i++) {
    if(characters[i] === characters[i + 1] && characters[i] === characters[i + 2]){
      return true
    }
  }
  return false
};


var common = function(password){
  COMMON_PASSWORDS = ["password", "pass", "word", "admin", "administrator", "trustnoi", "trustnol", "welcome", "master", "sunshine", "letmein", "jesus", "opensesame"]
  passwords = []
  passwords.push(password)
  if(password.match(/[@0|1$5]/)){
    passwords.push(password.replace('@', 'a').replace('0', 'o').replace(/[|1!]/, 'l').replace(/[$5]/, 's'))
    passwords.push(password.replace('@', 'a').replace('0', 'o').replace(/[|1!]/, 'i').replace(/[$5]/, 's'))
  }
  for(var i = 0; i < COMMON_PASSWORDS.length; i++) {
    for(var x = 0; x < passwords.length; x++) {
      if(passwords[x].toLowerCase().indexOf(COMMON_PASSWORDS[i]) !== -1){
        return true
      }
    }
  }
  return false
};







