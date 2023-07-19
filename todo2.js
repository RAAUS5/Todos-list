let local__storage = JSON.parse(localStorage.getItem("localstorage"))
let inputBox = document.querySelector('#inputbox')
let addBtn = document.querySelector('.btnadd')
let box2 = document.querySelector('.item')
let data = []

async function gettodos(){
     try{
            let listData= await fetch('https://dummyjson.com/todos')
            let response = await listData.json()
            data = response.todos;
            localStorage.setItem("localstorage",JSON.stringify(data))
            renderdata(data);
    }
    catch(err){
        console.log(err);
    }
}
gettodos()


addBtn.addEventListener('click',(e)=>{
    if (e.target.innerText === 'Add') {
        let dataobject = {
            'id': Math.random(),
            'todo': inputBox.value
        }
        console.log(dataobject.id)
        data.unshift(dataobject)
        renderdata(data)

        localStorage.setItem("localstorage",JSON.stringify(data))
        console.log(localStorage)
    }
    else if (e.target.innerText === 'Save') {
        todoToEdit = data.filter(todo => todo.todo = todo.id === editId ? inputBox.value : todo.todo)
        addBtn.innerText = 'Add'
        addBtn.classList.remove('active')
        localStorage.setItem("localstorage",JSON.stringify(data))
        renderdata(data)
   
    }
    console.log(data)
})

function renderdata(dataobject){

    box2.innerHTML = ""
    inputBox.value = ""
    dataobject.forEach((capture)=>{
        let divtodo = `
            <div class="para"><p>${capture.todo}</p></div>
            <div class="itembtn">
                    <button class="editbtn" onclick="handleTodoedit(${capture.id})">edit</button>
                <button class="deletebtn" onclick="handleTodoActions('del',${capture.id})">delete</button>
            </div>`
        box2.innerHTML+=divtodo
    })

}


let handleTodoActions = (type, id) => {
    if (type === 'del') {
       data = data.filter(deleteobject => {
            if (id !== deleteobject.id) return deleteobject
        })
        localStorage.setItem("localstorage",JSON.stringify(data))
        renderdata(data)
        
        console.log(data)
    }}

function handleTodoedit(id) {  
    addBtn.innerText = "Save";
     [todoToEdit] = data.filter((todo) => todo.id === id);
    console.log(todoToEdit.todo)
    inputBox.value = todoToEdit.todo;
    editId = todoToEdit.id; 
    localStorage.setItem("localstorage",JSON.stringify(data))
}

if(local__storage) {
    data = local__storage
    renderdata(data)
}

if(local__storage){
    todo = local__storage
    renderdata(todo)
}       
else{
    gettodos()
}