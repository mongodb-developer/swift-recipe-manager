import { useEffect, useState } from "react";
import axios from "axios";

function Recipes() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:8080/api/recipes"
        })
        .then(response => response.data)
        .then(result => {
            setRecipes(result);
        });
    }, []);

    return (
        <main className="container mx-auto pt-24 px-4">
            <h1 className="text-2xl font-bold mb-2 text-black">Available Recipes</h1>
            <p>
                Check out the list of available recipes!
            </p>
            {recipes.map((recipe, index) => (
                <h2 key={index} className="text-lg font-medium mb-2">
                    <a href={"/recipe/" + recipe._id.$oid}>{recipe.title}</a>
                </h2>
            ))}
        </main>
    );
}

export default Recipes;