import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cook-view',
  templateUrl: './cook-view.component.html',
  styleUrls: ['./cook-view.component.css']
})
export class CookViewComponent implements OnInit {

  public recipesList: any = [];
  public isCreateRecipe: boolean = true;
  //public recipeToSet: Categories.Recipe;
  public recipeToSet: any;

  // constructor(private commandsService: CommandsService) {
  // }

  constructor() {
  }

  ngOnInit() {
    this.refreshRecipes()
  }

  refreshRecipes() {
    // this.commandsService.getAllRecipes().then( res => {
    //   this.recipesList = res
    // })
  }

  onRecipeButtonClick(recipe){
     this.isCreateRecipe = false
     this.recipeToSet = recipe;
  }
}
