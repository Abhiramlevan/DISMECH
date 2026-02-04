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


const alert = ref(database, 'MAIN/alert'); 
const rain = ref(database, 'MAIN/rain'); 
const ultra = ref(database, 'MAIN/ultra'); 
const house = ref(database, 'HOUSE/DATA'); 
const rescuecamp = ref(database, 'RESCUE_CAMP/DATA'); 
const rescueteam = ref(database, 'RESCUE_TEAM/DATA'); 



onValue(alert, (snapshot1) => {
  const alertData1 = snapshot1.val();
  console.log("Alert1 data fetched from Firebase:", alertData1); 

  const alertMessageElement = document.getElementById('ALERT');
  if (alertData1 === 1 ) {
    alertMessageElement.innerText = "GREEN ALERT";
    
  } else if (alertData1 === 2) {
    alertMessageElement.innerText = "YELLOW ALERT";
   
  } else if (alertData1 === 3) {
    alertMessageElement.innerText = "ORANGE ALERT";
    
  } else if  (alertData1 === 4) {
    alertMessageElement.innerText = "RED ALERT";
   
  }

}, (error) => {
  console.error("Error fetching alert1 data:", error);
});

  onValue(rain, (snapshot2) => {
    const rain = snapshot2.val();
    console.log("soidata  fetched from Firebase:", rain); 
   document.getElementById('rain').innerText = rain ;

 }, (error) => {
    console.error("Error fetching soildata data:", error);
  });

  onValue(ultra, (snapshot3) => {
    const ultradata = snapshot3.val();
    console.log("ultra fetched from Firebase:", ultradata); 
   document.getElementById('ultra').innerText = ultradata || "No data available";

 }, (error) => {
    console.error("Error fetching soildata data:", error);
  });

  onValue(rescuecamp, (snapshot4) => {
    const campdata = snapshot4.val();
    console.log("campdata data fetched from Firebase:", campdata); 
    const campdataElement = document.getElementById('PINCAMP');
    const missingElement = document.getElementById('MISSINGP');
    const moved = document.getElementById('MOVEDP');
    if (campdata === 15) {
     moved.innerText = "154";
     campdataElement.innerText = "39/120";
     missingElement.innerText = "146";
      
    }else{
      moved.innerText = "150";
      campdataElement.innerText = "35/120";
      missingElement.innerText = "150";
    }

    }, (error) => {
    console.error("Error fetching campdata data:", error);
  });

  onValue(house, (snapshot5) => {
    const housedata = snapshot5.val();
    console.log("house data fetched from Firebase:", housedata); 
  
    const houseElement = document.getElementById('DMESSAGE');
  
    if (housedata === 37 ) {
      houseElement.innerText = "(234)DANGER AND LOACTION GIVEN TO RESCUE TEAM";
  
      
    } else if (housedata === 38) {
      houseElement.innerText = "(234)(4)UPDATED DATA GIVEN TO RESCUE CAMP";
     
    } else if (housedata === 36) {
      houseElement.innerText = "(234)(3)UPDATED DATA GIVEN TO RESCUE CAMP";
      
    } else if (housedata === 44) {
      houseElement.innerText = "(234)(SHOCK)";
      
    } 

    

  
  }, (error) => {
    console.error("Error fetching housedata data:", error);
  });

  onValue(rescueteam, (snapshot6) => {
    const teamdata = snapshot6.val();
    console.log("team data fetched from Firebase:", teamdata); 
  
    const teamElement = document.getElementById('RMESSAGE');
    
  
  
    if (teamdata === 25) {
        teamElement.innerText = "(6)LOCATION RECEIVED";
    } else if (teamdata === 24) {
        teamElement.innerText = "(6)MISSION COMPLETE";
    } else if (teamdata === 20) {
        teamElement.innerText = "(6)MESSAGE1";
    } else if (teamdata === 21) {
        teamElement.innerText = "(6)MESSAGE2";
    } else if (teamdata === 22) {
        teamElement.innerText = "(6)MESSAGE3";
    }
}, (error) => {
    console.error("Error fetching team data:", error);
});




document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('accessForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const accessCode = Number(document.getElementById('accessCode').value);
    const errorMessage = document.getElementById('errorMessage');

    if (accessCode === 234) {
      window.location.href = "device.html";
    } else {
      errorMessage.textContent = "NO DEVICE FOUND.";
    }
  });
});



const rainCtx = document.getElementById("rainChart").getContext("2d");
const waterCtx = document.getElementById("waterChart").getContext("2d");

const rainValueEl = document.getElementById("rainValue");
const waterValueEl = document.getElementById("waterValue");

// Store last 7 readings
let rainData = [0, 0, 0, 0, 0, 0, 0];
let waterData = [0, 0, 0, 0, 0, 0, 0];

const labels = ["10m","20m","30m","40m","50m","60m","Now"];



const rainChart = new Chart(rainCtx, {
  type: "line",
  data: {
    labels,
    datasets: [{
      data: rainData,
      borderColor: "#48CFCB",
      backgroundColor: "rgba(72,207,203,0.3)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  }
});


const waterChart = new Chart(waterCtx, {
  type: "line",
  data: {
    labels,
    datasets: [{
      data: waterData,
      borderColor: "#2563EB",
      backgroundColor: "rgba(37,99,235,0.3)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  }
});



function updateRainStatus(value) {
  rainValueEl.textContent = value + " mm";
  rainValueEl.className = "";
  if (value < 2) rainValueEl.classList.add("alert-ok");
  else if (value <= 5) rainValueEl.classList.add("alert-warning");
  else rainValueEl.classList.add("alert-danger");
}

function updateWaterStatus(value) {
  waterValueEl.textContent = value + " m";
  waterValueEl.className = "";
  if (value < 1.5) waterValueEl.classList.add("alert-ok");
  else if (value <= 2.0) waterValueEl.classList.add("alert-warning");
  else waterValueEl.classList.add("alert-danger");
}



onValue(rain, (snapshot) => {
  const value = Number(snapshot.val());
  if (isNaN(value)) return;

  rainData.push(value);
  rainData.shift();

  rainChart.update();
  updateRainStatus(value);
});

onValue(ultra, (snapshot) => {
  const value = Number(snapshot.val());
  if (isNaN(value)) return;

  waterData.push(value);
  waterData.shift();

  waterChart.update();
  updateWaterStatus(value);
});
