const baseadres = 'https://localhost:5001/todos/';
async function getTodos(apikey){
  let response = await fetch(baseadres, { 
    headers: {
      'ApiKeyModel': `${apikey}`
  },});

  var todos =  await response.json();

  return todos;
} 
async function crateTodo(todoItem, apikey){
  let response= await fetch(baseadres, {
 method: 'POST',
 body: JSON.stringify(todoItem),
 headers: {
   'Content-type': 'application/json; charset=UTF-8',
   'ApiKeyModel': `${apikey}`
 },
})
let body = await response.json();
console.log(body)
return body
}
 async function deleteTodo(id, apikey){
 await fetch('https://localhost:5001/todos/' + id, {
method: 'DELETE',
headers: {
  'ApiKeyModel': `${apikey}`
}
});
};
async function uptadeTodo(id, todo, apikey){
  let response = await fetch(baseadres + id, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'ApiKeyModel': `${apikey}`
    }
  })
  let body = await response.json();
  return body;
};
async function updateTodoStatus(id, apikey) {
  const response = await fetch(`${baseadres}${id}/toggleStatus`, {
      method: "PATCH",
      headers: {
        'ApiKeyModel': `${apikey}`
      }
  });
}
async function getApi(username, password){
  let response = await fetch(`https://localhost:5001/apiKay?username=${username}&password=${password}`, { 
    headers: {
    
  },});
  var apiKey =  await response.json();

  return apiKey;
} 