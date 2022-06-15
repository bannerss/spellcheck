export interface ITrie{
  value:string;
  isEndOfWord:boolean; // false by default, a green node means this flag is true
  children: { [key: string]: ITrie; }
}