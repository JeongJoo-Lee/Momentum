const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

const TODOS_KEY = "todos";

// 리스트들 로컬스토리지에 저장하는 함수
function saveToDos(toDos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// 어떤 버튼이 클릭되었는지 알기위해 e.target 을 활용
function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();
  //선택된 id값이 아닌것들만 남기고 새롭게 배열 업데이트
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // 업데이트된 배열을 다시 로컬스토리지에 저장(업데이트)
  saveToDos(toDos);
}

// Todo를 리스트화면에 추가하기
function paintToDo(newToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.id = newToDo.id;
  span.innerText = newToDo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  li.appendChild(button);
  li.appendChild(span);
  button.addEventListener("click", deleteToDo);
  toDoList.appendChild(li);
}

// 이벤트 함수
function handleToDoSubmit(e) {
  e.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    id: Date.now(),
    text: newToDo,
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos(toDos);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

if (localStorage.getItem("username") === null) {
  toDoForm.style.display = "none";
  toDoList.style.display = "none";
}
