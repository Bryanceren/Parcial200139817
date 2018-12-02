const mongoose=require('mongoose');
var PostSchema = new mongoose.Schema({
    nombre:String,
    facultad:String,
    numero:String
});
module.exports=mongoose.model('Post',PostSchema);