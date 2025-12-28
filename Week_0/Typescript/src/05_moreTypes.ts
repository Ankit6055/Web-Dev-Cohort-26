let response: any = "42";
/*
Type assertion in TypeScript is a way to tell the compiler to treat a variable
as a specific type, even if TypeScript cannot infer the type on its own. 
It is a way of "forcing" the type system to trust the developer's knowledge about the variable.
*/
let numericLength: number = (response as string).length;

type Book = {
  name: string;
};

let bookString = '{"name": "who moved my cheese"}';
let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name);

const inputElement = document.getElementById("username") as HTMLInputElement;

let value: any;

value = "chai";
value = [1, 2, 3];
value = 2.5;
value.toUpperCase();

let newValue: unknown;

newValue = "chai";
newValue = [1, 2, 3];
newValue = 2.5;
// newValue.toUpperCase(); // shows error in this line
if (typeof newValue === "string") {
  newValue.toUpperCase();
}

try {
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
  console.log("Error", error);
}

const data: unknown = "Chai aur code";
const strData: string = data as string;

type Role = "admin" | "user" | "superadmin";

function redirectBasedOnRole(role: Role): void {
  if (role === "admin") {
    console.log("Redirecting to admin dashboard");
    return;
  }

  if (role === "user") {
    console.log("Redirecting to user dashboard");
    return;
  }
  role; // (parameter) role: "superadmin"
}

function neverReturn(): never {
  while (true) {} // eg can be a web server
}
