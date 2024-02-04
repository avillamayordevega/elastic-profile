export interface Something {
  name : string;
  time : number;
  children : Something[];
  breakdown ?: Breakdown;
}

export interface Breakdown {
  a : number;
  b : number;
}