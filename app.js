const nums = document.querySelectorAll(".num");
const funcBtns = document.querySelectorAll(".func");
const output = document.querySelector(".output");
const calculation = document.querySelector(".calculation");
const del = document.querySelector(".del");
const AC = document.querySelector(".AC");
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
let paranthCount = 0;
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
  let innerLength = paranthStack[paranthCount - 1].length;

  let result;
  if (input === "*" || input === "/") {
    if (paranthStack[paranthStack.length - 1][innerLength - 2] === "*") {
      const value =
        paranthStack[paranthStack.length - 1][innerLength - 3] *
        paranthStack[paranthStack.length - 1][innerLength - 1];
      paranthStack[paranthStack.length - 1].splice(innerLength - 3);
      paranthStack[paranthStack.length - 1].push(value);
      paranthStack[paranthStack.length - 1].push(input);
      result = value;
      output.textContent = result;
      return result;
    } else if (paranthStack[paranthStack.length - 1][innerLength - 2] === "/") {
      const value =
        paranthStack[paranthStack.length - 1][innerLength - 3] /
        paranthStack[paranthStack.length - 1][innerLength - 1];
      paranthStack[paranthStack.length - 1].splice(innerLength - 3);
      paranthStack[paranthStack.length - 1].push(value);
      paranthStack[paranthStack.length - 1].push(input);
      result = value;
      output.textContent = result;
      return result;
    } else {
      paranthStack[paranthStack.length - 1].push(input);
    }
  } else if (input === "+" || input === "-") {
    let singleValue = calc(paranthStack[paranthStack.length - 1]);

    paranthStack[paranthStack.length - 1] = [];

    paranthStack[paranthStack.length - 1].push(singleValue);

    paranthStack[paranthStack.length - 1].push(input);
    result = singleValue;
    output.textContent = result;
    return result;
  }
};

nums.forEach((num) => {
  num.addEventListener("click", () => {
    if (
      output.textContent[output.textContent.length - 1] === "." &&
      num.textContent === "."
    ) {
      return;
    } else if (stage.length === 0 && num.textContent === ".") {
      stage.push(0);
      stage.push(num.textContent);
      output.textContent = stage.join("");
    } else {
      stage.push(num.textContent);
      output.textContent = stage.join("");
    }
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
        if (
          (stack[stack.length - 1] === "+" ||
            stack[stack.length - 1] === "-") &&
          (func.textContent === "*" || func.textContent === "/")
        ) {
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
        if (display[display.length - 1] === ")") {
          display.push(func.textContent);
        } else {
          display.push(stack[0]);
          display.push(func.textContent);
        }
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

        solveStack(func.textContent);
      }
    } else if (paranthFlag) {
      let innerLength = paranthStack[paranthCount - 1].length;
      if (
        window.isNaN(paranthStack[paranthStack.length - 1][innerLength - 1]) &&
        paranthStack[paranthStack.length - 1].length !== 0 &&
        stage.length === 0
      ) {
        if (
          (paranthStack[paranthStack.length - 1][innerLength - 1] === "+" ||
            paranthStack[paranthStack.length - 1][innerLength - 1] === "-") &&
          (func.textContent === "*" || func.textContent === "/")
        ) {
          paranthStack[paranthStack.length - 1][innerLength - 1] =
            func.textContent;
          display.unshift("(");
          display[display.length - 1] = ")";
          display.push(func.textContent);
        } else {
          paranthStack[paranthStack.length - 1][innerLength - 1] =
            func.textContent;
          display[display.length - 1] = func.textContent;
        }
      } else if (
        stage.length !== 0 &&
        paranthStack[paranthStack.length - 1].length === 1
      ) {
        let num = Number(stage.join(""));
        stage = [];
        paranthStack[paranthStack.length - 1][0] = num;
        solveParanthStack(func.textContent);
        display = [];
        display.push(num);
        display.push(func.textContent);
      } else if (
        stage.length === 0 &&
        paranthStack[paranthStack.length - 1].length === 1
      ) {
        solveParanthStack(func.textContent);
        if (display[display.length - 1] === ")") {
          display.push(func.textContent);
        } else {
          display.push(paranthStack[paranthStack.length - 1][0]);
          display.push(func.textContent);
        }
      } else if (
        stage.length === 0 &&
        paranthStack[paranthStack.length - 1].length > 1 &&
        !window.isNaN(paranthStack[paranthStack.length - 1][innerLength - 1])
      ) {
        solveParanthStack(func.textContent);
        display.push(func.textContent);
      } else {
        let num = Number(stage.join(""));
        display.push(num);
        display.push(func.textContent);
        stage = [];
        paranthStack[paranthStack.length - 1].push(num);
        solveParanthStack(func.textContent);
      }
    }
    calculation.textContent = display.join("");
  });
});

