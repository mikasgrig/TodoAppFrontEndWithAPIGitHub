// Pasimti duomenys
var add = document.getElementById('todo-form')
var card = document.getElementById('todos')
var card1 = document.getElementById('dones')
var forms = document.querySelectorAll('.needs-validation')
var button = document.querySelector('.move-todo')
var button1 = document.querySelector('.move-toback')
var titleInput = document.getElementById("todo-input")
var descriptionInput = document.getElementById("todo-input1")
var username = document.getElementById("username")
var password = document.getElementById("password")
var difficultyInput = document.getElementById("todo-input3")
var myModal = document.getElementById('exampleModal')
var titleUptadeInput = document.getElementById("todo-input4")
var descriptionUptadeInput = document.getElementById("todo-input5")
var difficultyUptadeInput = document.getElementById("todo-input6")
var h4;
var idUptade
var apikeyValid = "93a19012394c4b169b6323573949b35e";

document.addEventListener('click',async function (e) {
  if (e.target.matches('#btn6')) {
  const apikeys = await getApi(username.value, password.value)
  apikeys.forEach(apikey => {
    console.log(apikey.apiKey)
  } )
    
    
  }
});

window.onload = async ()  => {
  const todos = await getTodos(apikeyValid);
  todos.forEach(todo => {
    var cardnew = `<div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item" id = ${todo.id} data = ${JSON.stringify(todo)}>
    <h3 id = "todoItem-title" class="mb-3 input-name mano"> ${todo.title}</h3>
    <p id = "todoItem-description" class="mb-3 input-name mano"> ${todo.description}</p>
    <p id="todoItem-difficulty" class="mb-3 input-name mano"> ${todo.difficulty}</p>
    <button class="btn btn-danger delete" type="button">Delete</button>
    <button class="btn btn-success move-todo" type="button">${todo.isDone ? "Move to Back" : "Move to Done"}</button>
    <button class="btn btn-warning edit" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    </div>
   `
    if (todo.isDone === false) {
      card.innerHTML += cardnew
    } else {
      card1.innerHTML += cardnew
    }
  });
};

forms[0].addEventListener('submit',async function (e) {
  e.preventDefault()
  var todoItem = {
    title : titleInput.value, 
    description : descriptionInput.value, 
    difficulty : difficultyInput.value
  }
  if (todoItem.title.length <= 0 && todoItem.description.length <= 0) {
    document.getElementById("todo-input").classList.add('is-invalid')
    document.getElementById("todo-input1").classList.add('is-invalid')
  } if(todoItem.title.length <= 0 ){
    document.getElementById("todo-input").classList.add('is-invalid')
  }if(todoItem.description.length <= 0 ){
    document.getElementById("todo-input1").classList.add('is-invalid')
  }else {
    
    await crateTodo(todoItem, apikeyValid);
    // titleInput.value = "";
    // descriptionInput.value = "";
    // difficultyInput.value = "Easy";
    add.reset();
    document.getElementById("todo-input").classList.remove('is-invalid')
    document.getElementById("todo-input1").classList.remove('is-invalid')
    location.reload();
  }
});
document.addEventListener('click',async function (e) {
  if (e.target.matches('#btn6')) {
  const apikeys = await getApi(username.value, password.value, apikeyValid)
  apikeys.forEach(apikey => {
    if(apikey.isActive){
      apikeyValid = apikey.apiKey
   }
  } )
    console.log(apikeyValid)
    location.reload();
  }
  if (e.target.matches('.delete')) {
    var id = e.target.closest(".todo-item").id;
    deleteTodo(id, apikeyValid);
    location.reload();
  }
  else if (e.target.matches('.move-todo')) {
    let id = e.target.closest(".todo-item").id;
    await updateTodoStatus(id, apikeyValid);
    location.reload();
  }
  if (e.target.matches('.edit')) {
    var dotoItem = e.target.closest(".todo-item").data
    console.log(dotoItem)
    let title = e.target.closest(".todo-item").querySelector("#todoItem-title");
    let description = e.target.closest(".todo-item").querySelector("#todoItem-description");
    let difficulty = e.target.closest(".todo-item").querySelector("#todoItem-difficulty");
    titleUptadeInput.value = title.innerText;
    descriptionUptadeInput.value = description.innerText;
    difficultyUptadeInput.value = difficulty.innerText;
    idUptade = e.target.closest(".todo-item").id;
    console.log(idUptade)
  }
  if (e.target.matches('.save')) {
    if (titleUptadeInput.value.length <= 0 && descriptionUptadeInput.value.length <= 0) {
      document.getElementById("todo-input4").classList.add('is-invalid')
      document.getElementById("todo-input5").classList.add('is-invalid')
    } if(titleUptadeInput.value.length <= 0 ){
      document.getElementById("todo-input4").classList.add('is-invalid')
    }if(descriptionUptadeInput.value.length <= 0 ){
      document.getElementById("todo-input5").classList.add('is-invalid')
    }else {
      var todoItemUpdate = {
        title : titleUptadeInput.value, 
        description : descriptionUptadeInput.value, 
        difficulty : difficultyUptadeInput.value
      }
      console.log(difficultyUptadeInput.value);
      await uptadeTodo(idUptade, todoItemUpdate, apikeyValid)
      location.reload();

    }
  }
});







