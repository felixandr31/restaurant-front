import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CookService } from 'src/app/services/data/cook.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})
export class RecipeformComponent implements OnInit {

  @Output() refreshRecipesAfterSubmit = new EventEmitter()
  @Input() restaurantId;

  dynamicForm: FormGroup;
  submitted: boolean = false;
  emptyRecipe: any = {
    name: "",
    craftingPrice: 5,
    sellingPrice: 6,
    ingredientRecipe: {
    }


  }
  groupValidator = {
    name: ['', Validators.required],
  }

  constructor(
    private formBuilder: FormBuilder,
    private cookService: CookService,
    private restaurantService: RestaurantService
    ) {
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group(this.groupValidator)
  }

  onSubmit() {
    // console.log("dynamec", this.dynamicForm.controls)
    this.submitted = true;
    if(this.dynamicForm.invalid) {
      return ;
    }
    let newRecipe = { ...this.emptyRecipe,
      name: this.dynamicForm.controls.name.value
    }

    this.cookService.createRecipe(newRecipe).subscribe(
      data => {
        newRecipe = data.body;
        const tabId: String[]  = [newRecipe.id];
        this.restaurantService.addRecipeToRestaurant(this.restaurantId, tabId).subscribe(
          data => {
            this.refreshRecipesAfterSubmit.emit();
          },
          err => {
            console.log('erreur', err)
          }
        )
      },
      err => {
        console.log('erreur', err)
      }
    )

    this.onReset()
  }

  onReset() {
    this.submitted = false;
    this.dynamicForm.reset()
  }
}
