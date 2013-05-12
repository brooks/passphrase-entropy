require 'ruby-dictionary'

class Password

  attr_reader :password
  
  #lowercase passwords only
  COMMON_PASSWORDS = ["password", "pass", "admin", "administrator", "trustnoi", "trustnol", "welcome", "master", "sunshine", "letmein", "jesus", "opensesame"]
  KEY_PATTERNS = ["zxc", "cxz", "bnm", "mnb", "jkl", "lkj", "asd", "dsa", "qwe", "ewq", "iop", "poi"]

  def initialize(password)
    @password = password
    @passwords = []
  end

  def entropy
    Math.log2(count ** length)
  end

  def log_normalized
    15.5 * Math.log(entropy / 13.62)
  end

  def strength
     key_pattern? || numerical_pattern? || repetitious? || common? ? (log_normalized * 0.5).round : log_normalized.round
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

  def key_pattern?
    KEY_PATTERNS.each { |pattern| return true if @password.downcase.include?(pattern) }
    false
  end

  def numerical_pattern?
    pattern = @password.split('').map(&:to_i)
    pattern.each_with_index do |num, index|
      return true if pattern[index + 1] == num + 1 && pattern[index + 2] == num + 2 && pattern[index + 3] == num + 3
      return true if pattern[index + 1] == num - 1 && pattern[index + 2] == num - 2 && pattern[index + 3] == num - 3
    end
    false
  end

  def repetitious?
    characters = @password.split('')
    characters.each_with_index do |character, index|
      return true if characters[index + 1] == character && characters[index + 2] == character
    end
    false
  end

  def common?
    @passwords << @password
    if @password.match(/[@0|1$5]/)
      @passwords << @password.gsub('@', 'a').gsub('0', 'o').gsub(/[|1!]/, 'l').gsub(/[$5]/, 's')
      @passwords << @password.gsub('@', 'a').gsub('0', 'o').gsub(/[|1!]/, 'i').gsub(/[$5]/, 's')
    end
    COMMON_PASSWORDS.each do |commoner|
      @passwords.each { |password| return true if password.downcase.include?(commoner.downcase) }
    end
    false
  end
end

tst = Password.new("V@riab1e")
sky = Password.new("the force is lucid on westward mornings")
wrd = Password.new("trustno1")
key = Password.new('asdfgh')
num = Password.new("12345neko!")
rep = Password.new("123aaa#B")
cmn = Password.new("@dm!n|strat0r's p@5$w0rd")

puts '====STRENGTH===='

puts "#{tst.password}: #{tst.strength}"
puts "#{sky.password}: #{sky.strength}"
puts "#{wrd.password}: #{wrd.strength}"
puts "#{key.password}: #{key.strength}"
puts "#{num.password}: #{num.strength}"
puts "#{rep.password}: #{rep.strength}"
puts "#{cmn.password}: #{cmn.strength}"