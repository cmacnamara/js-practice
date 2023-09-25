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

console.log("Max Even Sum: ", maxEvenSum(testNums));
console.log("Max Even Sum: ", maxEvenSum(testNums2));


/*
Determine which letter triplet does not belong based on the differences between their letters

E.g. [A,B,C] has letter differences of 1 and 1
      [B,C,D] also has letter differences of 1 and 1
      [B,D,C] has letter differences of 2, -1 and should be returned
*/

const testTriplets = [['A', 'B', 'C'], ['B', 'C', 'D'], ['B', 'D', 'C']]

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
  console.log(arraysObject);
  const differencesString = differences.join(",")
  keys.forEach(key => {
    console.log(`Checking ${key} against ${differencesString}`);
    if(key === differencesString) {
      console.log("Returning true")
      return true
    }
  })
  return false
}

const generateDifferenceTally = triplets => {
  const differenceArrayTally = {}
  triplets.forEach(triplet => {
    const differences = generateDifferences(triplet)
    console.log("Exists already?", arrayExists(differenceArrayTally, differences))
    if(arrayExists(differenceArrayTally, differences)) {
      console.log("Incrementing tally...")
      differenceArrayTally[differences]++
    }
    else differenceArrayTally[differences] = 1
  })
  console.log(differenceArrayTally);
  return differenceArrayTally
}

const findOutlier = differenceArrayTally => {

}

const getOutlierTriplet = triplets => {
  const differenceArrayTally = generateDifferenceTally(triplets)
  return findOutlier(differenceArrayTally)
}

console.log("Outlier is: ", getOutlierTriplet(testTriplets));