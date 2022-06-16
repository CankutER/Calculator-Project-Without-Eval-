const nums = document.querySelectorAll(".num");
const funcBtns = document.querySelectorAll(".func");
const output = document.querySelector(".output");
const equals = document.querySelector(".equals");
// const multiply = document.querySelectorAll(".multiply");
// const subtract = document.querySelectorAll(".subtract");
// const equals = document.querySelectorAll(".equals");

let stack = [];
let stage = [];
// output.textContent = stack[0];

function calc(stack) {
  let total = 0;
  if (stack.length === 1) {
    total = stack[stack.length - 1];
  } else {
    for (let i = stack.length - 1; i > 0; i--) {
      if (i === stack.length - 1) {
        total = stack[i];
        continue;
      } else {
        if (stack[i] === "*") {
          total = stack[i - 1] * total;
        } else if (stack[i] === "/") {
          total = stack[i - 1] / total;
        } else if (stack[i] === "+") {
          total = stack[i - 1] + total;
        } else if (stack[i] === "-") {
          total = stack[i - 1] - total;
        } else {
          continue;
        }
      }
    }
  }
  return total;
}

const solveStack = function (input) {
  let length = stack.length;

  let result;
  if (input === "*" || input === "/") {
    if (stack[length - 2] === "*") {
      const value = stack[length - 3] * stack[length - 1];
      stack.splice(length - 3);
      stack.push(value);
      stack.push(input);
      result = value;
      output.textContent = result;
      return result;
    } else if (stack[length - 2] === "/") {
      const value = stack[length - 3] / stack[length - 1];
      stack.splice(length - 3);
      stack.push(value);
      stack.push(input);
      result = value;
      output.textContent = result;
      return result;
    } else {
      stack.push(input);
    }
  } else if (input === "+" || input === "-") {
    let singleValue = calc(stack);

    stack = [];

    stack.push(singleValue);

    stack.push(input);
    result = singleValue;
    output.textContent = result;
    return result;
  }
};

nums.forEach((num) => {
  num.addEventListener("click", () => {
    stage.push(Number(num.textContent));
    output.textContent = stage.join("");
    // console.log(stage);
  });
});

funcBtns.forEach((func) => {
  func.addEventListener("click", () => {
    if (
      window.isNaN(stack[stack.length - 1]) &&
      stack.length !== 0 &&
      stage.length === 0
    ) {
      stack[stack.length - 1] = func.textContent;
    } else if (stage.length !== 0 && stack.length === 1) {
      let num = Number(stage.join(""));
      stage = [];
      stack[0] = num;
    } else if (stage.length === 0 && stack.length === 1) {
      solveStack(func.textContent);
    } else {
      let num = Number(stage.join(""));
      stage = [];
      stack.push(num);
      console.log(stack);
      console.log(solveStack(func.textContent));
      console.log(stack);
    }
  });
});

equals.addEventListener("click", () => {
  if (
    stage.length === 0 &&
    window.isNaN(stack[stack.length - 1]) &&
    stack.length !== 0
  ) {
    stack.splice(-1);
    let result = calc(stack);
    output.textContent = result;
  } else if (stage.length === 0 && stack.length === 0) {
    let result = calc(stack);
    output.textContent = result;
  } else if (stage.length === 0 && !window.isNaN(stack[stack.length - 1])) {
    let result = calc(stack);
    output.textContent = result;
  } else {
    let num = Number(stage.join(""));
    stage = [];
    stack.push(num);
    let result = calc(stack);
    stack = [];
    stack.push(result);
    output.textContent = result;
  }
});
