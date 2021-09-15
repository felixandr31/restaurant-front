import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() deletedRecipe = new EventEmitter();
  @Output() toggleCreateRecipe = new EventEmitter();
  // @Output() refreshRecipe = new EventEmitter();

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
    console.log("la recette to set",this.recipeToSet)
    console.log("la recette to set", this.recipeToSet)
    this.dynamicForm = this.formBuilder.group(this.groupValidator);
    this.cookService.getAllIngredient().subscribe(
      data => {

        Object.keys(data.body).map(key => {

          let ingredientAndQuantity: any = {};
          // console.log("inside map1", data.body[key])
          // console.log("inside map2", this.ingredientsToDisplay)
          ingredientAndQuantity["ingredient"] = data.body[key];
          ingredientAndQuantity["quantity"] = 0;

          this.ingredientsToDisplay.push(ingredientAndQuantity) 
        })

        this.recipeToSet.ingredientsRecipe.map(recipe1 => {
          console.log("truc sur la recette", recipe1)
          const index = this.ingredientsToDisplay.findIndex(recipe2 => {
            console.log("recipe1", recipe1);
            console.log("recipe2", recipe2);
            return recipe1.ingredient.id == recipe2.ingredient.id
          })
          console.log("je vais le modifier index ",this.ingredientsToDisplay[index] )
          this.ingredientsToDisplay[index].quantity = recipe1.quantity
          this.ingredientsForRecipe[this.ingredientsToDisplay[index].ingredient.name] = {"ingredient": this.ingredientsToDisplay[index].ingredient, "quantity": recipe1.quantity}
          console.log("lindex", index)

        })

        console.log("after map", this.ingredientsToDisplay)
        // this.ingredientsToDisplay = data.body.map()
        this.ingredients = data.body
        console.log("data ingredient", data.body)

      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  onSubmit() {
    // this.submitted = true;
    console.log('before request', this.ingredientsForRecipe)
    if(this.dynamicForm.invalid) {
      return ;
    }
    const ingredient: any = {};

    this.updateIngredientRecipe();
    
    //   this.updateRecipeRelationToIngredient();
    //   this.editCreateRelation()
    
    this.onReset();
  }

  async updateIngredientRecipe() {
    let tabIngredientRecipe: any[] = [];
    
    const queries = Object.keys(this.ingredientsForRecipe).map(ingKey => {
      let ingredientRecipeToSend: any = {
        quantity: 0,
        ingredient: {}
      };
      ingredientRecipeToSend["ingredient"] = this.ingredientsForRecipe[ingKey].ingredient;
      ingredientRecipeToSend["quantity"] = this.ingredientsForRecipe[ingKey].quantity;
      // console.log("ing", ingKey)
      // console.log(ingredientRecipeToSend)
      return this.cookService.createIngredientRecipe(ingredientRecipeToSend)
    })

    // console.log("queries", queries)
    forkJoin(queries).subscribe(
      data => {
        console.log('u forkJoin ?', data)
        data.map( request => {
          tabIngredientRecipe.push(request.body)
        })
        console.log("after map", tabIngredientRecipe)

        this.cookService.addIngredientRecipeToRecipe(this.recipeToSet.id, tabIngredientRecipe).subscribe(
          data => {
            console.log("vive la france", data)
            this.toggleToCreateRecipe();
          },
          err => {
            console.log("err", err)
          }
        )
      }
    )

  }

  onReset() {
    this.dynamicForm.reset()
    this.ingredientsForRecipe = []
  }

  onIngredientQuantityChange(ingredient, event) {
    this.ingredientsForRecipe[ingredient.name] = {"ingredient": ingredient, "quantity": event.target.value}
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
      }
    );
    this.deletedRecipe.emit();
  }

  refreshData(){

  }

}
