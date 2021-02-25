import { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import axios from "axios";

function ShoppingList() {

    const [shoppingList, setShoppingList] = useState([]);
    const [recipeList, setRecipeList] = useState({});
    const [doReloadData, setDoReloadData] = useState(false);
    const { user } = useParams();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": `http://localhost:8080/api/grocery-list/${user}`
        })
        .then(response => response.data)
        .then(result => {
            setShoppingList(result);
        });
        axios({
            "method": "GET",
            "url": `http://localhost:8080/api/recipe-list/${user}`
        })
        .then(response => response.data)
        .then(result => {
            if(result.length > 0) {
                setRecipeList(result[0]);
            }
        });
        setDoReloadData(false);
    }, [user, doReloadData]);

    function removeRecipeFromList(recipeId, index) {
        axios({
            "method": "DELETE",
            "url": `http://localhost:8080/api/recipe-list/${user}/${recipeId}`
        })
        .then(response => response.data)
        .then(result => {
            setDoReloadData(true);
        }, error => {
            console.error(error);
        });
    }

    return (
        <main className="container mx-auto pt-24 px-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2 text-black">Shopping List for "{user}"</h1>
                <p>
                    Based on the recipes in your list, you'll need the following ingredients and ingredient quantities.
                </p>
            </div>
            <div className="mb-8">
                <p><strong className="font-bold">Ingredients</strong></p>
                <ul className="list-disc list-inside my-2">
                    {shoppingList.map((item, index) => (
                        <li key={"item-" + index}>
                            {item.total.toFixed(2)} {item._id.unit} - {item._id.ingredient}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-8">
                <p><strong className="font-bold">Recipes</strong></p>
                <p>
                    Based on the ingredients in your shopping list, you can prepare the following recipes.
                </p>
                <ul className="list-disc list-inside my-2">
                    {recipeList.recipe?.map((recipe, index) => (
                        <p key={"recipe-" + index}>
                            <a href={"/recipe/" + recipe._id.$oid}>{recipe.title}</a> 
                            <span onClick={() => { removeRecipeFromList(recipe._id.$oid, index) }} className="bg-red-500 border border-red-700 py-1 px-2 ml-2 text-white text-xs hover:bg-red-700 cursor-pointer">
                                remove
                            </span>
                        </p>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default ShoppingList;