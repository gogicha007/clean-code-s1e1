var taskInput = document.querySelector(".todos__new-task-input"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.querySelector(".todos__incomplete"); //incomplete-tasks
var completedTasksHolder = document.querySelector(".todos__complete"); //complete-tasks


var createNewTaskElement = function(taskString){
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    listItem.className = "todos__task-item"

    label.innerText = taskString;
    label.className = "todos__task-name todos__label";

    checkBox.type = "checkbox";
    checkBox.className = "todos__checkbox";

    editInput.type = "text";
    editInput.className = "todos__task-name todos__text-input";

    editButton.innerText = "Edit";
    editButton.className = "todos__btn todos__btn_edit";

    deleteButton.className = "todos__btn todos__btn_delete";

    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "todos__delete-btn-img";

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


var addTask = function(){
    console.log("Add Task...");

    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}


var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".todos__text-input");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".todos__btn_edit");
    var containsClass = listItem.classList.contains("todos__task-item_editMode");

    if(containsClass) {
        //switch to .editmode
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("todos__task-item_editMode");
};


var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}


var taskCompleted = function() {
    console.log("Complete Task...");

    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function() {
    console.log("Incomplete Task...");

    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
    //select ListItems children
    var checkBox=taskListItem.querySelector(".todos__checkbox");
    var editButton=taskListItem.querySelector(".todos__btn_edit");
    var deleteButton=taskListItem.querySelector(".todos__btn_delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}


//bind events to list items chldren(tasksCompleted)
for (var i=0; i < incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


//bind events to list items chldren(tasksIncompleted)
for (var i=0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
