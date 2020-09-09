// when user click the add button
let todoList = [];
const addTodo = () => {
  //get the value from input
  let input = document.getElementById("todoInput").value;
  console.log(input);

  // insert into todo list
  let todoItem = {
    content: input,
    isDone: false,
  };

  todoList.push(todoItem);
  console.log("todolits?", todoList);
  render();
  saveData();
};
const renderThisList = (abc) => {
  let resultHTML = abc
    .map((item, i) => {
      let toggleText = "";
      if (item.isDone == true) {
        toggleText = "Mark Undone";
      } else {
        toggleText = "Mark Done";
      }
      return `<li class="todo">
          <button class="close-button" onclick = "toggle(${i})">${toggleText}</button>
            <span class="todo-text">${item.content}</span>
            <button class="close-button" onclick = "remove(${i})">X</button>
            </li>`;
    })
    .join("");
  document.getElementById("resultArea").innerHTML = resultHTML;
};
// Another way: if you don't call an argument in renderThisList, you need to call the different render function for each case as below
const render = () => {
  let resultHTML = todoList
    .map((item, i) => {
      let toggleText = "";
      if (item.isDone == true) {
        toggleText = "Mark Undone";
        return `<li class="todo">
        <button class="close-button" onclick = "toggle(${i})">${toggleText}</button>
          <span class="todo-text">${item.content.strike()}</span> 
        }
          <button class="close-button" onclick = "remove(${i})">X</button>
          </li>`;
      } else {
        toggleText = "Mark Done";
        return `<li class="todo">
          <button class="close-button" onclick = "toggle(${i})">${toggleText}</button>
            <span class="todo-text">${item.content}</span> 
            <button class="close-button" onclick = "remove(${i})">X</button>
            </li>`;
      }
    })
    .join("");
  document.getElementById("resultArea").innerHTML = resultHTML;
};
// const renderUndone = () => {
//   let undoneList = todoList.filter((item) => item.isDone == false);
//   let resultHTML = undoneList
//     .map((item, i) => {
//       let toggleText = "";
//       if (item.isDone == true) {
//         toggleText = "Mark Undone";
//       } else {
//         toggleText = "Mark Done";
//         return `<li class="todo">
//         <button class="close-button" onclick = "toggle(${i})">${toggleText}</button>
//           <span class="todo-text">${item.content}</span> Done: ${item.isDone}
//           <button class="close-button" onclick = "remove(${i})">X</button>
//           </li>`;
//       }
//       return `<li class="todo">
//         <button class="close-button" onclick = "toggle(${i})">${toggleText}</button>
//           <span class="todo-text">${item.content}</span> Done: ${item.isDone}
//           <button class="close-button" onclick = "remove(${i})">X</button>
//           </li>`;
//     })
//     .join("");
//   document.getElementById("resultArea").innerHTML = resultHTML;
// };

function remove(a) {
  todoList.splice(a, 1);
  render();
}

function toggle(i) {
  todoList[i].isDone = !todoList[i].isDone;
  render();
}

function filterList() {
  let undoneList = todoList.filter((item) => item.isDone == false);
  let doneList = todoList.filter((item) => item.isDone == true);
  let check = document.getElementById("undoneList").checked;
  let checkDone = document.getElementById("doneList").checked;
  console.log("check", check);
  if (check == checkDone) {
    renderThisList(todoList);
  } else if (check == true) {
    renderThisList(undoneList);
  } else if (checkDone == true) {
    renderThisList(doneList);
  }
}
const saveData = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};
const getData = () => {
  let data = localStorage.getItem("todoList");
  data = JSON.parse(data);
  console.log("getData?", data);
  if (data == null) {
    todoList = [];
  } else {
    todoList = data;
  }
  render(todoList);
};
getData();
