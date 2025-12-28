/*
Type inference in TypeScript refers to the compiler's ability to automatically 
determine the type of a variable or expression without explicit type 
annotations. TypeScript analyzes the code and assigns a type based
on the value or context.
*/
let drink = "chai";

let cups = Math.random() > 0.5 ? 10 : "5";

/* 
Type annotation in TypeScript is the practice of explicitly specifying the
type of a variable, parameter, or function return value. 
This is useful when you want to enforce a specific type and
avoid relying on TypeScript's type inference.
*/

let chaiFlavour: string = "masala chai";
chaiFlavour = "ginger chai";