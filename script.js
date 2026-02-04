function validateForm() {
    const username = document.getElementById("name").value.trim(); 
    const password = document.getElementById("password").value.trim(); 

    if (username === "earldec" && password === "54321") {
        return true; 
    } else {
        alert("Incorrect username or password. Please try again."); 
        return false;
    }
}
