console.log("Client side js file is loaded")

const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
message1.textContent=''

const weatherForm = document.querySelectorAll('form')[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    message1.textContent='loading...'
    message2.textContent=''
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            fetch('/weather?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response)=>{
                // https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}
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
    }else
    alert('Not able to capture location')

})
