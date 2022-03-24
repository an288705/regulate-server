const route = require('express').Router();
const db = require('../firebase');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { collection, doc, getDoc, setDoc } = require("firebase/firestore");

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

route.post('/create',(req,result)=>{
    const auth = getAuth();
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user)

        //create new firestore doc with user.uid
        async function addNewUser(){
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef,{
                addictions:[],
                goals:[],
                routine:[]
            });

            //now return requested into
            let userInfo = {};
            userInfo['_id']=user.uid;
            userInfo['name']=user.displayName;
            userInfo['email']=user.email;
            userInfo['role']='free';
            userInfo['addictions']=[];
            userInfo['goals']=[];
            userInfo['routine']=[];
            console.log(userInfo);

            return result.send(userInfo);
        }

        addNewUser();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        return result.status(400).send({error:errorMessage});
    });
});

module.exports = route;