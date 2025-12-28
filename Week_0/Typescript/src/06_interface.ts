// function makeChai(order: { type: string; sugar: number; strong: boolean }) {
//   console.log(order);
// }

// function serveChai(order: { type: string; sugar: number; strong: boolean }) {
//   console.log(order);
// }

type ChaiOrder = {
  type: string;
  sugar: number;
  strong: boolean;
};

function makeChai(order: ChaiOrder) {
  console.log(order);
}

function serveChai(order: ChaiOrder) {
  console.log(order);
}

interface TeaRecipe {
  water: number;
  milk: number;
}

// class MasalaChai implements TeaRecipe {
//   water = 100;
//   milk = 50;
// }

interface CupSize {
  size: "small" | "large";
}

class Chai implements CupSize {
  size: "small" | "large" = "large";
}

interface Response {
  ok: true | false;
}

class myRes implements Response {
  ok: boolean = true;
}

type TeaType = "masala" | "ginger" | "lemon";

function orderChai(t: TeaType) {
  console.log(t);
}

type BaseChai = { teaLeaves: number };
type Extra = { masala: number };

type MasalaChai = BaseChai & Extra;

const cup: MasalaChai = {
  teaLeaves: 2,
  masala: 1,
};

type User = {
  username: string;
  bio?: string;
};

const u1: User = { username: "Ankit" };
const u2: User = { username: "Chai", bio: "chai aur code" };

type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = {
  appName: "Masterji",
  version: 1,
};

// cfg.appName = "ChaiCode" // will not be able to update, throw error