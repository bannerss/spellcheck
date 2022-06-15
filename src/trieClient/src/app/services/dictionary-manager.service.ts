import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryManagerService  {

  public root:any =  new TrieNode(null);
  constructor(private http:HttpClient){
    http.get<any>("/api/trie").subscribe(res=>{
      if(res&&res.data){
        if(JSON.stringify(res.data) !== JSON.stringify({}))
        this.root=res.data;
      }
    })
  }
  
  
  public insert(word:string){
    let current = this.root
    // iterate through all the characters of word
    for(let character  of word ){
         // if node doesn't have the current character as child, insert it
         if(current.children[character] === undefined){
             current.children[character] = new TrieNode(character)
         }
        // move down, to insert next character
        current = current.children[character]  
    }
    // mark the last inserted character as end of the word
    current.isEndOfWord = true;
    this.updateFile();
    //this.httpservice.updateTrie(this.root);
  }
  bulkInsert(list:string[]){
    list.forEach(element => {
      this.insert(element);
    });
    this.updateFile();
  }
  public populateFromFile(){
    this.http.get<any>("/api/trie/populateFromFile").subscribe(res=>{
      if(res&&res.data){
        if(JSON.stringify(res.data) !== JSON.stringify({}))
        this.root=res.data;
      }
    })
  }
  updateFile() {
    //this.coursesService.saveTrie(this.root);
  }
  search(word:string){
     let current = this.root
    // iterate through all the characters of word
    for(let character of word){
         if(current.children[character] === undefined){
             // could not find this character in sequence, return false
             return false
         }
        // move down, to match next character
        current = current.children[character]  
    }
     // found all characters, return true if last character is end of a word
    return current.isEndOfWord
  }


  
   
}

class TrieNode{
  /**
   *
   */
  constructor(value:any) {
    this.value=value;

  }
  value:string='';
  isEndOfWord:boolean = false // false by default, a green node means this flag is true
  children: { [key: string]: TrieNode; } = {}

  populateTrieNode(value:string){
    this.value = value
    this.isEndOfWord = false // false by default, a green node means this flag is true
    this.children  = {} // children are stored as Map, where key is the letter and value is a TrieNode for that letter 
  }
}


