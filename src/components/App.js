import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import uuid from 'react-uuid'
import RecipeEdit from './RecipeEdit'


export const RecipeContext = React.createContext()

const LOCAL_STROAGE_KEY = 'cookingWithReact.recipe'

function App() {
  const[selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipes=>recipes.id === selectedRecipeId)


  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STROAGE_KEY)
    if(recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, []) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STROAGE_KEY, JSON.stringify(recipes))
  }, [recipes])




  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuid(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: "Instr. ",
      ingredients: [
        { id: uuid(), name: 'Name', amount: '1 Tbs' }
      ]
    }
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>

  )

}


const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 5,
    cookTime: '1:45',
    instructions: "1. Put salt on chicken\n2.Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2.Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]
export default App;
