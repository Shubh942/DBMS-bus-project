function Validate() {
    var password = document.getElementById("txtPassword").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    if (password != confirmPassword) {
        document.getElementById("message").innerHTML = "Wrong Password"; 
        return false;
    }
    else if(password == confirmPassword){
        document.getElementById("message").innerHTML = "";
        return true;
    }
    return true;
}