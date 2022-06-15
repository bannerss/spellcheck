import { Component } from '@angular/core';
import { DictionaryManagerService } from './services/dictionary-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *
   */
  constructor(public dictionaryManagerService:DictionaryManagerService) {
    
    
  }
  public nonWordsArray = ["ילדד", "גרלל", "בןן"];
  txt = "";

  rebuildNonWordsArray(textAreaContent:string){
    if(textAreaContent ){
      let userTextArray:string[] = textAreaContent.split(/[\s,.]+/).filter(element => element);
      for(let element=0; element<userTextArray.length; element++)
      if(!this.nonWordsArray.includes(userTextArray[element])){
        if(!this.dictionaryManagerService.search(userTextArray[element])){
          this.nonWordsArray.push(userTextArray[element]);
        }
      }
  }
}
}

