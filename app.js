const express = require('express')
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path');
const { type } = require('os');

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); // if using form POST


mongoose.connect('mongodb://localhost:27017/testuser',{
    useNewUrlParser: true,
  useUnifiedTopology: true

}).then(()=>{
    console.log("db connected")
}).catch((error)=>{
    console.error('error',error)
});

const newUser = new mongoose.Schema ({
    name:String,
    age:Number,
    place:String,
    isBlocked:{type:Boolean,default:false},
})

const User = mongoose.model('user',newUser)





app.get('/',async (req,res)=>{
const user = await User.find({});
console.log(user);

    res.render('index',user)
})

app.post('/addUser',async (req,res)=>{
    try {
    const {name,age,place} = req.body;
    const newData = new User ({
        name:name,
        age:age,
        place:place,
    })
    console.log(newData)
    newData.save();
    res.json({ success: true, user: newData });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message });
    }
 
})





app.listen(4000,()=>{
    console.log('serrver is running')
})