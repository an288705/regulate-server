const route = require('express').Router();
const db = require('../firebase');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { collection, doc, getDoc } = require("firebase/firestore");

route.post('/',(req,result)=>{
    const auth = getAuth();
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        //get uid and search firestore table
        async function getUserInfo(){
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            let userInfo = userSnap.data();
            userInfo['_id']=user.uid;
            userInfo['name']=user.displayName;
            userInfo['email']=user.email;

            return result.send(userInfo);
        }

        getUserInfo();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        return result.status(400).send({error:errorMessage});
    });
});

module.exports = route;