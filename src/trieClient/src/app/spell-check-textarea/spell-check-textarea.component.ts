
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
  import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR
  } from "@angular/forms";
import { DictionaryManagerService } from "../services/dictionary-manager.service";
  
  @Component({
    selector: 'app-spell-check-textarea',
    templateUrl: './spell-check-textarea.component.html',
    styleUrls: ['./spell-check-textarea.component.css'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SpellCheckTextareaComponent),
        multi: true
      }
    ]
  })
  export class SpellCheckTextareaComponent
    implements  ControlValueAccessor {
    
    constructor(public dictionaryManagerService:DictionaryManagerService) {}
    @Input() nonWordsArray: string[] = ['qq','ww'];
    @ViewChild("backdrop",{static: true})
    $backdrop!: ElementRef<HTMLDivElement>;
    @ViewChild("textarea")
    $textarea!: ElementRef<HTMLTextAreaElement>;
    textValue: string = "";
    sleepticks:number = new Date().getTime();
    @Output() private textAreaContent = new EventEmitter();
    get highlightedText () {
      this.textAreaContent.emit(this.textValue);
      //this.checkText();
      //this.nonWordsArray.push("ssss");
      return this.applyHighlights(this.textValue);
      
      
    }
    

    checkText() {
      if(this.textValue){
        let userTextArray:string[] = this.textValue.split(/[\s,.]+/).filter(element => element);
        for(let element=0; element<userTextArray.length; element++)
        if(!this.nonWordsArray.includes(userTextArray[element])){
          if(!this.dictionaryManagerService.search(userTextArray[element])){
            this.nonWordsArray.push(userTextArray[element]);
          }
        }
        console.log(userTextArray);
        console.log(this.nonWordsArray);
      }
    }

    applyHighlights(text:string) {
      const newticks = new Date().getTime();
      const oldTicks:number = this.sleepticks;
      this.sleepticks = newticks;
      
      if(newticks-oldTicks>3000){
        text = text ? text
        .replace(/\n$/g, "\n\n") : '';
      this.nonWordsArray.forEach(x => {
        text = text
        .replace(new RegExp(x, 'g'), '<mark style="border-bottom: 1px solid red;background-color: transparent;" class="mark">$&</mark>');
      });
      }
      return text;
      
      
    }
    handleScroll() {
      var scrollTop = this.$textarea.nativeElement.scrollTop;
      this.$backdrop.nativeElement.scrollTop = scrollTop;
  
      var scrollLeft = this.$textarea.nativeElement.scrollLeft;
      this.$backdrop.nativeElement.scrollLeft = scrollLeft;
    }
  
    onChanges!: ($value: any) => void;
    onTouched!: () => void;
  
    writeValue(value: any): void {
      console.log(" writeValue(value: any): void {");
      if (value !== undefined) {
        this.textValue = value;
      }
    }
    registerOnChange(fn: any): void {
      //this.onChanges = (value) => { Promise.resolve(null).then(() => fn(value)) };
      console.log("registerOnChange");
      this.onChanges = fn;
    }
    registerOnTouched(fn: any): void {
      console.log("registerOnTouched");
      this.onTouched = fn;
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
  