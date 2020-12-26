/*
삭제하는 부분은 너무 어렵다.. 레벨업되면 다시오자..
*/
const todoForm = document.querySelector(".js-todoform"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todolist");

let toDos = [];


function deletTodo(event){ // 버튼을 누르고 이벤트 발생하면 생기는일.
    const btn = event.target; // Target이란 모양 그대로를말한다. 여기서 타겟을 버튼이라 정의 하고
    const li = btn.parentNode; // 버튼의 부모노드를 li라고 한다.
    todoList.removeChild(li); // 부모노드 번호를 리스트에서 삭제 (html에서 삭제)
    const cleanTodos = toDos.filter(toDo => { //toDos 배열에서 ture로만 배열다시만들기
        // console.log(li.id, toDo.id); 햇깔릴때 쓰면서 비교해보시오.
        return toDo.id !== parseInt(li.id); //parseInt : string -> 숫자
    });
 
    toDos = cleanTodos; // toDos를 cleantodo로 교체
    saveToDos(); // 로컬에 저장한다.
    //filter는 배열을 하나하나 돌면서 true 로만 배열을 만든다.
}

function saveToDos(){
    localStorage.setItem("currentTodo", JSON.stringify(toDos)); // JSON이 string으로 변환시켜 저장
}

function showTodoList(text){
    const li = document.createElement("li"); //createElement : 내부에서 태그 생성
    const delbtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1 ;
    delbtn.innerText = "❌"; 
    delbtn.addEventListener("click", deletTodo);
    span.innerText = text; // 매개변수 사용
    li.appendChild(span); // appendChild : 부모에게 속하게됨
    li.appendChild(delbtn);
    li.id = newId;
    todoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function shut(event){
    event.preventDefault(); // 새로고침이 실행되는 것을 막음. <- 부모테그로 이벤트 전파를 막기 때문에
    const currentValue = todoInput.value;
    showTodoList(currentValue);
    todoInput.value = ""; // 입력한 내용을 초기화.
}

function receiveTodo(){
    todoForm.addEventListener("submit", shut);
}

function loadTodo(){
    const currentTodo = localStorage.getItem("currentTodo");
    if( currentTodo !== null){ //1.배열객체 정의 2.로컬에 저장 3. 로컬의 것을 파쇄해서 하나씩 뿌려줌
        const parsedToDos = JSON.parse(currentTodo);
        parsedToDos.forEach(function(toDo){  
            //parsedtodo는 지금 배열상태임. 값이 string 에서 다시 오브젝트가 된상태.
            //풀어쓴 것 : function someting(todo){ } / forEach(toDo => { });
            //foreach함수는, 배열을 한번에 하나씩 함수 실행시켜줌
            //foreach 함수를 바로 만들고, 함수이름은 없고 toDo를 매개변수로 넣는다.
            showTodoList(toDo.text); // showTodoList 실행하면 Todos가 생기니까 그의 Text 출력
        });
    }
}


function init(){
    receiveTodo();
    loadTodo();
}

init();