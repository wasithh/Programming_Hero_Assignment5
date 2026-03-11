# Programming_Hero_Assignment5

- 1️⃣ What is the difference between var, let, and const?
  ANS :
  var: old way of declaring variable, unpredictable and causes bugs.
  let: this is a way of declaring a variable that can change or will change.
  const: this way of declaring variable is when a value should never change.

- 2️⃣ What is the spread operator (...)?
  Spread operator is an operator that takes an array and unpacks all the items inside of it.
  const oldBox = ["apple", "banana"];
  const newBox = [...oldBox, "orange"];
  // Result: ["apple", "banana", "orange"]

- 3️⃣ What is the difference between map(), filter(), and forEach()?
  forEach() : Used to execute a provided function once for each array element. It is mainly used for performing side effects (like updating DOM, logging to the console, or pushing to an external array).
  filter() : Used to evaluate each element against a condition. If the element passes the test (evaluates to true), it is kept; otherwise, it is excluded.
  map() : Used to transform data. It executes a function on every element and uses the returned values to populate a brand new array.

- 4️⃣ What is an arrow function?
  It removes the need for the function keyword. For single-line operations, it allows for an implicit return (no return keyword or curly braces needed).

- 5️⃣ What are template literals?
  By using backticks ( ` ` ) instead of normal quotes, you can easily inject JavaScript variables directly into your strings using ${ }
