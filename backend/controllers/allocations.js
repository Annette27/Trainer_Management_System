const AllocData = require('../src/models/AllocData')


const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});


exports.getAllocations= async(req,res)=>{
    const allocations = await AllocData.find();
    // console.log(books)
    res.status(200).json({allocations})
}