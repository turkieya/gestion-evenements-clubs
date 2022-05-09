const mongoose = require ('mongoose');
mongoose. connect('mongodb://localhost:27017/efpm',{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify : false}).then
  (()=>{
console.log('Database sucessfully conected');},
 error=>{
    console.log('Database could not connected :'+ error );}
  
);
module.exports=mongoose;