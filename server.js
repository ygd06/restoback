const mongoose = require('mongoose');
const app = require('./app');


const uri = "mongodb+srv://deepak:ygd1310@cluster18.z9es6tc.mongodb.net/?retryWrites=true&w=majority";


async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }
}

connect()

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server listen on port ${PORT}`))
