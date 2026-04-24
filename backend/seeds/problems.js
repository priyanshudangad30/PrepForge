const mongoose = require("mongoose");
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const Problem = require("../models/Problem");
const connectDB = require("../config/db");

const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "" }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
      python: "def twoSum(nums, target):\n    # Write your code here\n    pass",
      cpp: "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    \n}"
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]" }
    ],
    acceptance: 49
  },
  {
    title: "Reverse String",
    slug: "reverse-string",
    description: "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "Easy",
    category: "Strings",
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: "" },
    ],
    constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ascii character."],
    starterCode: {
      javascript: "function reverseString(s) {\n  // Write your code here\n  \n}",
      python: "def reverseString(s):\n    # Write your code here\n    pass",
      cpp: "void reverseString(vector<char>& s) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' }],
    acceptance: 75
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "Easy",
    category: "Stacks",
    examples: [
      { input: 's = "()"', output: "true", explanation: "" },
      { input: 's = "()[]{}"', output: "true", explanation: "" },
      { input: 's = "(]"', output: "false", explanation: "" }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    starterCode: {
      javascript: "function isValid(s) {\n  // Write your code here\n  \n}",
      python: "def isValid(s):\n    # Write your code here\n    pass",
      cpp: "bool isValid(string s) {\n    // Write your code here\n    \n}"
    },
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" }
    ],
    acceptance: 42
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: "function maxSubArray(nums) {\n  // Write your code here\n  \n}",
      python: "def maxSubArray(nums):\n    # Write your code here\n    pass",
      cpp: "int maxSubArray(vector<int>& nums) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" }],
    acceptance: 50
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    description: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    difficulty: "Easy",
    category: "Linked Lists",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "" },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: "function mergeTwoLists(list1, list2) {\n  // Write your code here\n  \n}",
      python: "def mergeTwoLists(list1, list2):\n    # Write your code here\n    pass",
      cpp: "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }],
    acceptance: 60
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Easy",
    category: "Searching",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "All the integers in nums are unique.", "nums is sorted in ascending order."],
    starterCode: {
      javascript: "function search(nums, target) {\n  // Write your code here\n  \n}",
      python: "def search(nums, target):\n    # Write your code here\n    pass",
      cpp: "int search(vector<int>& nums, int target) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4" }],
    acceptance: 56
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    difficulty: "Easy",
    category: "Arrays",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: "function maxProfit(prices) {\n  // Write your code here\n  \n}",
      python: "def maxProfit(prices):\n    # Write your code here\n    pass",
      cpp: "int maxProfit(vector<int>& prices) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[7,1,5,3,6,4]", expectedOutput: "5" }],
    acceptance: 54
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    category: "Dynamic Programming",
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
      { input: "n = 3", output: "3", explanation: "1. 1+1+1\n2. 1+2\n3. 2+1" }
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: "function climbStairs(n) {\n  // Write your code here\n  \n}",
      python: "def climbStairs(n):\n    # Write your code here\n    pass",
      cpp: "int climbStairs(int n) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "2", expectedOutput: "2" }, { input: "3", expectedOutput: "3" }],
    acceptance: 51
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area is between lines at index 1 and 8." },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      javascript: "function maxArea(height) {\n  // Write your code here\n  \n}",
      python: "def maxArea(height):\n    # Write your code here\n    pass",
      cpp: "int maxArea(vector<int>& height) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" }],
    acceptance: 54
  },
  {
    title: "3Sum",
    slug: "3sum",
    description: "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: "function threeSum(nums) {\n  // Write your code here\n  \n}",
      python: "def threeSum(nums):\n    # Write your code here\n    pass",
      cpp: "vector<vector<int>> threeSum(vector<int>& nums) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" }],
    acceptance: 32
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "Strings",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      javascript: "function lengthOfLongestSubstring(s) {\n  // Write your code here\n  \n}",
      python: "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass",
      cpp: "int lengthOfLongestSubstring(string s) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "abcabcbb", expectedOutput: "3" }],
    acceptance: 33
  },
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "Easy",
    category: "Linked Lists",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "" },
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    starterCode: {
      javascript: "function reverseList(head) {\n  // Write your code here\n  \n}",
      python: "def reverseList(head):\n    # Write your code here\n    pass",
      cpp: "ListNode* reverseList(ListNode* head) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" }],
    acceptance: 72
  },
  {
    title: "Binary Tree Inorder Traversal",
    slug: "binary-tree-inorder-traversal",
    description: "Given the `root` of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Easy",
    category: "Trees",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]", explanation: "" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: "function inorderTraversal(root) {\n  // Write your code here\n  \n}",
      python: "def inorderTraversal(root):\n    # Write your code here\n    pass",
      cpp: "vector<int> inorderTraversal(TreeNode* root) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[1,null,2,3]", expectedOutput: "[1,3,2]" }],
    acceptance: 72
  },
  {
    title: "Sort an Array",
    slug: "sort-an-array",
    description: "Given an array of integers `nums`, sort the array in ascending order and return it.\n\nYou must solve the problem without using any built-in functions in O(nlog(n)) time complexity.",
    difficulty: "Medium",
    category: "Sorting",
    examples: [
      { input: "nums = [5,2,3,1]", output: "[1,2,3,5]", explanation: "" },
    ],
    constraints: ["1 <= nums.length <= 5 * 10^4", "-5 * 10^4 <= nums[i] <= 5 * 10^4"],
    starterCode: {
      javascript: "function sortArray(nums) {\n  // Write your code here\n  \n}",
      python: "def sortArray(nums):\n    # Write your code here\n    pass",
      cpp: "vector<int> sortArray(vector<int>& nums) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[5,2,3,1]", expectedOutput: "[1,2,3,5]" }],
    acceptance: 58
  },
  {
    title: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: 'The longest common subsequence is "ace" and its length is 3.' },
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English characters."],
    starterCode: {
      javascript: "function longestCommonSubsequence(text1, text2) {\n  // Write your code here\n  \n}",
      python: "def longestCommonSubsequence(text1, text2):\n    # Write your code here\n    pass",
      cpp: "int longestCommonSubsequence(string text1, string text2) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "abcde\nace", expectedOutput: "3" }],
    acceptance: 59
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    difficulty: "Medium",
    category: "Graphs",
    examples: [
      { input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]', output: "1", explanation: "" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    starterCode: {
      javascript: "function numIslands(grid) {\n  // Write your code here\n  \n}",
      python: "def numIslands(grid):\n    # Write your code here\n    pass",
      cpp: "int numIslands(vector<vector<char>>& grid) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: "1" }],
    acceptance: 55
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return -1.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    examples: [
      { input: "coins = [1,5,10,25], amount = 30", output: "2", explanation: "25 + 5 = 30" },
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    starterCode: {
      javascript: "function coinChange(coins, amount) {\n  // Write your code here\n  \n}",
      python: "def coinChange(coins, amount):\n    # Write your code here\n    pass",
      cpp: "int coinChange(vector<int>& coins, int amount) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[1,5,10,25]\n30", expectedOutput: "2" }],
    acceptance: 41
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: "Hard",
    category: "Arrays",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "6 units of rain water are trapped." },
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    starterCode: {
      javascript: "function trap(height) {\n  // Write your code here\n  \n}",
      python: "def trap(height):\n    # Write your code here\n    pass",
      cpp: "int trap(vector<int>& height) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" }],
    acceptance: 58
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    description: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    difficulty: "Medium",
    category: "Arrays",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]." },
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2"],
    starterCode: {
      javascript: "function merge(intervals) {\n  // Write your code here\n  \n}",
      python: "def merge(intervals):\n    # Write your code here\n    pass",
      cpp: "vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Write your code here\n    \n}"
    },
    testCases: [{ input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" }],
    acceptance: 46
  },
  {
    title: "LRU Cache",
    slug: "lru-cache",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n- `int get(int key)` Return the value of the key if the key exists, otherwise return -1.\n- `void put(int key, int value)` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache.",
    difficulty: "Hard",
    category: "Design",
    examples: [
      { input: '["LRUCache","put","put","get","put","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2]]', output: "[null,null,null,1,null,-1]", explanation: "" },
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5"],
    starterCode: {
      javascript: "class LRUCache {\n  constructor(capacity) {\n    // Write your code here\n  }\n  \n  get(key) {\n    // Write your code here\n  }\n  \n  put(key, value) {\n    // Write your code here\n  }\n}",
      python: "class LRUCache:\n    def __init__(self, capacity):\n        # Write your code here\n        pass\n    \n    def get(self, key):\n        # Write your code here\n        pass\n    \n    def put(self, key, value):\n        # Write your code here\n        pass",
      cpp: "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Write your code here\n    }\n    \n    int get(int key) {\n        // Write your code here\n    }\n    \n    void put(int key, int value) {\n        // Write your code here\n    }\n};"
    },
    testCases: [],
    acceptance: 40
  }
];

const seedProblems = async () => {
  try {
    await connectDB();
    await Problem.deleteMany({});
    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedProblems();
