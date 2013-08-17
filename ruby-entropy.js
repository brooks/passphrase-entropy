$(document).ready(function() {

  $('#new-passphrase, #confirm-passphrase').on("input keydown change", function(){
    
    var eval = new Password($('#new-passphrase').val()).strength()
    $('#strength').html('Weak')
    $('.meterbar').css('width', function(){
      return String(eval) + '%'
    });
    if(eval < 20) {
      $('.meterbar').css('background', 'red')
      $('#strength').css('color', 'red')
    }    
    else if(eval >= 20 && eval < 40) {
      $('.meterbar').css('background', 'goldenrod')
      $('#strength').css('color', 'goldenrod')
      $('#strength').html('Getting Stronger')
    }
    else if(eval >= 40 && eval < 60) {
      $('.meterbar').css('background', '#B6D602')
      $('#strength').css('color', '#B6D602')
      $('#strength').html('Almost There!')
    }
    else if(eval >= 60 && eval < 80) {
      $('.meterbar').css('background', '#02D61E')
      $('#strength').css('color', '#02D61E')
      $('#strength').html('Secure')
    }
    else if(eval >= 80) {
      $('.meterbar').css('background', '#F54EAF')
      $('#strength').css('color', '#F54EAF')
      $('#strength').html('Impenetrable')      
    }
    if($('#confirm-passphrase').val()==$('#new-passphrase').val()){
      $('#match').html('Confirmed')
      $('#match').css('color', $('#strength').css('color'))
    }
    else{
      $('#match').html('Please Verify')
      $('#match').css('color', 'red')
    }
    if(eval < -100) {
      $('.meterbar').css('width', '0%')
      $('#strength, #match').html('')
    }
    if(eval >=60 && $('#confirm-passphrase').val()==$('#new-passphrase').val()){
      $('#create_passphrase_button').removeAttr('disabled')
    }
    else {
      $('#create_passphrase_button').attr('disabled', 'disabled')
    }
  });

  $('#confirm_email').on('input', function(){
    if($(this).val() == '') {
      $('#confirm_email_button').attr('disabled', 'disabled')
    }
    else {
      $('#confirm_email_button').removeAttr('disabled')
    }
  });

  COMMON_PASSWORDS = ["admin", "administrator", "jesus", "letmein", "master", "open sesame", "opensesame", "password", "sunshine", "trustnoi", "trustnol", "welcome"]
  KEY_PATTERNS = ["zxc", "cxz", "bnm", "mnb", "jkl", "lkj", "asd", "dsa", "qwe", "ewq", "iop", "poi"]
        
  // a method to count the number of occurences of a character in an array

  var counter = function(array, num){
    var counter = 0;
    for(var i = 0; i < array.length; ++i){
      if(array[i] == num) {
        counter++;
      }
    }
    return counter
  };

  function Password(content) {
    this.content = content;
    
    // the following functions define raw entropy score:
    // a Fx of password length & num of available characters

    this.letters = function(){
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

    this.digits = function(){
      if(this.content.match(/\d/)){
        return 10
      }
      else {
        return 0
      }
    };

    this.symbols = function(){
      if(this.content.match(/\W/)){
        return 33
      }
      else {
        return 0
      }  
    };

    this.count = function(){
      return this.letters() + this.digits() + this.symbols()
    };

    this.length = function(){
      return this.content.length
    };

    this.entropy = function(){
      return Math.log(Math.pow(this.count(), this.length()))/Math.log(2)
    };

    // the following functions are tests for weak passwords

    this.keyPattern = function(){
      for(var i = 0; i < KEY_PATTERNS.length; i++) {
        if(this.content.toLowerCase().indexOf(KEY_PATTERNS[i]) !== -1){
          return true
        }
      }
      return false
    };

    this.numericalPattern = function(){
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

    this.repetitious = function(){
      characters = this.content.split('')
      for(var i = 0; i < characters.length; i++) {
        if(characters[i] === characters[i + 1] && characters[i] === characters[i + 2]){
          return true
        }
      }
      return false
    };

    this.common = function(){
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

    this.uniqueContent = function(){
      var uniqueArray = []
      var contentArray = this.content.toLowerCase().split('')
      for(var i = 0; i < contentArray.length; i++) {
        if(uniqueArray.indexOf(contentArray[i]) === -1) {
          uniqueArray.push(contentArray[i])
        }
      }
      return uniqueArray
    };

    this.uniqueness = function(){
      var unique = (this.uniqueContent().length / this.length()) < 0.4 ? true : false
      return unique
    };

    this.repeaters = function(){
      mode = []
      var contentArray = this.content.toLowerCase().split('')
      var uniqueArray = this.uniqueContent()
      for(var i = 0; i < uniqueArray.length; i++) {
        mode.push(counter(contentArray, uniqueArray[i])) 
      }
      var max = Math.max.apply(Math, mode);
      for(var i = max; i > 1; i--) {
        if((counter(mode, i)/mode.length) > 0.75) {
          return true
        }
      }
      return false
    };

    // multiplies the entropy score by a multiplier for failing above tests

    this.badPasswordMultiplier = function(){
      if(this.repeaters() || this.uniqueness()) {
        return 0.1
      }
      else if(this.keyPattern() || this.numericalPattern() || this.repetitious() || this.common()) {
        var mult = (this.content.length < 12) ? 0.5 : 0.75
        return mult
      }
      else{
        return 1
      }
    };

    // password strength accounts for raw entropy + failure of tests

    this.strength = function(){
      return 31 * this.badPasswordMultiplier() * Math.log(this.entropy() / 13.62)
    };
  };
});