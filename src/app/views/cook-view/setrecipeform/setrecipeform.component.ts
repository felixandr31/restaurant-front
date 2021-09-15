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

  dynamicForm: FormGroup;
  ingredients: any;
  ingredientsForRecipe: any = {};
  emptyIngredientRecipe: any = {
    quantity: 0,
    ingredient: {}
  }
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
    console.log("la recette to set", this.recipeToSet)
    this.dynamicForm = this.formBuilder.group(this.groupValidator);
    this.cookService.getAllIngredient().subscribe(
      data => {
        this.ingredients = data.body
        console.log("data ingredient", data)

      },
      err => {
        console.log('erreur', err)
      }
    )
  }

  onSubmit() {
    // this.submitted = true;
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
          },
          err => {
            console.log("err", err)
          }
        )
      }
    )
    
    // for (let keyIngredientForRecipe in this.ingredientsForRecipe){
    //   let ingredientRecipeToSend: any = this.emptyIngredientRecipe;
    //   console.log("ingreRecipeafter key", this.ingredientsForRecipe[keyIngredientForRecipe])
    //   ingredientRecipeToSend  = this.emptyIngredientRecipe;
    //   ingredientRecipeToSend["ingredient"] = this.ingredientsForRecipe[keyIngredientForRecipe].ingredient;
    //   ingredientRecipeToSend["quantity"] = this.ingredientsForRecipe[keyIngredientForRecipe].quantity;
    //   console.log("before send", ingredientRecipeToSend)


      // this.cookService.createIngredientRecipe(ingredientRecipeToSend).subscribe(
      //   data => {
      //     console.log("try 1", this.recipeToSet.id)
      //     console.log("try 2", data.body)
      //     const listIngredientRecipe: any[] = [data.body];
      //     console.log("list ingredient to send", listIngredientRecipe)
      //     this.cookService.addIngredientRecipeToRecipe(this.recipeToSet.id, listIngredientRecipe).subscribe(
      //       data => {
      //         console.log("final data", data)
      //       },
      //       err => {
      //         console.log('erreur', err)
      //       }
      //     )
      //   }
      // )
    // }

  }

  adaptClosure(ingKey) {
    let ingredientRecipeToSend: any = {
      quantity: 0,
      ingredient: {}
    };
    ingredientRecipeToSend["ingredient"] = this.ingredientsForRecipe[ingKey].ingredient;
    ingredientRecipeToSend["quantity"] = this.ingredientsForRecipe[ingKey].quantity;
    console.log("ing", ingKey)
    console.log(ingredientRecipeToSend)
    return this.cookService.createIngredientRecipe(ingredientRecipeToSend)

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

}
