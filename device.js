import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyD67hLkwIzUoe8oNVhQJ2twFOorlvWuJBo",
  authDomain: "dismechsite-7fc00.firebaseapp.com",
  databaseURL: "https://dismechsite-7fc00-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dismechsite-7fc00",
  storageBucket: "dismechsite-7fc00.firebasestorage.app",
  messagingSenderId: "25423952817",
  appId: "1:25423952817:web:dd5541d6e9f2aabd199b90"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const rescuecamp = ref(database, 'RESCUE_CAMP/DATA');


onValue(rescuecamp, (snapshot1) => {
    const campdata = snapshot1.val();
    console.log("campdata data fetched from Firebase:", campdata); 
  
    const campdataElement = document.getElementById('npeople');
    const devicestatusElement = document.getElementById('status');
    
     if (campdata === 16) {
      campdataElement.innerText = "3";
      devicestatusElement.innerText ="IN RESCUE CAMP";
      
     
    } else if (campdata === 15) {
      campdataElement.innerText = "4";
      devicestatusElement.innerText ="IN RESCUE CAMP";
      
      
    }  else  {
      campdataElement.innerText = "4";
      devicestatusElement.innerText ="MISSING";

      
    }

    

  
  }, (error) => {
    console.error("Error fetching campdata data:", error);
  });

  const writeDataToFirebase = (value) => {
    const dataRef = ref(database, 'message/message1'); 
    set(dataRef, value)
      .then(() => {
        console.log(`Data updated successfully with value: ${value}`);
    ;
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Error updating data: " + error.message);
      });
  };
window.addEventListener("load", () => {
  writeDataToFirebase(0);
});
  document.getElementById('button1').addEventListener('click', () => {
    writeDataToFirebase(1); 
   alert(`MESSAGE SENT SUCCESSFULLY(MESSAGE 1)`);
   setTimeout(() => writeDataToFirebase(0), 300);
  });
  
  document.getElementById('button2').addEventListener('click', () => {
    writeDataToFirebase(2); 
 alert(`MESSAGE SENT SUCCESSFULLY(MESSAGE 2)`);
 setTimeout(() => writeDataToFirebase(0), 300);
  });
  
  document.getElementById('button3').addEventListener('click', () => {
    writeDataToFirebase(3); 
 alert(`MESSAGE SENT SUCCESSFULLY(MESSAGE 3)`);
 setTimeout(() => writeDataToFirebase(0), 300);
  });









