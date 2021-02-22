import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Recipes from "./pages/recipes";
import Home from "./pages/home";

function App() {
    const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
    return (
        <Router>
            <div class="flex flex-col min-h-screen">
                <header class="fixed bg-green-forest border-b-4 border-green-fern w-full z-50 text-white">
                    <nav class="container mx-auto flex items-center justify-between flex-wrap p-4">
                        <div class="flex items-center flex-shrink-0 text-white mr-6">
                            <span class="font-bold text-xl uppercase"><a class="hover:no-underline" href="/" title="BuildFest 2021">BuildFest 2021</a></span>
                        </div>
                        <div class="block sm:hidden">
                            <button onClick={() => setIsNavbarOpen(!isNavbarOpen)} aria-label="Navigation Menu" class="flex items-center py-2 rounded text-white">
                                <svg viewBox="0 0 100 80" width="24" height="24" fill="#FFFFFF">
                                    <rect width="100" height="15"></rect>
                                    <rect y="30" width="100" height="15"></rect>
                                    <rect y="60" width="100" height="15"></rect>
                                </svg>
                            </button>
                        </div>
                        <div id="nav-items" className={(isNavbarOpen ? "flex " : "hidden ") + "w-full block flex-grow sm:flex sm:items-center sm:w-auto text-left sm:text-right font-bold border-t border-white mt-5 sm:mt-0 sm:border-0 sm:block"}>
                            <div class="text-sm sm:flex-grow">
                                <a href="/" class="block mt-4 sm:inline-block sm:mt-0 text-white uppercase sm:ml-6 hover:underline">Home</a>
                                <a href="/recipes" class="block mt-4 sm:inline-block sm:mt-0 text-white uppercase sm:ml-6 hover:underline">Recipes</a>
                            </div>
                        </div>
                    </nav>
                </header>
                <Switch>
                    <Route path="/recipes">
                        <Recipes />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <footer class="bg-gray-700 text-white text-xs">
                    <div class="container mx-auto p-4">
                        Created by <a href="https:/www.nraboy.com">Nic Raboy</a>, <a href="#">Mike Lynn</a>, and <a href="#">Kaitlin Mahar</a>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;