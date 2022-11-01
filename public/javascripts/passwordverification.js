function Validate() {
    var name=document.getElementById("txtName").value;
    if(name==""){
        document.getElementById("message1").innerHTML = "Please Enter Name";
    }
    else{
        document.getElementById("message1").innerHTML = "";
    }
    
   
    var roll_no=document.getElementById("txtRollNo").value;
    if(roll_no==""){
        document.getElementById("message2").innerHTML = "Please Enter Roll No";
    }
    else{
        document.getElementById("message2").innerHTML = "";
    }
        var email=document.getElementById("txtEmail").value;
        if(email==""){
            document.getElementById("message3").innerHTML = "Please Enter Email";
        }
        else{
            document.getElementById("message3").innerHTML = "";
        }
        var password = document.getElementById("txtPassword").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    if (password != confirmPassword||password==""||confirmPassword=="") {
        document.getElementById("message").innerHTML = "Wrong Password"; 
    }
    else if(password == confirmPassword){
        document.getElementById("message").innerHTML = "";
        return true;
    }
}
