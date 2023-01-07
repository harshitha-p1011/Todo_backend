requestAnimationFrame("dotenv/config");
const express=require("express");
const mongoose= require("mongoose");
const user= require("./models/user");
const bodyParse= require("body-parse");
const cors= require("cors");
const port= process.env.PORT || 5000;
mongoose.connect("mongodb+srv://harshitha:YsI3ayjSxAIJx94v@cluster0.j7aihla.mongodb.net/?retryWrites=true&w=majority");
const app=express();
app.use(bodyParse.urlencoded({
    extended:false
}));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) =>{
    res.send("hello world");
});
app.post("/register", async(req,res)=>{
    try{
        let user= await user.find({
            username: req.body.username
        });
        if(user[0]){
            res.send({
                message: "user Already Exist",
            });
        } else{
            await user.create(req.body);
            res.send({
                message: "User Created",
            });
        }
    } catch(error){
        res.send({
            message: error.message,
        });
    }
});
app.post("/singin", async(req, res)=>{
    try{
        let user= await user.find({
            username: req.body.username
        });
        if(user[0]){
        if(user[0]["password"]===req.body.password){
            res.send(user[0]);
        } else{
            res.send({
                message: "Invalid password",
            });
        } 
    }else {
            res.send({
                message: "Invalid User",
            });
        }
    } catch(error){
        res.send({
            message: error.message,
        });
    }
});
app.post("/update", async(req,res)=>{
    try{
        let users= await user.find({
            username: req.body.username
        });
        await user.updateOne({
            username: req.body.username},
            {...users, data:req.bod.data});
            res.send({
            message: "updated successfully"
        });    
    } catch(error){
        res.send({
            message: error.message
        });
    }
});

app.listen(post, () =>console.log(`server running on port ${port}`));