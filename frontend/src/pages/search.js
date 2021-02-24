import { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import axios from "axios";

function Search() {

    const [recipes, setRecipes] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        axios({
            "method": "POST",
            "url": "http://localhost:8080/api/search",
            "data": {
                "query": query
            }
        })
        .then(response => response.data)
        .then(result => {
            setRecipes(result);
        });
    }, [query]);

    return (
        <main className="container mx-auto pt-24 px-4">
            <h1 className="text-2xl font-bold mb-2 text-black">Recipes Matching "{query}"</h1>
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

export default Search;