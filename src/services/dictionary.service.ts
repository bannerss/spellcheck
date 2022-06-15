import { existsSync, mkdirSync,readFileSync,writeFileSync,promises } from 'fs';
import path from 'path';
import * as dict from '@models/dic.json';
import {Dictionaries} from '@models/heb-dic-a';

import * as wordsArray from '@models/words-list.json';
import { ITrie } from '@interfaces/tries.interface';

class DictionaryService {

    
    public root:ITrie =  dict as ITrie;
    public async getDictionary(): Promise<ITrie> {
        const trie:ITrie  = this.root;
        return trie;
      }

    public async searchForWord(word:string):Promise<boolean> {
        let current = this.root
    // iterate through all the characters of word
        for(let character of word){
            if(current.children[character] === undefined){
                // could not find this character in sequence, return false
                return false
                break;
            }
            // move down, to match next character
            current = current.children[character]  
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord
    }

     insert(word:string){
        let current = this.root
        // iterate through all the characters of word
        for(let character  of word ){
             // if node doesn't have the current character as child, insert it
             if(current.children[character] === undefined){
                 current.children[character] = {value:character,isEndOfWord:false,children:{}}
             }
            // move down, to insert next character
            current = current.children[character]  
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true;
        
      }
     public async bulkInsertWordsToTrie(list:string[]):Promise<string>{
        list.forEach(element => {
          this.insert(element);
        });
        const insertResult =  this.updateFile();
        return insertResult;
      }

      public async populateFromFile():Promise<string>{
        let words:string[] =  Dictionaries;//wordsArray['default'] as string[];
        words.forEach(element => {
          this.insert(element);
        });
        this.updateFile().then(result => { return "ok" })
        .catch(error => { return "error" })
        .finally(() => {  })
        return "done";
      }

      async updateFile():Promise<string> { 
        try {
           
            console.log(path.resolve('./src/models/dic.json')) ;
            writeFileSync(path.resolve('./src/models/dic.json'), JSON.stringify(this.root, null, 2), 'utf8');
            console.log('Data successfully saved to disk');
            return 'Data successfully saved to disk';
                  } catch (error) {
            console.log('An error has occurred ', error);
            return "Error Data Not saved to disk"
          }
      }
    
}

export default DictionaryService;