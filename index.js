let userArray = [];
let gameArray = [];
let reviewArray = [];
let gameCollection = [];
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
//not really being used for anything worthwhile yet
var userObject = function (Name) {
  this.name = Name;
}

function createList()
{
  //oddly enough the jquery mobile collapsible set stuff below doesn't work unless I use jquery to get the div
  var divUserlist = $("#divUserlist");
  //and this next line doesn't work unless I use plain ole html to grab the div
  document.getElementById("divUserlist").innerHTML = "";// remove old data

  gameArray.forEach(function (element) {
    
    let content = `<div data-role='collapsible' data-theme='b' data-content-theme='a' class='oneGame'><h3>${element.name}</h3>
                  <p>Year:${element.year}<br>Genre:${element.genre}<br>
                  <button data-role='button' class="addButton" gameName=${element.name}>Add to library</button>&nbsp
                  <button data-role='button' data-parm='${element.name}' class="detailButton">View Details</button></p></div>`;
                  //the button styles worked, and now they don't. Why? Who knows!
      divUserlist.append(content).collapsibleset("refresh");//add the new collapsible widget to the set, then refresh the set
    });

  //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
  var classname = document.getElementsByClassName("detailButton");
  Array.from(classname).forEach(function (element) {
    element.addEventListener('click', function(){
      var parm = this.getAttribute("data-parm");  // passing in the record.Id
      console.log(parm);
      //do something here with parameter on pickbet page
      document.getElementById("IDparmHere").innerHTML = parm;
      $.mobile.navigate("#details");
    });
  });
  var classname = document.getElementsByClassName("addButton");
  Array.from(classname).forEach(function (element) {
    element.addEventListener('click', function(){
      let gameName = this.getAttribute("gameName");
      //make sure the game isn't already in the collection
      for (let i = 0; i < gameCollection.length; i++) {
        if (gameCollection[i].name === gameName) {
          this.innerHTML = "Already in library";
          return;
        }
      }
      //find the proper game object to add to the collection
      for (let i = 0; i < gameArray.length; i++) {
        if (gameName === gameArray[i].name) {
          gameCollection.push(gameArray[i]);
          this.innerHTML = "Game added";
        }
      }
    });
  });
  console.log(gameArray);
}

function compareTitle(a, b) {
  // Use toUpperCase() to ignore character casing
  const gameA = a.name.toUpperCase();
  const gameB = b.name.toUpperCase();

  let comparison = 0;
  if (gameA > gameB) {
    comparison = 1;
  } else if (gameA < gameB) {
    comparison = -1;
  }
  return comparison;
}


function compareGenre(a, b) {
  // Use toUpperCase() to ignore character casing
  const gameA = a.genre.toUpperCase();
  const gameB = b.genre.toUpperCase();

  let comparison = 0;
  if (gameA > gameB) {
    comparison = 1;
  } else if (gameA < gameB) {
    comparison = -1;
  }
  return comparison;
}
//this... might be unnecessary
function compareYear(a, b) {
  const gameA = a.year;
  const gameB = b.year;

  if (gameA > gameB) {
    return 1;
  } else if (gameA < gameB) {
    return -1;
  } else {
    return 0;
  }
}

function displayCollection() {
    //oddly enough the jquery mobile collapsible set stuff below doesn't work unless I use jquery to get the div
    var collection = $("#collection");
    //and this next line doesn't work unless I use plain ole html to grab the div
    if (gameCollection.length === 0) {
      document.getElementById("collection").innerHTML = "";
      collection.append("<p>Your library is empty. Add some games!</p>");
    }
    else {
      document.getElementById("collection").innerHTML = "";// remove old data
  
      gameCollection.forEach(function (element) {
        
        let content = `<div data-role='collapsible' data-theme='b' data-content-theme='a' class='oneGame'><h3>${element.name}</h3>
                      <p>Year:${element.year}<br>Genre:${element.genre}<br>
                      <button data-role='button' class="removeButton" gameName=${element.name}>Remove from library</button>&nbsp
                      <button data-role='button' data-parm='${element.name}' class="detailButton">View Details</button></p></div>`;
                      //the button styles worked, and now they don't. Why? Who knows!
          collection.append(content).collapsibleset("refresh");//add the new collapsible widget to the set, then refresh the set
        });
    
      //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
      var classname = document.getElementsByClassName("detailButton");
      Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
          var parm = this.getAttribute("data-parm");  // passing in the record.Id
          console.log(parm);
          //do something here with parameter on pickbet page
          document.getElementById("IDparmHere").innerHTML = parm;
          $.mobile.navigate("#details");
        });
      });
      console.log(gameCollection);

      var classname = document.getElementsByClassName("removeButton");
      Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
          let gameName = this.getAttribute("gameName");
          //find the game to remove
          for (let i = 0; i < gameCollection.length; i++) {
            if (gameCollection[i].name === gameName) {
              this.innerHTML = "Game removed";
              //this removes the element and changes the length of the array
              gameCollection.splice(i,1);
              displayCollection();
            }
          }
        });
      });
    }
}

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

    reviewArray.push(new ReviewObject("game1","This game sucks.", 1, "firstPerson"));
    reviewArray.push(new ReviewObject("game2","Game of the year, every year.", 5, "secondPerson"))

    //so that the home page isn't empty on first load
    displayCollection();

    $(document).on("pagebeforeshow","#home", function(event){
      displayCollection();
    });

    $(document).on("pagebeforeshow", "#page1", function (event) {   // have to use jQuery 
      document.getElementById("IDparmHere").innerHTML = "";
      createList();
    });

    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
      let localTitle = document.getElementById("IDparmHere").innerHTML;
      for(let i=0; i < gameArray.length; i++) {   
        if(gameArray[i].name == localTitle){
          //document.getElementById("oneName").innerHTML = gameArray[i].name;
          document.getElementById("oneYear").innerHTML = "Year released: " + gameArray[i].year;
          document.getElementById("oneGenre").innerHTML = "Genre: " + gameArray[i].genre;
        }
      }
      for(let i=0; i < reviewArray.length; i++) {
        if(reviewArray[i].gameName == localTitle) {

        }
      }
   });

   document.getElementById("buttonSortTitle").addEventListener("click", function () {
    gameCollection = gameCollection.sort(compareTitle);
    displayCollection();
  });

  document.getElementById("buttonSortGenre").addEventListener("click", function () {
    gameCollection = gameCollection.sort(compareGenre);
    displayCollection();
  });

  document.getElementById("buttonSortYear").addEventListener("click", function() {
    gameCollection = gameCollection.sort(compareYear);
    displayCollection();
  })
  document.getElementById("buttonSortAllTitle").addEventListener("click", function () {
    gameArray = gameArray.sort(compareTitle);
    createList();
  });

  document.getElementById("buttonSortAllGenre").addEventListener("click", function () {
    gameArray = gameArray.sort(compareGenre);
    createList();
  });

  document.getElementById("buttonSortAllYear").addEventListener("click", function() {
    gameArray = gameArray.sort(compareYear);
    createList();
  })
});