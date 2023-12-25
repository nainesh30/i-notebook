const mongoose = require('mongoose');
const Mongouri = "mongodb://127.0.0.1/I-NOTEBOOK";
const connectToMongo = () => {
    mongoose.connect(Mongouri).then(()=>{console.log("Connection  successful")}).catch((err)=>{console.log(err)})
}






// isse mongo export ho jaega then we can import
module.exports = connectToMongo;