require 'ruby-dictionary'

class Password

  attr_reader :password

  COMMON_PASSWORDS = ["password", "admin", "pass", "opensesame"]

  def initialize(password)
    @password = password
  end

  def entropy
    Math.log2(count ** length)
  end

  def length
    @password.length
  end

  def letters
    26 if @password.match(/[a-z]|[A-Z]/)
  end
   
  def multiple_cases
    26 if @password.match(/[a-z]/) && @password.match(/[A-Z]/)
  end

  def digits
    10 if @password.match(/\d/) 
  end

  def symbols
    33 if @password.match(/\W/)
  end

  def count
    letters.to_i + multiple_cases.to_i + digits.to_i + symbols.to_i
  end

  #consider using these as auto failures...

  def word?
    @dictionary = Dictionary.from_file('words.txt')
    @dictionary.exists?(@password)
  end

  def key_pattern?
    @key_patterns = Dictionary.from_file('key_patterns.txt')
    @key_patterns.exists?(@password)
  end

  def numerical_pattern?
    pattern = @password.split('').map(&:to_i)
    pattern.each_with_index do |num, index|
      return true if pattern[index + 1] == num + 1 && pattern[index + 2] == num + 2 && pattern[index + 3] == num + 3
      return true if pattern[index + 1] == num - 1 && pattern[index + 2] == num - 2 && pattern[index + 3] == num - 3
    end
    false
  end
    #compare to asc or desc digits greater than 3 characters

  def repetitious?
    characters = @password.split('')
    characters.each_with_index do |character, index|
      return true if characters[index + 1] == character && characters[index + 2] == character
    end
    false
  end

  def common?
    COMMON_PASSWORDS.include?(@password.downcase)
  end

end

tst = Password.new("V@riab1e")
sky = Password.new("the force is lucid on westward mornings")
wrd = Password.new("antifogmatic")
key = Password.new('asdfgh')
num = Password.new("12345neko!")
rep = Password.new("123aaa#B")
cmn = Password.new("opensesame")

puts '====ENTROPY SCORE===='

puts "#{tst.password}: #{tst.entropy.round(1)}"
puts "#{sky.password}: #{sky.entropy.round(1)}"
puts "#{wrd.password}: #{wrd.entropy.round(1)}"
puts "#{key.password}: #{key.entropy.round(1)}"
puts "#{num.password}: #{num.entropy.round(1)}"
puts "#{rep.password}: #{rep.entropy.round(1)}"
puts "#{cmn.password}: #{cmn.entropy.round(1)}"
puts ""

puts '====DICTIONARY WORDS===='

puts "#{tst.password}: #{tst.word?}"
puts "#{wrd.password}: #{wrd.word?}"
puts ""

puts '====KEYBOARD PATTERNS===='

puts "#{tst.password}: #{tst.key_pattern?}"
puts "#{key.password}: #{key.key_pattern?}"
puts ""

puts '====NUMBER PATTERNS===='

puts "#{tst.password}: #{tst.numerical_pattern?}"
puts "#{num.password}: #{num.numerical_pattern?}"
puts ""

puts '====REPETITIOUS CHARACTERS===='

puts "#{tst.password}: #{tst.repetitious?}"
puts "#{rep.password}: #{rep.repetitious?}"
puts ""

puts '====COMMON PASSWORDS===='

puts "#{tst.password}: #{tst.common?}"
puts "#{cmn.password}: #{cmn.common?}"
  