import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from 'src/app/services/data/ingredient.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.css']
})
export class IngredientsFormComponent implements OnInit, OnChanges {
   ingredients: any
   refreshIngredientSubmited = new EventEmitter()
   editingIngredient: any;
  
  dynamicForm: FormGroup;
  editDynamicForm:FormGroup
  isDisplayIngredient = false;
  displayIngredient = false

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

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group(this.groupValidator);
    this.editDynamicForm = this.formBuilder.group(this.groupValidator);
    this.refreshIngredients()
  }
  ngOnChanges(): void {
    this.refreshIngredients()
  }
  onCreate() {
   
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
        this.refreshIngredients()
      }

    
    )
  }
 
 
 }

  onEdit(){
   
    let currentIngredient : any;
    currentIngredient = {
      ...currentIngredient,
      id:this.editingIngredient.id,
      name:this.editingIngredient.name,
      purchasePrice: parseFloat(this.editDynamicForm.controls.purchasePrice.value)
      }
   
    
  
    this.ingredientService.updateIngredient(currentIngredient.id,currentIngredient).subscribe(
      data => {
       
        this.displayIngredient = false
        this.refreshIngredients()
      }
     )
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

  editIngredient(ingredient){
    this.displayIngredient=true;
    this.editingIngredient = ingredient,
    this.editDynamicForm.patchValue({
      id:this.editingIngredient.id,
      name:this.editingIngredient.name,
      purchasePrice:this.editingIngredient.purchasePrice
    })
    
   }

}
