const form = document.querySelector(".js-form"), // <form class="js-form form"> </form>
  input = form.querySelector("input"), // <input type = "text" placeholder="Write a to do" />
  greeting = document.querySelector(".js-greetings");  //  <ul class = "js-toDoList"> </ul>

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text); // USER_LS = text 로 저장한다. 
}

function handleSubmit(event) {
  event.preventDefault(); // 기본 설정으로 돌아가는것을 prevent함
  const currentValue = input.value; // 입력해준 값을 변수 currentValue로 지정해줌
  paintGreeting(currentValue);
  saveName(currentValue); // 입력한 값을 USER_LS의 값으로 저장한다. 
}

function askForName() {
  form.classList.add(SHOWING_CN);  // <form class = "showing"></form>
  form.addEventListener("submit", handleSubmit); // form 에 값이 들어오면 값을 반환해주는 역할을 한다 .
}

function paintGreeting(text) { // username을 가져와 Hello Username 을 출력하는 함수이다. 
  form.classList.remove(SHOWING_CN); // class=showing 을 지운다.
  greeting.classList.add(SHOWING_CN); // <ul class = "js-toDoList"> </ul>
  greeting.innerText = `Hello ${text}`; 
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS); // USER_LS의 값을 가져와서 입력된 이름을 확인한다. 
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();

// TO DO LIST greeting
// 1. 이름을 입력받기 
// 2. 입력 받은 이름 저장하기 
// 3. 입력 받은 이름 반환하기 
// 4. 반환받은 이름으로 문구 출력하기 
