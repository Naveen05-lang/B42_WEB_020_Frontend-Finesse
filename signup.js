document.getElementById('btn').addEventListener('click',userData);


function userData(event){
     event.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let fName=document.getElementById('FirstName').value;
    let lName=document.getElementById('LastName').value;
    storeUserData(email,password,fName,lName);
}

function storeUserData(email,password,fName,lName){
    let data={
        email,
        password,
        fName,
        lName
    };
    
    fetch(`https://b42-web-020-frontend-finesse-default-rtdb.firebaseio.com/users.json`,{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((info)=>{
        alert('added succefully');
    })
    .catch((err)=>console.error(err))
}