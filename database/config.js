const mongoose = require ('mongoose');


// PORT=3000
// DB_CNN=mongodb+srv://
// URL=@cluster0.mq5jqxe.mongodb.net/
// USER=mean_user
// PASS=Xf3HNQJe7w1VoFrR
// DB=hospitaldb

const dbConnection =  async () => {

    try {
        await mongoose.connect(process.env.DB_CNN + process.env.USER + `:` +
            process.env.PASS + process.env.URL + process.env.DB ,
         {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           //useCreateIndex: true,
        });
        console.log('DB online');
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de inciar la DB ver logs');
    }
}

module.exports = {
    dbConnection 
}
