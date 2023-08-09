function filterArray(arr) {
    return arr.filter((element) => {
      // Filter condition or function
      // Return true to keep the element in the new array
      // Return false to exclude the element from the new array
      // Example: Keep even numbers in this array.
      return element % 2 === 0;
    });
  }
  
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(filterArray(numbers));
  
