const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';


let toDos = [];

// todo 삭제하기
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// todo 불러오기
function loadToDos(){
    const toDosLoaded = localStorage.getItem(TODOS_LS);
    if(toDosLoaded !== null){
        const parsedToDos = JSON.parse(toDosLoaded);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

// todo 생성 및 출력하기
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newid = toDos.length +1;
    li.id = newid;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newid
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();