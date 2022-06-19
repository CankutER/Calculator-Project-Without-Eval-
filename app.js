const nums = document.querySelectorAll(".num");
const funcBtns = document.querySelectorAll(".func");
const output = document.querySelector(".output");
const calculation = document.querySelector(".calculation");
const equals = document.querySelector(".equals");
const paranthOpen = document.querySelector(".paranthOpen");
const paranthClose = document.querySelector(".paranthClose");
const buttons = document.querySelectorAll(".button");
// const multiply = document.querySelectorAll(".multiply");
// const subtract = document.querySelectorAll(".subtract");
// const equals = document.querySelectorAll(".equals");
let paranthFlag = false;
let stack = [];
let paranthStack = [];
let stage = [];
let display = [];
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
const solveParanthStack = function (input) {
  let length = paranthStack.length;

  let result;
  if (input === "*" || input === "/") {
    if (paranthStack[length - 2] === "*") {
      const value = paranthStack[length - 3] * paranthStack[length - 1];
      paranthStack.splice(length - 3);
      paranthStack.push(value);
      paranthStack.push(input);
      result = value;
      output.textContent = result;
      return result;
    } else if (paranthStack[length - 2] === "/") {
      const value = paranthStack[length - 3] / paranthStack[length - 1];
      paranthStack.splice(length - 3);
      paranthStack.push(value);
      paranthStack.push(input);
      result = value;
      output.textContent = result;
      return result;
    } else {
      paranthStack.push(input);
    }
  } else if (input === "+" || input === "-") {
    let singleValue = calc(paranthStack);

    paranthStack = [];

    paranthStack.push(singleValue);

    paranthStack.push(input);
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
    if (!paranthFlag) {
      if (
        window.isNaN(stack[stack.length - 1]) &&
        stack.length !== 0 &&
        stage.length === 0
      ) {
        if (stack[stack.length - 1] === "+" || "-") {
          stack[stack.length - 1] = func.textContent;
          display.unshift("(");
          display[display.length - 1] = ")";
          display.push(func.textContent);
        } else {
          stack[stack.length - 1] = func.textContent;
          display[display.length - 1] = func.textContent;
        }
      } else if (stage.length !== 0 && stack.length === 1) {
        let num = Number(stage.join(""));
        stage = [];
        stack[0] = num;
        solveStack(func.textContent);
        display = [];
        display.push(num);
        display.push(func.textContent);
      } else if (stage.length === 0 && stack.length === 1) {
        solveStack(func.textContent);
        display.push(stack[0]);
        display.push(func.textContent);
      } else if (
        stage.length === 0 &&
        stack.length > 1 &&
        !window.isNaN(stack[stack.length - 1])
      ) {
        solveStack(func.textContent);
        display.push(func.textContent);
      } else {
        let num = Number(stage.join(""));
        display.push(num);
        display.push(func.textContent);
        stage = [];
        stack.push(num);

        console.log(solveStack(func.textContent));
      }
    } else if (paranthFlag) {
      if (
        window.isNaN(paranthStack[paranthStack.length - 1]) &&
        paranthStack.length !== 0 &&
        stage.length === 0
      ) {
        if (paranthStack[paranthStack.length - 1] === "+" || "-") {
          paranthStack[paranthStack.length - 1] = func.textContent;
          display.unshift("(");
          display[display.length - 1] = ")";
          display.push(func.textContent);
        } else {
          paranthStack[paranthStack.length - 1] = func.textContent;
          display[display.length - 1] = func.textContent;
        }
      } else if (stage.length !== 0 && paranthStack.length === 1) {
        let num = Number(stage.join(""));
        stage = [];
        paranthStack[0] = num;
        solveParanthStack(func.textContent);
        display = [];
        display.push(num);
        display.push(func.textContent);
      } else if (stage.length === 0 && paranthStack.length === 1) {
        solveParanthStack(func.textContent);
        display.push(paranthStack[0]);
        display.push(func.textContent);
      } else if (
        stage.length === 0 &&
        paranthStack.length > 1 &&
        !window.isNaN(paranthStack[paranthStack.length - 1])
      ) {
        solveParanthStack(func.textContent);
        display.push(func.textContent);
      } else {
        let num = Number(stage.join(""));
        display.push(num);
        display.push(func.textContent);
        stage = [];
        paranthStack.push(num);
      }
    }
    calculation.textContent = display.join("");
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
    display[display.length - 1] = "=";
  } else if (stage.length === 0 && stack.length === 0) {
    let result = calc(stack);
    output.textContent = result;
    display.push(`${Number(stage.join(""))}`);
    display.push(`=`);
  } else if (stage.length === 0 && !window.isNaN(stack[stack.length - 1])) {
    let result = calc(stack);
    stack = [];
    stack.push(result);
    output.textContent = result;
    display.push(result);
    display.push("=");
  } else {
    let num = Number(stage.join(""));
    display.push(stage.join(""));
    display.push("=");

    stage = [];
    stack.push(num);
    let result = calc(stack);
    stack = [];
    stack.push(result);
    output.textContent = result;
  }
  calculation.textContent = display.join("");
  display = [];
});

paranthOpen.addEventListener("click", () => {
  stage = [];
  paranthFlag = true;
  display.push("(");
  calculation.textContent = display.join("");
});

paranthClose.addEventListener("click", () => {
  if (
    stage.length === 0 &&
    window.isNaN(paranthStack[paranthStack.length - 1]) &&
    paranthStack.length !== 0
  ) {
    paranthStack.splice(-1);
    let result = calc(paranthStack);
    paranthStack = [];
    output.textContent = result;
    stack.push(result);
  } else if (stage.length === 0 && paranthStack.length === 0) {
    let result = calc(paranthStack);
    paranthStack = [];
    output.textContent = result;
    stack.push(result);
  } else if (
    stage.length === 0 &&
    !window.isNaN(paranthStack[paranthStack.length - 1])
  ) {
    let result = calc(paranthStack);
    paranthStack = [];
    output.textContent = result;
    stack.push(result);
  } else {
    let num = Number(stage.join(""));
    stage = [];
    paranthStack.push(num);
    let result = calc(paranthStack);
    paranthStack = [];
    stack.push(result);
    output.textContent = result;
  }

  paranthFlag = false;
});
