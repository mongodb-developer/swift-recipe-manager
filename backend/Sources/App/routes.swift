import MongoDBVapor
import Vapor

extension Recipe: Content {}

/// Adds a collection of routes to the application.
func routes(_ app: Application) throws {
    app.get { req -> String in
        "hello, world!"
    }
    app.get("api", "recipes") { req -> Recipe in
        return Recipe(
            title: "Cookies",
            servings: 6,
            calories: 300
        )
    }
}
