import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HighlighedTextComponent } from "../highlighed-text.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [HighlighedTextComponent],
  exports: [HighlighedTextComponent]
})
export class TextareaHighlightModule {}