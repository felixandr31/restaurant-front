import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})
export class RecipeformComponent implements OnInit {

  @Output() refreshRecipesAfterSubmit = new EventEmitter()

  dynamicForm: FormGroup;
  submitted: boolean = false;
  groupValidator = {
    name: ['', Validators.required],
  }

  constructor(
    private formBuilder: FormBuilder,
    // private commandsService: CommandsService
     ) {
    
   }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group(this.groupValidator)
  }

  onSubmit() {
    this.submitted = true;
    if(this.dynamicForm.invalid) {
      return ;
    }

    this.refreshRecipesAfterSubmit.emit();
    // this.commandsService.createRecipe(this.dynamicForm.value.name);
    this.onReset()
  }

  onReset() {
    this.submitted = false;
    this.dynamicForm.reset()
  }


}
