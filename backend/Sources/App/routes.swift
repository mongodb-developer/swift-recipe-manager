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

    app.post("api", "search") { req -> EventLoopFuture<[BSONDocument]> in
        let body = try req.content.decode(BSONDocument.self)
        guard let query = body.query else {
            throw Abort(.internalServerError, reason: "Request unexpectedly missing name parameter")
        }
        let pipeline: [BSONDocument] = [
            [
                "$search": [ 
                    "text": [
                        "query": query,
                        "path": ["title", "ingredients.ingredient"],
                        "fuzzy": [
                            "maxEdits": 1
                        ]
                    ]
                ]
            ]
        ]
        return req.recipeCollection.aggregate(pipeline).flatMap { cursor in
            cursor.toArray()
        }
    }

    app.get("api", "recipe", ":id") { req -> EventLoopFuture<Recipe> in
        guard let id = req.parameters.get("id") else {
            throw Abort(.internalServerError, reason: "Request unexpectedly missing name parameter")
        }
        let bsonId = try BSONObjectID(id)
        return req.recipeCollection.findOne([ "_id": .objectID(bsonId) ]).unwrap(or: Abort(.notFound, reason: "No recipe with matching id"))
    }

    app.put("api", "grocery-list") { req -> EventLoopFuture<Response> in
        let body = try req.content.decode(GroceryListAddition.self)
        return req.recipeCollection.aggregate(
            [
                ["$match": [ "_id": .objectID(body.recipeId) ]],
                ["$project": ["_id": 1, "ingredients": 1]]
            ]
        ).flatMap { cursor in
            cursor.toArray()
        }.map { array in
            array.first
        }.unwrap(or: Abort(.notFound, reason: "No recipe with matching id"))
        .flatMap { recipeDoc in
            req.userCollection.updateOne(
                filter: ["name": .string(body.userName)],
                update: [
                    "$addToSet": ["recipes": .document(recipeDoc)]
                ],
                options: UpdateOptions(upsert: true)
            )
        }.map { _ in
            Response(status: .ok)
        }
    }

    app.get("api", "grocery-list", ":name") { req -> EventLoopFuture<[BSONDocument]> in
        guard let name = req.parameters.get("name") else {
            throw Abort(.internalServerError, reason: "Request unexpectedly missing name parameter")
        }

        let pipeline: [BSONDocument] = [
            ["$match": ["name": .string(name)]],
            ["$unwind": "$recipes"],
            ["$unwind": "$recipes.ingredients"],
            [
                "$group": [
                    "_id": [
                        "ingredient": "$recipes.ingredients.ingredient",
                        "unit": "$recipes.ingredients.unit"
                    ],
                    "total": [
                        "$sum": "$recipes.ingredients.quantity"
                    ]
                ]
            ]
        ]

        return req.userCollection.aggregate(pipeline).flatMap { cursor in
            cursor.toArray()
        }
    }

    app.get("api", "recipe-list", ":name") { req -> EventLoopFuture<[BSONDocument]> in
        guard let name = req.parameters.get("name") else {
            throw Abort(.internalServerError, reason: "Request unexpectedly missing name parameter")
        }

        let pipeline: [BSONDocument] = [
            ["$match": ["name": .string(name)]],
            [
                "$lookup": [
                    "from": "recipes",
                    "localField": "recipes._id",
                    "foreignField": "_id",
                    "as": "recipe"
                ]
            ],
            [
                "$project": [
                    "_id": 1,
                    "recipe._id": 1,
                    "recipe.title": 1
                ]
            ]
        ]

        return req.userCollection.aggregate(pipeline).flatMap { cursor in
            cursor.toArray()
        }
    }

}

struct GroceryListAddition: Codable {
    let recipeId: BSONObjectID
    let userName: String
}
