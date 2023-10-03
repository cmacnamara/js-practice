/* Find the largest even number that can be obtained by summing 
    numbers from the given array. Each array element can only be added once.
 */
const testNums = [1, 2, 1, 4, 3]
const testNums2 = [4, -1, 2, 3, 4]

const maxEvenSum = nums => {
  if(nums.length === 0) return 0
  if(nums.length === 1) return nums[0]

  let maxSum = nums[0]
  let currentSum = nums[0]

  for(let i = 1; i < nums.length; i++) {
    currentSum = maxSum + nums[i]
    maxSum = Math.max(maxSum, currentSum)
  }

  if(maxSum % 2 === 0) return maxSum

  let smallestOddNum = Infinity

  for(let i = 0; i < nums.length; i++) {
    if(Math.abs(nums[i]) < smallestOddNum && nums[i] % 2 !== 0)
      smallestOddNum = Math.abs(nums[i])
  }

  if(smallestOddNum !== 0) return maxSum - smallestOddNum
  else return 0
}

//console.log("Max Even Sum: ", maxEvenSum(testNums));
//console.log("Max Even Sum: ", maxEvenSum(testNums2));

/*----------------------------------------------------------------------------------------*/
/*
Determine which letter triplet does not belong based on the differences between their letters

E.g. [A,B,C] has letter differences of 1 and 1
      [B,C,D] also has letter differences of 1 and 1
      [B,D,C] has letter differences of 2, -1 and should be returned
*/

const testTriplets = [['A', 'B', 'C'], ['B', 'C', 'D'], ['B', 'D', 'C']]
const testTriplets2 = [['C', 'E', 'G'], ['X', 'Y', 'Z'], ['K', 'M', 'O']]

const generateDifferences = triplet => {
  const differences = []
  for(let i = 1; i < triplet.length; i++) {
    differences.push(triplet[i].charCodeAt(0) - triplet[i - 1].charCodeAt(0))
  }
  return differences
}

const arrayExists = (arraysObject, differences) => {
  const keys = Object.keys(arraysObject)
  if(keys.length === 0) return false
  let exists = false
  const differencesString = differences.join(",")
  keys.forEach(key => {
    if(key === differencesString) {
      exists = true
    }
  })
  return exists
}

const generateDifferenceTally = triplets => {
  const differenceArrayTally = {}
  triplets.forEach(triplet => {
    const differences = generateDifferences(triplet)

    if(arrayExists(differenceArrayTally, differences)) {
      differenceArrayTally[differences] = [...differenceArrayTally[differences], [...triplet]]
    }
    else differenceArrayTally[differences] = [[...triplet]]
  })
  return differenceArrayTally
}

const findOutlier = differenceArrayTally => {
  for(tally in differenceArrayTally) {
    if(differenceArrayTally[tally].length === 1) return differenceArrayTally[tally][0]
  }
  return null
}

const getOutlierTriplet = triplets => {
  const differenceArrayTally = generateDifferenceTally(triplets)
  return findOutlier(differenceArrayTally)
}

//console.log("Outlier is: ", getOutlierTriplet(testTriplets2));

/*----------------------------------------------------------------------------------------*/

/*
 * Question: An array and a number A is given. Determine if any two numbers within the array sum to A.
 */

const numbersTest = [1, 3, 4, 2, 2, 1, 6]

const twoSum = (numbers, target) => {
  for(let i = 0; i < numbers.length; i++) {
    if(numbers.includes(target - numbers[i]) && numbers.indexOf(target - numbers[i]) !== i)
      return true
  }
  return false
}

//console.log("Two Sum is possible: ", twoSum(numbersTest, 11))

/*----------------------------------------------------------------------------------------*/

/*
 * Question: An array of characters and a string B is given. Write a function to return the string B with all the characters from the array removed.
 */

const charsTest = ['a', 'o', 'r'] 
const strTest = 'The quick brown fox jumped over the lazy dog.'

const removeChars = (characters, str) => {
  const splitString = str.split('')
  let newString = ''
  splitString.forEach(character => {
    if(!characters.includes(character.toLowerCase())) {
      newString = newString + character
    }
  })
  return newString
}

