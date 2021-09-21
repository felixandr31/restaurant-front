
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CookService } from 'src/app/services/data/cook.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-setrecipeform',
  templateUrl: './setrecipeform.component.html',
  styleUrls: ['./setrecipeform.component.css']
})
export class SetrecipeformComponent implements OnInit {

  @Input() recipeToSet: any;
  @Input() restaurantId: string;
  // @Output() deletedRecipe = new EventEmitter();
  @Output() toggleCreateRecipe = new EventEmitter();

  dynamicForm: FormGroup;
  ingredients: any;
  ingredientsForRecipe: any = {};
  ingredientsToDisplay: any[] = [];
  groupValidator = {
    quantity: [''],
  }


  constructor(
    private cookService: CookService,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    // console.log("la recette to set", this.recipeToSet)
    this.dynamicForm = this.formBuilder.group(this.groupValidator);
    this.cookService.getAllIngredient().subscribe(
      data => {
        this.ingredients = data.body

        Object.keys(data.body).map(key => {
          let ingredientAndQuantity: any = {};
          ingredientAndQuantity["ingredient"] = data.body[key];
          ingredientAndQuantity["quantity"] = 0;
          this.ingredientsToDisplay.push(ingredientAndQuantity)
        })

        this.recipeToSet.ingredientsRecipe.map(recipe1 => {
          const index = this.ingredientsToDisplay.findIndex(recipe2 => {
            return recipe1.ingredient.id == recipe2.ingredient.id
          })
          this.ingredientsToDisplay[index].quantity = recipe1.quantity
          this.ingredientsForRecipe[this.ingredientsToDisplay[index].ingredient.name] = { "ingredient": this.ingredientsToDisplay[index].ingredient, "quantity": recipe1.quantity }
        }) 
      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes['recipeToSet'].firstChange) {
      this. refreshIngredientQuantity();
    } 
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      return;
    }

    this.updateIngredientRecipe();
    this.onReset();
  }
  // is there any use of "asyns" ?
  // async updateIngredientRecipe() {
   updateIngredientRecipe() {
    let tabIngredientRecipe: any[] = [];
    const queries = Object.keys(this.ingredientsForRecipe).map(ingKey => {
      let ingredientRecipeToSend: any = {
        quantity: 0,
        ingredient: {}
      };
      ingredientRecipeToSend["ingredient"] = this.ingredientsForRecipe[ingKey].ingredient;
      ingredientRecipeToSend["quantity"] = this.ingredientsForRecipe[ingKey].quantity;
      return this.cookService.createIngredientRecipe(ingredientRecipeToSend)
    })

    forkJoin(queries).subscribe(
      data => {
        data.map(request => {
          tabIngredientRecipe.push(request.body)
        })
        this.cookService.addIngredientRecipeToRecipe(this.recipeToSet.id, tabIngredientRecipe).subscribe(
          data => {
            this.toggleToCreateRecipe();
          },
          err => {
            console.log("err", err)
          }
        )
      }
    )

  }

  refreshIngredientQuantity() {
    this.ingredientsToDisplay.map(ingToDisplay => {
      ingToDisplay["quantity"] = 0;
    })

    this.recipeToSet.ingredientsRecipe.map(recipe1 => {
      const index = this.ingredientsToDisplay.findIndex(recipe2 => {
        return recipe1.ingredient.id == recipe2.ingredient.id
      })
      this.ingredientsToDisplay[index].quantity = recipe1.quantity
      this.ingredientsForRecipe[this.ingredientsToDisplay[index].ingredient.name] = { "ingredient": this.ingredientsToDisplay[index].ingredient, "quantity": recipe1.quantity }
    })
  }


  onIngredientQuantityChange(ingredient, event) {
    this.ingredientsForRecipe[ingredient.name] = { "ingredient": ingredient, "quantity": event.target.value }
  }


  toggleToCreateRecipe() {
    this.toggleCreateRecipe.emit();
  }


  deleteRecipe() {
    const options = {
      body:
        [this.recipeToSet.id]
      ,
    };
    this.restaurantService.removeRecipeToRestaurant(this.restaurantId, options).subscribe(
      data => {
        this.toggleToCreateRecipe();
      }
    );

  }

  onReset() {
    this.dynamicForm.reset()
    this.ingredientsForRecipe = []
  }
}
