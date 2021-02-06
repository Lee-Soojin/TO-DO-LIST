const toDoForm = document.querySelector(".js-toDoForm"), // <form class = "js-toDoForm"> </form>
    toDoInput = toDoForm.querySelector("input"), // <input type = "text" placeholder="Write a to do" />
    toDoList = document.querySelector(".js-toDoList"); //  <ul class = "js-toDoList"> </ul>

const TODOS_LS = 'toDos';  // 입력받는 값의 변수 

let toDos = [];  // 입력 받은 값을 넣을 배열

function deleteToDo(event) {  // deltete 버튼 함수
    const btn = event.target;  // 버튼을 변수로 할당
    const li = btn.parentNode; // 그 버튼이 속해 있는 li를 지정
    toDoList.removeChild(li); // li 의 child를 remove
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; // 삭제를 원하는 li 줄만 삭제하고 나머지 li 는 다시 저장해준다.
    saveToDos(); // 저장
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // TODOS_LS = toDos 로 저장한다
}

let idNum = 1;
function paintToDo(text) { // text 는 입력받은 값
    const li = document.createElement("li"); // <li></li>
    const delBtn = document.createElement("button"); // <button></button>
    const span = document.createElement("span"); // <span> </span>
    const newId = idNum; // id 설정
    idNum +=1;
    delBtn.innerText = "🗑";
    delBtn.addEventListener('click', deleteToDo); // 버튼 클릭하면 deleteToDo 함수 불러온다
    span.innerText = text; // <span> text </span>
    li.appendChild(span); // <li> <span> text </span> </li>
    li.appendChild(delBtn); // <li> <span> text </span> <button>🗑</button></li> 
    li.id = newId;  // <li id = 1> <span> text </span> <button>🗑</button></li> 
    toDoList.appendChild(li); //  <ul class = "js-toDoList"> <li id = 1> <span> text </span> <button>🗑</button></li> </ul>
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // toDos = [{text:username, id: 1}]
    saveToDos();  // 저장
}

function handleSubmit(event) {
    event.preventDefault(); 
    const currentValue = toDoInput.value; // <input type = "text" placeholder="Write a to do" /> 의 값을 currentValue 변수에 할당
    paintToDo(currentValue); // currentValue를 입력받아 출력하는 함수 불러오기
    toDoInput.value = ""; // input 초기화 시키기 
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); //TODOS_LS 의 값을 가져온다 
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // 입력된 값을 parsing 해서 object로 변환
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

// 1. 할일 입력받기 
// 2. delete Button 기능 
// 3. save 기능  => 입력받은 값을 배열형태로 저장하도록 한다
// 4. paint 기능 => 입력받은 값이 버튼과 함께 나타나도록 해준다 UI 담당 함수 // +object로 저장하는 기능 
// 5. 값이 submit 되었을때 handle 함수 => default prevent하고 input 값 초기화 시켜주기
// 6. 