// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user entered value
  if (userData.trim() != 0) {
    //if user values aren't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active");
  }
};

showTasks(); //showTasks()を読んでいます。

// if user click on the add button
addBtn.onclick = () => {
  let userData = inputBox.value; //getting user entered value
  let getLocalStorage = localStorage.getItem("NewTodo"); //getting local storage
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming a json string into a js object
  }
  listArr.push(userData); // pushing or adding user data
  localStorage.setItem("NewTodo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //showTasks()を読んでいます。
};

function showTasks() {
  let getLocalStorage = localStorage.getItem("NewTodo"); //getting local storage
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming a json string into a js object
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //passing the array length in pending
  if (listArr.length < 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //ulタグの中に新しくliタグが追加されます。
  inputBox.value = ""; //タスクを一回追加したらテキストフィールドの中身をからにします。
}

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("NewTodo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular indexed li
  localStorage.setItem("NewTodo", JSON.stringify(listArr));
  showTasks();
}

// deleteAllTasks function{
deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("NewTodo", JSON.stringify(listArr));
  showTasks();
};
