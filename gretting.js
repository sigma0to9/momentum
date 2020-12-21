const form = document.querySelector(".js-form"), //css와 선택자가 같음, css처럼 클래스와 태그 등을 js에서 끌어다 사용할 수 있음.
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    //이벤트리스너를 붙여 제출하는 이벤트를 사용할건데, 이벤트를 살짝 수정하는 함수 추가
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN); 
    // form 클래스들의 리스트에 showing(block으로 css에 정의)을 넣은것을 삭제
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null ){
        // she in not
        askForName();
    } else {
        // she is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();