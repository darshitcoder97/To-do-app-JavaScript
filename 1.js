let arr = JSON.parse(localStorage.getItem("tasks")) || [];
window.onload = function loadData() {
  getData(arr);
};
const getData = (arr) => {
  document.querySelector("li").innerHTML = "";
  if (!arr.length) {
    document.querySelector("li").innerHTML = "No Data";
    return;
  }
  arr.forEach((task) => {
    const li = document.querySelector("li");
    const div = document.createElement("div");
    div.className="view";
    div.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="checked" ${task.complated ? 'checked' : ''}>
    <input type="text" value="${task.name}" class="task" ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <button class="destroy" onclick="removeTask(this)"></button>`
    li.insertBefore(div,li.children[0]);
  });
  numberOfActive()
};
const addTodo = () => {
  let name = document.getElementById("task").value;
  let tasks = {
    name,
    complated: false,
  };
  if (!name) {
    alert("Please add some task!");
    return;
  }
  let chektask = checkTasks(name);
  if (chektask) {
    alert("task alerady exist");
    return;
  }
  

  arr.push(tasks);
  setItem(arr);
  getData(arr);
  document.getElementById("task").value=null;
};

const checkTasks = (name) => {
  const checkData = arr.find((task) => task.name === name);
  return !!checkData;
};

let currentTask = null;

function removeTask(event) {
  const foundIndex = arr.findIndex(task=> task.name === event.parentNode.children[1].value)
  if (foundIndex === -1) return
  arr.splice(foundIndex, 1)
  setItem(arr);
  event.parentElement.remove();

}

function taskComplete(event) {
  // arr.forEach((task) => {
  //   if (task.name === event.nextElementSibling.value) {
  //     task.complated = !task.complated;
  //   }
  //   return task;
  // });
  const foundIndex=arr.findIndex((task)=>task.name === event.nextElementSibling.value);
  if(foundIndex===-1)return
  // arr[foundIndex].complated=!arr[foundIndex].complated;
  // let data = { name: arr[foundIndex].name, complated:!arr[foundIndex].complated};
  arr.splice(foundIndex,1, { name: arr[foundIndex].name, complated:!arr[foundIndex].complated})
  // arr.splice(foundIndex,1,{...arr[foundIndex], complated: !arr[foundIndex].complated})
  setItem(arr);
}

function getCurrentTask(event) {
  currentTask = event.value;
}

function editTask(event) {
  if (!event.value) {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  let check=arr.find((task) => task.name === event.value);
  
  if(check){
    alert("task aleredy exist");
    event.value = currentTask;
    return;

  }
    const foundIndex=arr.findIndex((task)=>task.name===currentTask);
     if(foundIndex===-1)return;
    arr.splice(foundIndex,1, {name:event.value,complated:false})
    setItem(arr);
}
const taskComplated = (type) => {
  let filterData;

  switch (type) {
    
    case "clearcomplated":
        filterData = arr.filter((task) => !task.complated);
        arr = filterData;
        localStorage.setItem("tasks",JSON.stringify(arr))
        break;
    
    case "all":
      filterData = arr;
      break;

    case "todo":
      filterData = arr.filter((task) => !task.complated);
      break;

    case "complated":
      filterData = arr.filter((task) => task.complated);
      break;
    
    default:
      break;
  }

  getData(filterData);
  numberOfActive()
};

const numberOfActive = () => { 
  const filterArr = arr.filter((task)=> !task.complated)
  document.getElementById("count").innerHTML = `Active task ${filterArr.length}` 
};

const setItem = (arr)=>{
    localStorage.setItem("tasks",JSON.stringify(arr));
    numberOfActive();
}