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

console.log(humanReadable(45296))