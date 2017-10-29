var id = 1;
interface todo{
    task:string;
    status:string;
    id:number;
}



class TodoList {
    public taskList: todo[];

    //public done:boolean;
    constructor() {
        this.taskList = new Array();
    }

    add(list: todo) {
        this.taskList.push(list);
        //this.done = false;
    }


    display() {
        var elementTodo = document.getElementById("activetodos");
        elementTodo.innerText = "";
        var completeTodo = document.getElementById("completetodos");
        completeTodo.innerText = "";
        var deleteTodo = document.getElementById("deletetodos");
        deleteTodo.innerText = "";

        var completebutton = document.createElement("button");
        completebutton.setAttribute("class", "btn btn-success");
        completebutton.setAttribute("id", "cmpButton");
        //completebutton.type = "checkbox";
        var t = document.createTextNode("COMPLETE");
        completebutton.appendChild(t);
        var deletebutton = document.createElement("button");
        deletebutton.setAttribute("class", "btn btn-danger");
        deletebutton.setAttribute("id", "delButton");
        var t = document.createTextNode("DELETE");
        deletebutton.appendChild(t);
        var updatebutton = document.createElement("button");
        updatebutton.setAttribute("class", "btn btn-info");
        var t = document.createTextNode("UPDATE");
        updatebutton.appendChild(t);
        var activebutton = document.createElement("button");
        activebutton.setAttribute("class", "btn btn-info");
        activebutton.setAttribute("id", "activeButton");
        var t = document.createTextNode("ACTIVATE");
        activebutton.appendChild(t);

        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].status == "active" || this.taskList[i].status == "complete") {
                completebutton.setAttribute('onClick', 'completeTodo(' + i + '); ');
                deletebutton.setAttribute('onClick', 'deleteTodo(' + i + ');');
                updatebutton.setAttribute('onClick',
                    `if(this.innerText == 'Save'){
                            this.innerText = 'Update';
                            saveUpdateTodo(${i});   
                          }
                          else { 
                            console.log('in'); this.innerText='Save';
                            updateTodo(${i}); 
                          }`);
                activebutton.setAttribute('onClick', 'activateTodo(' + i + ');');
                if (this.taskList[i].status == "active") {
                    var div = document.createElement("div");
                    div.setAttribute("id", "id" + i);
                    div.setAttribute("class", "activeTodo");
                    div.contentEditable = "false";
                    var t = document.createTextNode(this.taskList[i].task);
                    div.appendChild(t);
                    elementTodo.appendChild(div);
                    elementTodo.appendChild(completebutton);
                    elementTodo.appendChild(deletebutton);
                    elementTodo.appendChild(updatebutton);
                    elementTodo.innerHTML += "<br>";
                }
                else if (this.taskList[i].status == "complete") {

                    var divComplete = document.createElement("div");
                    divComplete.setAttribute("id", "id" + i);
                    divComplete.setAttribute("class", "completeTodo");
                    var t = document.createTextNode(this.taskList[i].task);
                    divComplete.appendChild(t);
                    completeTodo.appendChild(divComplete);
                    completeTodo.appendChild(activebutton);
                    completeTodo.appendChild(deletebutton);
                    completeTodo.innerHTML += "<br>";
                }
            }
            else if (this.taskList[i].status == "delete") {
                var divDelete = document.createElement("div");
                divDelete.setAttribute("class", "deleteTodo");
                divDelete.appendChild(document.createTextNode(this.taskList[i].task));
                deleteTodo.appendChild(divDelete);
                deleteTodo.innerHTML += "<br>";
            }
        }
    }
}
var todoList = new TodoList();
function addItem(task:string,status:string){
    todoList.add({
        task:task,
        status:status,
        id:id++
    });
}


var completeTodo = function(i) {
    console.log(i);
    this.taskList[i].status = "complete";
    displayItem();
}
completeTodo = completeTodo.bind(todoList);

var deleteTodo = function(i){
    this.taskList[i].status = "delete";
    displayItem();
}
deleteTodo = deleteTodo.bind(todoList);

var updateTodo = function(i){
    console.log(i);
    var div = document.getElementById("id"+i);
    div.contentEditable = "true";
    console.log(div[1]);
    div.setAttribute('class',' myFocus');
}
updateTodo = updateTodo.bind(todoList);

var saveUpdateTodo = function(i){
    console.log("here");
    var div = document.getElementById("id"+i);
    this.taskList[i].task = div.innerText;
    div.contentEditable = "false";
    div.setAttribute('class','activeTodo');
}
saveUpdateTodo = saveUpdateTodo.bind(todoList);

var activateTodo = function(i){
    this.taskList[i].status = "active";
    this.display();
}
activateTodo = activateTodo.bind(todoList);

function displayItem(){
    todoList.display();
}