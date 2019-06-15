const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for Express config
const directory = (path.join(__dirname,"../public"))
const viewDirectory = (path.join(__dirname,"../templates/views"))
const partials = (path.join(__dirname,"../templates/partials"))

//setup static directory to use images,assests,css
app.use(express.static(directory))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewDirectory)
hbs.registerPartials(partials)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Aditi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Aditi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Aditi',
        message:'This is help page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
           error:'Please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error
             })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                 })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        text:'No help article found',
        name:'Aditi'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        text:'No page found',
        name:'Aditi',
    })
})
app.listen('4201',()=>{
    console.log('Server started at port 4201')
})
