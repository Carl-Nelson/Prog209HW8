let userArray = [];
let gameArray = [];
let reviewArray = [];
let currentUser = "You are not logged in";

var GameObject = function(name, year, genre) {
  this.name = name;
  this.year = year;
  this.genre = genre;
}

var ReviewObject = function(gameName, review, rating, user) {
  this.gameName = gameName; //gonna associate games n' reviews via the name
  this.review = review;
  this.rating = rating;
  this.user = user;
}

// define a constructor to create user objects
var userObject = function (Name) {
  this.name = Name;
}



function createList()
{
  //oddly enough the jquery mobile collapsible set stuff below doesn't work unless I use jquery to get the div
  var divUserlist = $("#divUserlist");
  //and this next line doesn't work unless I use plain ole html to grab the div
  document.getElementById("divUserlist").innerHTML = "";// remove old data
  //conclusion? I hate jquery mobile. jquery is fine. jquery mobile? there's probably a reason it was abandoned years ago.

  gameArray.forEach(function (element) {   // use handy array forEach method
    //did you know javascript has string interpolation? I didn't! They call 'em template strings apparently
    let content = `<div data-role='collapsible' data-theme='b' data-content-theme='a' data-parm='${element.name}'><h3>${element.name}</h3>
                  <p>Year:${element.year}<br>Genre:${element.genre}<br>
                  <button data-role='button'class="addButton">Add to library</button>&nbsp<button data-role='button' class="detailButton">View Details</button></p></div>`;
                  //the button styles worked, and now they don't. Why? Who knows!
      divUserlist.append(content).collapsibleset("refresh");//add the new collapsible widget to the set, then refresh the set
    });

  // var ul = document.createElement('div');
  // ul.setAttribute("data-role","collapsible-set");
  // ul.setAttribute("data-theme","b");
  // ul.setAttribute("data-content-theme","a");
  // userArray.forEach(function (element,) {   // use handy array forEach method
  //   var li = document.createElement('div');
  //   ul.setAttribute("data-role","collapsible");
  //   ul.setAttribute("data-theme","b");
  //   ul.setAttribute("data-content-theme","a");
  //   li.innerHTML = "<a data-transition='pop' class='onePlayer' data-parm=" + element.name + "  href='#page3'>Jump </a> " + element.name;
  //   ul.append(li);
  // });
  // divUserlist.append(ul);

  //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
  var classname = document.getElementsByClassName("oneGame");
  Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            console.log(parm);
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#details";
        });
    });
  console.log(gameArray);
};

document.addEventListener("DOMContentLoaded", function () {

    player0 = new userObject("firstPerson");
    player1 = new userObject("secondPerson");
    player2 = new userObject("thirdPerson");

    userArray.push(player0);
    userArray.push(player1);
    userArray.push(player2);

    gameArray.push(new GameObject("game1", 2000, "Real Time Strategy"));
    gameArray.push(new GameObject("game2", 2001, "First Person Shooter"));
    gameArray.push(new GameObject("game3", 2002, "Turn Based Strategy"));
    gameArray.push(new GameObject("game4", 2000, "Action Adventure"));
    gameArray.push(new GameObject("game5", 2001, "Real Time Strategy"));
    gameArray.push(new GameObject("game6", 2002, "First Person Shooter"));
    console.log(userArray);

    // createList();

    $(document).on("pagebeforeshow", "#page1", function (event) {   // have to use jQuery 
    // document.getElementById("IDparmHere").innerHTML = "";
      createList();
    });

});