//console.log(removeChars(charsTest, strTest))

/*----------------------------------------------------------------------------------------*/

/*
 * Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)
 */

function humanReadable (secondsArg) {
  const hours = Math.floor(secondsArg / (60 * 60))
  const remainder = secondsArg % (60 * 60)
  const minutes = Math.floor(remainder / 60)
  const seconds = remainder % 60
  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

//console.log(humanReadable(45296))

/*----------------------------------------------------------------------------------------*/

/*
 * Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

  Pseudocode:
  1. Check argument for empty string and return empty array 
  2. Construct new string based on lowercase version of argument only composed of lowercase characters and apostrophes. Other characters will return a whitespace
  3. Split new string by white space
  4. Create empty object to hold word tallies
  5. Loop through array of words and tally them up
  6. Sort of the object by tallies, returning up to 3 top tallied responses. 
 */

const topThreeTest1 = "In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing. An olla of rather more beef than mutton, a salad on most nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra on Sundays, made away with three-quarters of his income."

function isAcceptableChar(character) {
  const acceptableChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '\'']
  if(acceptableChars.includes(character)) return true
  return false
}

function topThreeWords(text) { 
  if(text.length === 0) return []

  const lowerCaseVersion = text.toLowerCase()
  let newText = ''

  for(let i = 0; i < lowerCaseVersion.length; i++) {
    if(isAcceptableChar(lowerCaseVersion[i])) {
      newText = newText + lowerCaseVersion[i]
    } else if(i > 0 && i !== lowerCaseVersion.length - 1 && newText[newText.length-1] !== ' ') {
      newText = newText + ' '
    }
  }

  const words = newText.split(' ')

  const wordTallies = {}

  words.forEach(word => {
    if(wordTallies[word]) wordTallies[word] += 1
    else wordTallies[word] = 1
  })

  let sortableTallies = []

  for(let word in wordTallies) {
    sortableTallies.push([word, wordTallies[word]])
  }

  sortableTallies.sort(function(a,b) {
    return b[1] - a[1]
  })

  if(sortableTallies.length === 1) return [sortableTallies[0][0]]
  else if(sortableTallies.length === 2) return [sortableTallies[0][0], sortableTallies[1][0]]
  else return [sortableTallies[0][0], sortableTallies[1][0], sortableTallies[2][0]]
}

//console.log(topThreeWords(topThreeTest1))

/*----------------------------------------------------------------------------------------*/

/*
 * Given an unordered array of integers, write a program that finds a contiguous subarray whose sum is equal to the given one.

  Pseudocode:
  1. Check for empty array
  2. Check to see that all elements are integers
  3. Loop through each element and check if that element equals the sum
  4. Loop through each subsequent element adding them on to the current sum and check if equal to given sum
  4a. If equals sum, return array from i to j
  5. If no sub array is found, return empty array
 */

const nums = [-1, 6, 3, 7, 4, 3, 2, 2, 2, 6, 4]
const target = 5

const findSubSum = (numbers, targetSum) => {
  if(numbers.length === 0) return []
  if(!numbers.every(number => typeof number === 'number')) return 'Error: Array includes non-integers'

  for(let i = 0; i < numbers.length - 1; i++) {
    let currentSum = numbers[i]
    if(currentSum === targetSum) return [numbers[i]]
    for(let j = i + 1; j < numbers.length; j++) {
      currentSum += numbers[j]
      if(currentSum === targetSum) return numbers.slice(i, j + 1)
    }
  }
  if(numbers[numbers.length-1] === targetSum) return numbers[numbers.length - 1]
  return []
}

//console.log(findSubSum(nums, target));

/*----------------------------------------------------------------------------------------*/

/*
 * Write a function to locate and delete duplicate elements from an ordered array.

  Pseudocode:
  1. 
 */



/*----------------------------------------------------------------------------------------*/

/*
 * 

  Pseudocode:
  1. 
 */



/*----------------------------------------------------------------------------------------*/

/*
 * 

  Pseudocode:
  1. 
 */