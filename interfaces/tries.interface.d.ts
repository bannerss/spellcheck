export interface ITrie {
    value: string;
    isEndOfWord: boolean;
    children: {
        [key: string]: ITrie;
    };
}
