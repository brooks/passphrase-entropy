$(document).ready(function() {

  $('#password').on("input", function(){
    var eval = new Password($(this).val()).strength() * 2
    $('.meterbar').css('width', function(){
      return String(eval) + '%'
    });
    console.log(eval)
    if(eval < 25) {
        $('.meterbar').css('background', 'red')
      }
      if(eval >= 25) {
        $('.meterbar').css('background', 'yellow')
      }
      if(eval >= 40) {
        $('.meterbar').css('background', 'green')
      }
  });

  function Password(content) {
    this.content = content;
  };

  Password.prototype.letters = function(){
    if (this.content.match(/[a-z]/) && this.content.match(/[A-Z]/)) {
      return 52
    }
    else if (this.content.match(/[a-z]|[A-Z]/)){
      return 26
    }
    else {
      return 0
    }
  };

  Password.prototype.digits = function(){
    if(this.content.match(/\d/)){
      return 10
    }
    else {
      return 0
    }
  };

  Password.prototype.symbols = function(){
    if(this.content.match(/\W/)){
      return 33
    }
    else {
      return 0
    }
  };

  Password.prototype.count = function(){
    return this.letters() + this.digits() + this.symbols()
  };

  Password.prototype.length = function(){
    return this.content.length
  };

  Password.prototype.entropy = function(){
    return Math.log(Math.pow(this.count(), this.length()))/Math.log(2)
  };

  Password.prototype.logNormalized = function(){
    return 15.5 * Math.log(this.entropy() / 13.62)
  };

  Password.prototype.keyPattern = function(){
    KEY_PATTERNS = ["zxc", "cxz", "bnm", "mnb", "jkl", "lkj", "asd", "dsa", "qwe", "ewq", "iop", "poi"]
    for(var i = 0; i < KEY_PATTERNS.length; i++) {
      if(this.content.toLowerCase().indexOf(KEY_PATTERNS[i]) !== -1){
        return true
      }
    }
    return false
  };

  Password.prototype.numericalPattern = function(){
    characters = this.content.split('')
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

  Password.prototype.repetitious = function(){
    characters = this.content.split('')
    for(var i = 0; i < characters.length; i++) {
      if(characters[i] === characters[i + 1] && characters[i] === characters[i + 2]){
        return true
      }
    }
    return false
  };

  Password.prototype.common = function(){
    COMMON_PASSWORDS = ["password", "pass", "admin", "administrator", "trustnoi", "trustnol", "welcome", "master", "sunshine", "letmein", "jesus", "opensesame"]
    passwords = []
    passwords.push(this.content)
    if(this.content.match(/[@0|1$5]/)){
      passwords.push(this.content.replace('@', 'a').replace('0', 'o').replace(/[|1!]/, 'l').replace(/[$5]/, 's'))
      passwords.push(this.content.replace('@', 'a').replace('0', 'o').replace(/[|1!]/, 'i').replace(/[$5]/, 's'))
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

  Password.prototype.strength = function(){
    if(this.keyPattern() || this.numericalPattern() || this.repetitious() || this.common()) {
      return Math.round(this.logNormalized() * 0.5) 
    }
    return Math.round(this.logNormalized())
  };
});