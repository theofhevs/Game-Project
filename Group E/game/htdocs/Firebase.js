// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import * as firestore from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlSWKUcbSWjTQQ9C97YZHMAf-QEqR2o1A",
  authDomain: "tremendous-journey.firebaseapp.com",
  projectId: "tremendous-journey",
  storageBucket: "tremendous-journey.appspot.com",
  messagingSenderId: "962055647718",
  appId: "1:962055647718:web:966086c2b243c10ff1a627",
  measurementId: "G-Y3XXKWJHY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);


// Add a new document in collection "cities"
// db -> collection -> document -> data (sous - collection)


export async function addDoc(collection,username,time){
    console.log(collection,username,time);
    await firestore.setDoc(firestore.doc(db,collection, username),{
        "playerName":username,
        "score":time
    });
}

//addDoc("result","toto","1234")
// Get all the documents
export async function dumpCollection(collection){
    let resultCollection = firestore.collection(db, collection);
    const querySnapshot = await firestore.getDocs(resultCollection);
    if (querySnapshot.empty) {
        console.log("No matching documents.");
    }

    // Return the data
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    console.log("Document data:", data);

}



   
