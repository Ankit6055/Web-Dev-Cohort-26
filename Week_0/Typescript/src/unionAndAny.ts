let subs: number | string = 10;

let apiRequestStatus: "pending" | "success" | "error" = "pending";

let airLineSeat: "aisle" | "window" | "middle" = "middle";

const orders = ["12", "20", "28", "42"];

let currentOrder: string | undefined;

for (let order of orders) {
  if (order === "28") {
    currentOrder = order;
    break;
  }
}

console.log(currentOrder);
