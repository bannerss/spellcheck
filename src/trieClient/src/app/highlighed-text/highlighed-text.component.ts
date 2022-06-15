
  import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
  } from "@angular/core";
import { timeout } from "rxjs";
  
import { DictionaryManagerService } from "../services/dictionary-manager.service";
  
  @Component({
    selector: "app-highlighed-text",
    templateUrl: "./highlighed-text.component.html",
    styleUrls: ["./highlighed-text.component.css"]
  })
  export class HighlighedTextComponent{
    textValue: string = "";
    @Input() nonWordsArray: string[] = [];
    @ViewChild('spellcheckerrorsholder') spellcheckerrorsholder!: ElementRef;
    typingTimer:any;   //timer identifier
    doneTypingInterval:number = 1000;
    constructor(public dictionaryManagerService:DictionaryManagerService) {}
    
    handleScroll() {
     
    }
    onTextAreaChange(content:string){
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.populateNonWordsArray.bind(this,content), this.doneTypingInterval);
      
    }

    populateNonWordsArray(txt:string) {
      if(txt){
        this.nonWordsArray=[];
        let userTextArray:string[] = txt.split(/[\s,.]+/).filter(element => element);
        for(let element=0; element<userTextArray.length; element++)
        if(!this.nonWordsArray.includes(userTextArray[element])){
          if(!this.dictionaryManagerService.search(userTextArray[element])){
            this.nonWordsArray.push(userTextArray[element]);
          }
        }
        txt = txt ? txt
        .replace(/\n$/g, "\n\n") : '';
      this.nonWordsArray.forEach(x => {
        txt = txt
        .replace(new RegExp(x+'[(?!\\s)|(?!,)|(?!.)]|'+x+'$', 'g'), '<mark style="border-bottom: 1px solid red;background-color: transparent;" class="mark">$&</mark>');
        });
      this.spellcheckerrorsholder.nativeElement.innerHTML = txt;
      }
    }

    applyHighlights(text:string) {
      
       
      
      
    }
    createTrie(){
    
    //const trie = this.dictionaryManagerService;
     // trie.populateFromFile();
    // insert few words
    //trie.insert("CAT");
    //trie.insert("DOG");
    //trie.insert("CATS");
    //trie.insert("FISH");

    // search something
   // trie.search("MAT") // false
   // trie.search("DOG") // true  
    }
  }
  