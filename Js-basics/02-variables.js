var shipName = "The Amber";
console.log("Shipname: ", shipName);

let crewCount = 12;
console.log("crew count: ", crewCount);
crewCount = 14;

const captainName = "Jack Sparrow";
console.log("Captain Name: ", captainName);
// captainName = "Ankit"; not allowed

if (true) {
  var leakyTreasure = "Gold coins";
}

console.log(leakyTreasure);

if (true) {
  let leakyTreasure2 = "Gold coins";
}

// console.log(leakyTreasure2); // not possible coz it's len

let shipSpeed = 22;
let _privatelog = "Secret";
let MONGODB_URI = "";
let name = "ankit";

const treasureChest = {
  gold: 100,
  rubies: 50,
  maps: 2,
};

treasureChest.gold = 150;
// treasureChest = { gold: 150 }; // Assignment to constant not allowed

const crewRoster = ["Alok", "Abhinav", "Tasnish"];
crewRoster.push("vraj");
crewRoster[0] = "subham";

// crewRoster = ["Something"];  // Assignment to constant not allowed
