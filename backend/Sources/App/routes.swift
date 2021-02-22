import MongoDBVapor
import Vapor

/// Adds a collection of routes to the application.
func routes(_ app: Application) throws {
    app.get { req -> String in
        "hello, world!"
    }
    app.get("api", "recipes") { req -> EventLoopFuture<[Recipe]> in
        return req.recipeCollection.find().flatMap { cursor in
            cursor.toArray()
        }
    }
}
