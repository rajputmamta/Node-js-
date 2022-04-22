// const { query } = require("express");
let express=require("express");
let app= express();
app.use (express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "accesss-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type,Accept"
    );
    next();
});
const port =2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));

let {studentData}=require("./studentData.js");
// app.get("/svr/test",function(req,res){
//     res.send("Test Response1234");
// })

app.get("/svr/students",function(req,res){
    console.log("GET/svr/students",req.query);
    // console.log(req.query)
    // let coursStr=req.query.course;
    let  grad=req.query.grad;
    let courseStr=req.query.course;
    let sort=req.query.sort
    let arr1=studentData;
    if(courseStr){
    let courseArr=courseStr.split(",");
    // const arr1= studentData.filter((st)=>st.course==course);
    arr1=arr1.filter((st)=>courseArr.find((c1)=>c1===st.course));
    console.log(arr1)
    }
    if(grad){
        arr1=arr1.filter((st)=>st.grad===grad)
    }
    if(sort==="name")
    arr1.sort((st1,st2)=>st1.name.localeCompare(st2.name));

    if(sort==="course")
    arr1.sort((st1,st2)=>st1.course.localeCompare(st2.course));

 res.send(arr1);


});

app.get("/svr/students/:id",function(req,res){
    let id=+req.params.id;
    let student=studentData.find((st)=>st.id===id);
    if(student)
    res.send(student);
    else
    res.status(404).send("no student found")
});

app.get("/svr/students/cours/:name",function(req,res){
    let name=req.params.name;
    const arr1=studentData.filter((st)=>st.course===name);
    res.send(arr1);

    
})