equals.addEventListener("click", () => {
  if (paranthFlag) {
    alert("Please close the paranthesis");
  } else {
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
      if (display[display.length - 1] === ")") {
        display.push("=");
      } else {
        display.push(result);
        display.push("=");
      }
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
  }
});

paranthOpen.addEventListener("click", () => {
  if (display[display.length - 1] === ")") {
    alert("Please use an operator before starting a new paranthesis");
  } else {
    paranthFlag = true;
    paranthCount++;
    paranthStack.push([]);
    display.push("(");
    calculation.textContent = display.join("");
  }
});

paranthClose.addEventListener("click", () => {
  if (paranthCount === 0) {
    return;
  }
  let innerLength = paranthStack[paranthCount - 1].length;

  if (
    stage.length === 0 &&
    window.isNaN(paranthStack[paranthStack.length - 1][innerLength - 1]) &&
    innerLength !== 0
  ) {
    paranthStack[paranthStack.length - 1].splice(-1);
    let result = calc(paranthStack[paranthStack.length - 1]);
    paranthStack.pop();
    output.textContent = result;
    if (paranthCount > 1) {
      if (paranthStack[paranthStack.length - 1].length === 1) {
        paranthStack[paranthStack.length - 1] = result;
      } else {
        paranthStack[paranthStack.length - 1].push(result);
      }
    } else if (paranthCount === 1) {
      if (stack.length === 1) {
        stack[0] = result;
      } else {
        stack.push(result);
      }
      paranthFlag = false;
    }
    paranthCount--;
    display.pop();
    display.push(")");
  } else if (
    stage.length === 0 &&
    paranthStack[paranthStack.length - 1].length === 0
  ) {
    let result = calc(paranthStack[paranthStack.length - 1]);
    paranthStack.pop();
    output.textContent = result;
    if (paranthCount > 1) {
      if (paranthStack[paranthStack.length - 1].length === 1) {
        paranthStack[paranthStack.length - 1] = result;
      } else {
        paranthStack[paranthStack.length - 1].push(result);
      }
    } else if (paranthCount === 1) {
      if (stack.length === 1) {
        stack[0] = result;
      } else {
        stack.push(result);
      }
      paranthFlag = false;
    }
    paranthCount--;
    display.push(")");
  } else if (
    stage.length === 0 &&
    !window.isNaN(paranthStack[paranthStack.length - 1][innerLength - 1])
  ) {
    let result = calc(paranthStack[paranthStack.length - 1]);
    paranthStack.pop();
    output.textContent = result;
    if (paranthCount > 1) {
      if (paranthStack[paranthStack.length - 1].length === 1) {
        paranthStack[paranthStack.length - 1] = result;
      } else {
        paranthStack[paranthStack.length - 1].push(result);
      }
    } else if (paranthCount === 1) {
      if (stack.length === 1) {
        stack[0] = result;
      } else {
        stack.push(result);
      }
      paranthFlag = false;
    }
    paranthCount--;
    display.push(")");
  } else {
    let num = Number(stage.join(""));
    stage = [];
    paranthStack[paranthStack.length - 1].push(num);
    let result = calc(paranthStack[paranthStack.length - 1]);
    paranthStack.pop();
    if (paranthCount > 1) {
      if (paranthStack[paranthStack.length - 1].length === 1) {
        paranthStack[paranthStack.length - 1] = result;
      } else {
        paranthStack[paranthStack.length - 1].push(result);
      }
    } else if (paranthCount === 1) {
      if (stack.length === 1) {
        stack[0] = result;
      } else {
        stack.push(result);
      }
      paranthFlag = false;
    }
    paranthCount--;
    output.textContent = result;
    display.push(num);
    display.push(")");
  }

  calculation.textContent = display.join("");
});

del.addEventListener("click", () => {
  if (stage.length > 1) {
    stage.pop();
    output.textContent = `${stage.join("")}`;
  } else {
    stage.pop();
    output.textContent = "0";
  }
});

AC.addEventListener("click", () => {
  stage = [];
  stack = [];
  paranthStack = [];
  paranthCount = 0;
  paranthFlag = false;
  output.textContent = "0";
  display = [];
  calculation.textContent = display.join("");
});
