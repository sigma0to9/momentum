/*
순서
0. init();
1. 이름을 불러온다.
2. 이름이 있는경우 
    2-1. 환영해준다.
3. 이름이 없는경우 
    3-1. 박스를 보여주고 이벤트 리스너를 사용하여 엔터를 쳤을 때 다음 함수를 실행한다.
    3-2. 인풋의 속성을 받아 환영함수로 넘긴다.
    3-3. 인풋의 속성을 받아 저장하는 함수로 넘긴다.

주의할점
1. 애러가 나면 콘솔을 따라 상위단계로 천천히 따라간다.
2. querySelector 는 클래스/태그 가 속한 태그를 들고온다. 태그 이외의 클래스는 들고오지 않는다.
3. classlist.add remove 는 태그에 클래스를 추가하거나 빼는 역할을 한다.(기본적으로 태그에 클래스가 하나도 없는 상태)
4. 사용법 숙지 : .preventDefault , addEventListener, localstorage.setItem ,getItem 
*/

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    grettings = document.querySelector(".js-grettings");


function saveName(text){
    localStorage.setItem("currentUser", text); // setItem 사용법
}

function grettingHim(text){
    form.classList.remove("showing"); // classList 사용법
    grettings.classList.add("showing");
    grettings.innerText = `hello ${text}`;  // ineerText 사용법 : 속성을 직접 추가 가능
}

function receiveName(event){
    event.preventDefault(); //preventDefault 사용법
    const currentName = input.value; // 태그의 속성을 js에서 직접 부를 수 있다.
    grettingHim(currentName);
    saveName(currentName);
}

function showBox(){
    form.classList.add("showing");
    form.addEventListener("submit", receiveName); 
    // 이벤트리스너를 통해 value를 "제출" 가능하고, 이벤트를 받을 때 함수를 정의할 수 있다.
}


function chooseState(){
    const currentUser = localStorage.getItem("currentUser");
    if( currentUser === null ){
        showBox();
    }else{
        grettingHim(currentUser);
    }
}

function init(){  // 처음 시작은 항상 init() 함수로 시작한다.
    chooseState(); 
    // 첫 화면을 시작할때 경우의 수를 무엇을 기준으로 삼을지 고민하기. 여기선 로드네임으로 해도됨 : 
    // 이름을 어떻게 불러오는 지가 중요하고 -> 이름이 없는 경우는 표시해주면 되니까.
}

init();