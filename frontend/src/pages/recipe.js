import { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import axios from "axios";

function Recipe() {

    const [recipe, setRecipe] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": `http://localhost:8080/api/recipe/${id}`
        })
        .then(response => response.data)
        .then(result => {
            setRecipe(result);
        });
    }, [id]);

    function addToGroceryList() {
        axios({
            "method": "PUT",
            "url": "http://localhost:8080/api/grocery-list",
            "data": {
                "recipeId": id,
                "userName": "nicolas.raboy@mongodb.com"
            }
        })
        .then(response => response.data)
        .then(result => {
            console.log("Added!");
        }, error => {
            console.error(error);
        });
    }

    return (
        <main className="container mx-auto pt-24 px-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2 text-black">{recipe.title}</h1>
                <p>
                    TBD
                </p>
            </div>
            <div className="bg-blue-100 border border-blue-500 p-2 mb-8">
                <p>Serves: {recipe.servings}</p>
                <p>{recipe.calories} calories per serving</p>
            </div>
            <div className="mb-8">
                <p><strong className="font-bold">Ingredients</strong></p>
                <ul className="list-disc list-inside my-2">
                    {recipe.ingredients?.map((ingredient, index) => (
                        <li key={"ingredient-" + index}>{ingredient.ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-8">
                <p><strong className="font-bold">Instructions</strong></p>
                <p>Pay attention to the instructions to get the best results!</p>
                <div className="list-disc list-inside my-2">
                    {recipe.instructions?.map((instruction, index) => (
                        <div key={"instruction-" + index}>
                            <p><strong className="font-bold">Step {index + 1}</strong></p>
                            <p>{instruction.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-8">
                <span className="bg-mongodb-mint border border-mongodb-forest p-3 hover:no-underline hover:bg-mongodb-leaf hover:text-white cursor-pointer" onClick={addToGroceryList}>
                    Add to Grocery List
                </span>
            </div>
        </main>
    );
}

export default Recipe;