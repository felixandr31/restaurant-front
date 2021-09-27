import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from 'src/app/services/data/ingredient.service';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.css']
})
export class IngredientsFormComponent implements OnInit {
  @Input() ingredients: any
  @Output() refreshIngredientSubmited = new EventEmitter()
  dynamicForm: FormGroup;
  isDisplayIngredient = false;
  emptyIngredient: any = {
    name: "",
    purchasePrice: ""
  }
  isIngredientExist: boolean = false;

  groupValidator = {
    name: ['', Validators.required],
    purchasePrice: ['', Validators.required]
  }
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private ingredientService: IngredientService) { }

  onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      return;
    }
    let currentIngredient : any;

    let newIngredient = {
      ...this.emptyIngredient,
      name: this.dynamicForm.controls.name.value,
      purchasePrice: parseFloat(this.dynamicForm.controls.purchasePrice.value),
    }
    for (let ingredient of this.ingredients){
      if(newIngredient.name.toLowerCase() === ingredient.name.toLowerCase()){
      //  currentIngredient=ingredient;
       this.isIngredientExist = true;
      }
    }


    if(!this.isIngredientExist){
    this.ingredientService.createIngredient(newIngredient).subscribe(
      data => {
        this.refreshIngredientSubmited.emit()
        this.isDisplayIngredient = false
      }

    )
  }
  // else{
  //   isIngredientExist = true;
  // }
 }
  ngOnInit() {
    this.dynamicForm = this.formBuilder.group(this.groupValidator);
    this.refreshIngredients()
  }
  refreshIngredients() {
    this.ingredientService.getIngredient().subscribe(
      data => {
        this.ingredients = data.body;
      },
      err => {
        console.log('erreur', err)
      }
    )
  }
  isDisplay() {
    this.isDisplayIngredient = !this.isDisplayIngredient
  }


}
