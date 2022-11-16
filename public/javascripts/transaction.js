function myFunction() {

    //Get value of input type file
    var userInput = document.getElementById("myFile");
    console.log(userinput);
    //Store value into LocalStorage
    // localStorage.setItem("image", JSON.stringify(userInput))
  }
  
  // Display "image" in Local storage as src of img preview even after page refreshes
//   document.getElementById("imagePreview").setAttribute("src", JSON.parse(localStorage.getItem("image")))