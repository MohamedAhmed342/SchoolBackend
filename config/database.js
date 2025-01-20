const { default: mongoose } = require("mongoose");

const dbConniction = () => {
  //mongodb+srv://GPUser:QVdwshVs84a1NAeE@cluster0.hj20t.mongodb.net/SchoolSystemDB
  mongoose.connect('mongodb+srv://GPUser:QVdwshVs84a1NAeE@cluster0.hj20t.mongodb.net/SchoolSystemDB').then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error: ${err}`);
    process.exit(1);
  });
};

module.exports = dbConniction;
 
//schooluser
//01120858144mm