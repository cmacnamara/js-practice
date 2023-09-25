console.log("Does this thing work?")

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
