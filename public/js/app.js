console.log("Client side js file is loaded")

let address = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
message1.textContent=''

const weatherForm = document.querySelectorAll('form')[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(address.value)
    message1.textContent='loading...'
    message2.textContent=''
fetch('/weather?address='+address.value).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        if(data.error){
               message1.textContent=data.error
            console.log(data.error)
        }else{
               message1.textContent=data.location
               message2.textContent=data.forecast
           console.log(data.forecast,data.location)
        }
    })
})
})
