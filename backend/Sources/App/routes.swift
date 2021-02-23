import MongoDBVapor
import Vapor

extension BSONDocument: Content{}

func routes(_ app: Application) throws {

    app.get { req -> String in
        "hello, world!"
    }

    app.get("api", "recipes") { req -> EventLoopFuture<[Recipe]> in
        return req.recipeCollection.find().flatMap { cursor in
            cursor.toArray()
        }
    }

    app.get("api", "recipe", ":title") { req -> EventLoopFuture<[BSONDocument]> in
        guard let title = req.parameters.get("title") else {
            throw Abort(.internalServerError, reason: "Request unexpectedly missing name parameter")
        }
        let pipeline: [BSONDocument] = [
            ["$match": [ "title": .string(title) ]]
        ]
        return req.recipeCollection.aggregate(pipeline).flatMap { cursor in
            cursor.toArray()
        }
    }
    
}
