const express = require('express')
const app = express()
const joi = require('joi')

app.use(express.json())

courses = [
    {
        id: 101,
        name: "IPT"
    },
    {
        id: 102,
        name: "IOT"
    },
    {
        id: 103,
        name: "SMD"
    }
]

app.get('/',(req,res)=> {
    res.send("Hello World")
})

app.get('/api/courses',(req,res)=>{
    res.send(courses)
    console.log("courses api")
})

app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(c => c.id === parseInt(req.params.id))
   if(!course) res.status(400).send("The searched course not found!!!")
   res.send(course)
})

app.post('/api/courses',(req,res)=>{
    const schema = joi.object({
        name: joi.string().min(3).required()
    })
    const { error } = schema.validate(req.body);
    if(error){
        res.status(404).send(error)
        return
    }
    const course = {
        id: courses.length+1+100,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id',(req,res)=>{
    // Check the presence of course i.e. the entered course is present in the list or not
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(400).send("The searched course not found!!!")
    // Check the validation of the course
    const schema = joi.object({
        name: joi.string().min(3).required()
    })
    const { error } = schema.validate(req.body);
    if(error){
        res.status(404).send(error)
        return
    }
    // Update the course
    course.name = req.body.name;
    // return the updated course
    res.send(course)

})

app.delete('/api/courses/:id',(req,res)=>{
    //course not found
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(400).send("The searched course not found!!!")
    //delete the course
    const index = courses.indexOf(course)
    courses.splice(index,1)
    //return the deleted course
    res.send(course)
})

const port = process.env.PORT||3000;
console.log(process.env.PORT)
app.listen(port, console.log(`Listening on Port: ${port}`))
