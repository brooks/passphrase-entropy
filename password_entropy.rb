require 'ruby-dictionary'

class Password

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

  #consider using these as well...

  def sentence?
    @password.gsub(/\s\s+/, ' ').strip.count(' ') > 1 && length > 10
  end

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

end

test_pass = Password.new("V@riab1e")
sky_pass = Password.new("the force is lucid on westward mornings")
key_pass = Password.new('asdfgh')
num_pass = Password.new("12345brooks!")

puts '=========='

puts test_pass.entropy
puts sky_pass.entropy

puts '=========='

puts test_pass.numerical_pattern?
puts num_pass.numerical_pattern?

puts '=========='

puts test_pass.key_pattern?
puts key_pass.key_pattern?



  