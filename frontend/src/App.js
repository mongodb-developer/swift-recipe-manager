import { useState } from "react";
import {
    Switch,
    Route,
    Redirect,
    useHistory,
} from "react-router-dom";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import Search from "./pages/search";
import ShoppingList from "./pages/shopping-list";

function App() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const history = useHistory();

    function performSearch(event) {
        if(event.key === "Enter") {
            if(event.target.value !== "") {
                history.push("/search/" + event.target.value);
            }
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed bg-mongodb-forest border-b-4 border-mongodb-fern w-full z-50 text-white">
                <nav className="container mx-auto flex items-center justify-between flex-wrap p-4">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <span className="font-bold text-xl uppercase"><a className="hover:no-underline" href="/" title="SomeRecipes">SomeRecipes</a></span>
                    </div>
                    <div className="block sm:hidden">
                        <button onClick={() => setIsNavbarOpen(!isNavbarOpen)} aria-label="Navigation Menu" className="flex items-center py-2 rounded text-white">
                            <svg viewBox="0 0 100 80" width="24" height="24" fill="#FFFFFF">
                                <rect width="100" height="15"></rect>
                                <rect y="30" width="100" height="15"></rect>
                                <rect y="60" width="100" height="15"></rect>
                            </svg>
                        </button>
                    </div>
                    <div id="nav-items" className={(isNavbarOpen ? "sm:flex " : "hidden ") + "w-full block flex-grow sm:flex sm:items-center sm:w-auto text-left sm:text-right font-bold border-t border-white mt-5 sm:mt-0 sm:border-0 sm:block"}>
                        <div className="text-sm sm:flex-grow">
                            <input onKeyPress={performSearch} className="sm:ml-6 mt-4 sm:mt-0 p-2 w-full sm:w-1/3 text-black" type="text" placeholder="Search..." />
                            <a href="/recipes" className="block mt-4 sm:inline-block sm:mt-0 text-white uppercase sm:ml-6 hover:underline">Recipes</a>
                            <a href="/shopping-list/buildfest@mongodb.com" className="block mt-4 sm:inline-block sm:mt-0 text-white uppercase sm:ml-6 hover:underline">Shopping List</a>
                        </div>
                    </div>
                </nav>
            </header>
            <Switch>
                <Route path="/recipes">
                    <Recipes />
                </Route>
                <Route path="/recipe/:id">
                    <Recipe />
                </Route>
                <Route path="/search/:query">
                    <Search />
                </Route>
                <Route path="/shopping-list/:user">
                    <ShoppingList />
                </Route>
                <Redirect exact from="/" to="/recipes" />
            </Switch>
            <footer className="bg-gray-700 text-white text-xs">
                <div className="container mx-auto p-4 flex flex-column flex-wrap">
                    <p className="flex-shrink-0">
                        Created by <a target="_blank" rel="noreferrer" href="https:/www.nraboy.com">Nic Raboy</a>, <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mlynn/">Mike Lynn</a>, and <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/kaitlinmahar/">Kaitlin Mahar</a>
                    </p>
                    <p className="flex-grow text-left mt-3 sm:mt-0 sm:text-right w-full sm:w-auto block">
                        <a target="_blank" rel="noreferrer" href="https://github.com/kmahar/RecipeApp">MongoDB BuildFest 2021</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;