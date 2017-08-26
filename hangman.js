var password = "Java Script";
password = password.toUpperCase();

var passwordLength = password.length;
var failsNo = 0;

var hashedPassword = "";

for (var i=0; i<passwordLength; i++){
    if(password.charAt(i) == " ") {
        hashedPassword = hashedPassword + " ";
    }
    else{
        hashedPassword = hashedPassword + "-";
    }
}

function writeHashedPassword(){	
    document.getElementById("passwordBoard").innerHTML = hashedPassword;
}

window.onload = start;

var letters = ["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"]

function start(){

    var lettersBoard ="";

    for (i=0; i<=34; i++){
        var element = "let" + i;
        lettersBoard = lettersBoard + '<div class="letter" onclick="checkLetter('+i+')"  id="' + element + '">' + letters[i] + '</div>';

        if ((i+1) % 7 == 0) {
            lettersBoard = lettersBoard + '<div style="clear:both;"></div>'
        }
    }

    document.getElementById("alphabet").innerHTML = lettersBoard;

    writeHashedPassword();
}

String.prototype.setLetter = function(position, letter){
    
    if (position > this.length - 1) return this.toString();
    else return this.substr(0,position) + letter + this.substr(position+1); 
}

function checkLetter(no)
{
    var hit = false; 

    for(i=0; i<passwordLength; i++)

    {
        if (password.charAt(i)==letters[no]){
            hashedPassword = hashedPassword.setLetter(i,letters[no]);
            hit = true;
        }
    }

    if(hit == true){
        var element = "let" + no ;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        writeHashedPassword();
    }
    else{
        var element = "let" + no ;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick" , ";");

        //fail
        failsNo++;
        console.log(failsNo);
        console.log(failsNo);
        var picture = "img/s"+ failsNo + ".jpg";
        document.getElementById("hangman").innerHTML = '<img src="'+picture+'" alt="" />';
    }

    //win
    if (password == hashedPassword){
        document.getElementById("alphabet").innerHTML = "Congratulations! You have guessed the correct password:" + password + '<br/><br/><span class = "reset" onclick = "location.reload()"> Want to play again?</span>';
    }

    //loose
    if(failsNo>=9){
        document.getElementById("alphabet").innerHTML = "You have lost, the right password is: " + password + '<br/><br/><span class = "reset" onclick = "location.reload()"> Want to play again?</span>';
    }
}