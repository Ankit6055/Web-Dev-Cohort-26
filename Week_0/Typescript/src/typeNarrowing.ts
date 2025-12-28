function getChai(kind: string | number) {
  if (typeof kind === "string") {
    return `Making ${kind} chai...`;
  }
  return `Chai order: ${kind}`;
}

function serveChai(msg?: string) {
  if (msg) {
    return `Serving ${msg}`;
  }
  return `Serving default masala chai`;
}

function orderChai(size: "small" | "medium" | "large" | number) {
  if (size === "small") {
    return `Small cutting chai...`;
  }
  if (size === "medium" || size === "large") {
    return `Make extra chai...`;
  }

  return `Chai order #${size}`;
}

class KulhadChai {
  serve() {
    return `Serving Kulhad Chai`;
  }
}

class CuttingChai {
  serve() {
    return `Serving Cutting Chai`;
  }
}

function serve(chai: KulhadChai | CuttingChai) {
  if (chai instanceof KulhadChai) {
    return chai.serve();
  }
}

type ChaiOrder = {
  type: string;
  sugar: number;
};

function isChaiOrder(obj: any): obj is ChaiOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    obj.sugar === "number"
  );
}

function serveOrder(item: ChaiOrder | string) {
  if (isChaiOrder(item)) {
    return `Serving ${item.type} chai with ${item.sugar}`;
  }
  return `Serving custom chai: ${item}`;
}

type MasalaChai = { type: "masala"; spiceLevel: number };
type GingerChai = { type: "ginger"; amount: number };
type ElaichiChai = { type: "elaichi"; aroma: number };

type Chai = MasalaChai | GingerChai | ElaichiChai;

function MakeChai(order: Chai) {
  switch (order.type) {
    case "masala":
      return `Masala Chai`;
    case "elaichi":
      return `Elaichi Chai`;
    case "ginger":
      return `Ginger Chai`;
    default:
      return `Default chai`;
  }
}

function brew(order: MasalaChai | GingerChai) {
  if ("spiceLevel" in order) {
    return `Masala Chai`;
  }
}

function isStringArray(arr: unknown): arr is string[] {
    return true;
}
