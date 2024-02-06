export interface ProfileData {
  name : string;
  time : number;
  children : ProfileData[];
  breakdown ?: Breakdown;
}

export interface Breakdown {
  a : number;
  b : number;
}