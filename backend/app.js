const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://userone:userone@libraryfiles.o5pxy.mongodb.net/TRAINERMANGEMENT?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});


var app = new express();
app.use(express.json());
app.use(cors());

















app.listen(3000,()=>{
    console.log(`Listening to port 3000`)
})