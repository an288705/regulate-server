require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

/* connect to db */
const db = require('./firebase');

/*set up express server on whichever database port is open*/
const PORT = process.env.PORT || 3500 

app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors());

//import routes
const { collection, getDocs } = require("firebase/firestore");
async function hi(){
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    });
}
hi();

// app.listen(PORT,()=>{
//     console.log('listening on '+PORT);
// });
