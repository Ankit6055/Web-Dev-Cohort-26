const clue1 = "Muddy footprint near the window";
const clue2 = "Broken glass on the table";

console.log(clue1);
console.log(clue2);

const suspectName = "Dipesh";
const suspectAge = 20;
console.log("Suspect: ", suspectName, "| Age: ", suspectAge);

console.warn("Warning: Fingerprint evidence detected");
console.error("Error: Fingerprint evidenve detected");

const evidence = [
  { id: 1, item: "Muddy footprint", location: "Window sill" },
  { id: 2, item: "Broken glass", location: "Living room" },
  { id: 3, item: "Red fiber stand", location: "Door handle" },
];

console.table(evidence);

console.group("Group starts");
console.log("My log 1");
console.log("My log 2");
console.log("My log 3");
console.groupEnd();

console.time("time starts now");

let dnaMatch = 0;
for (let i = 0; i < 10000; i++) {
    dnaMatch++;
}

console.timeEnd("time starts now");
console.log(dnaMatch)