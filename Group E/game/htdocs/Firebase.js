// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import * as firestore from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import { getFirestore, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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

// New functions
export async function getUsersFromFirestore(collectionName) {
    const usersCollection = collection(db, collectionName);
    const q = query(usersCollection, orderBy("score", "asc"), limit(10));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  }
  

  export async function showScoreboard() {
    const topTenUsers = await getUsersFromFirestore("result");
  
    // Create a fixed-position modal content container
    const modalContent = document.createElement("div");
    modalContent.id = "modalContent";
    modalContent.style.cssText = `
      position: fixed; // Fixed position for the modal
      top: 50%; // Center vertically
      left: 50%; // Center horizontally
      transform: translate(-50%, -50%); // Center precisely
      width: 40%; // Set the width of the modal
      max-height: 55%;
      overflow: auto; // Enable scrolling if content exceeds max-height
      padding: 10px; // Padding around the content
      border-radius: 10px; 
      z-index: 1000; // Set a high z-index to appear above other elements
      display: flex; // Use flex display
      flex-direction: column; // Stack children vertically
      justify-content: space-between; // Space between children elements
    `;
    document.body.appendChild(modalContent);
  
    // Create a title for the modal
    const title = document.createElement("h2");
    title.textContent = "HIGHSCORE (TOP 10)";
    title.style.marginTop = "5px"; 
    title.style.textAlign = "center"; // Center the title
    title.style.fontSize = "28px"; // Adjust font size for the title
    title.style.fontFamily = "'fantasy', sans-serif";
    title.style.color = "white";
    modalContent.appendChild(title);
  
    // Create a table for the scores
    const scoreTable = document.createElement("table");
    scoreTable.id = "scoreTable";
    scoreTable.className = "scoreboard-table";
    scoreTable.style.width = "100%"; 
    scoreTable.style.maxHeight = "10%"; 
    scoreTable.style.color = "white";
    scoreTable.style.borderCollapse = "collapse"; 
    scoreTable.style.textAlign = "center";
    scoreTable.style.fontFamily = "'fantasy', sans-serif";
    scoreTable.style.borderRadius = "10px"; 

    modalContent.appendChild(scoreTable);
  
    // Create a body for the table
    const scoreTableBody = document.createElement("tbody");
    scoreTable.appendChild(scoreTableBody);
  
    // Populate the table with user scores
    topTenUsers.forEach((user, index) => {
      const row = document.createElement("tr");
      row.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      row.style.height = "18px"; 
      row.style.fontFamily = "'fantasy', sans-serif";
      row.style.fontSize = "13px";

      // Display only the first 25 characters of playerName
      let truncatedName = user.playerName.slice(0, 25)
      // add ... if playerName is longer than 25 characters
      if (user.playerName.length > 25)
        truncatedName += "..."

      row.innerHTML = `
      <td>${index + 1}</td>
      <td>${truncatedName}</td>
      <td>${user.score}</td>
      `;
      scoreTableBody.appendChild(row);
    });
  
  }