import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CookService } from 'src/app/services/data/cook.service';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})
export class RecipeformComponent implements OnInit {

  @Output() refreshRecipesAfterSubmit = new EventEmitter()

  dynamicForm: FormGroup;
  submitted: boolean = false;
  newRecipe: any = {
    name: "",
    craftingPrice: "",
    seelingPrice: "",
    ingredientRecipe: {

    }

  }
  groupValidator = {
    name: ['', Validators.required],
  }

  constructor(
    private formBuilder: FormBuilder,
    private cookService: CookService
     ) {
    
   }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group(this.groupValidator)
  }

  onSubmit() {
    console.log("dynamec", this.dynamicForm.controls)
    this.submitted = true;
    if(this.dynamicForm.invalid) {
      return ;
    }

    this.newRecipe = {
      name: this.dynamicForm.controls.name.value
    }

    this.cookService.createRecipe(this.newRecipe).subscribe(
      data => {
        this.newRecipe = data.body;
      },
      err => {
        console.log('erreur', err)
      }
    )


    


    //this.refreshRecipesAfterSubmit.emit();
    // this.commandsService.createRecipe(this.dynamicForm.value.name);
    //this.onReset()
  }

  onReset() {
    this.submitted = false;
    this.dynamicForm.reset()
  }


}
