let body = document.body;
let heading = document.createElement('h1')
let userexit = localStorage.getItem('user')
if(userexit){
    heading.innerText = `welcome ${userexit}`
    body.appendChild(heading) 
}else{
   let username= prompt("hello please enter name")
   localStorage.setItem("user",username)
   heading.innerText = `hello ${username}`
   body.appendChild(heading) 
}

