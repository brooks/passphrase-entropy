var strength = function(password){
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

