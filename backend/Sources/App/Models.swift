import Foundation
import MongoDBVapor
import Vapor

extension Request {
    var recipeCollection: MongoCollection<Recipe> {
        self.mongoDB.client.db("recipes").collection("recipes", withType: Recipe.self)
    }
}

struct Recipe: Content {
    let _id: BSONObjectID
    let title: String
    //let photo: URL?
    let servings: Int
    let calories: Int
    let ingredients: [Ingredient]
    let instructions: [Instruction]
    let rating: Rating
}

struct Ingredient: Content {
    let ingredient: String
    let quantity: Double
    let unit: Unit
    let notes: String
}

enum Unit: String, Content {
    case cup
    case ounces
    case grams
}

struct Instruction: Content {
    let description: String
    //let photo: URL?
}

struct Rating: Content {
    let average: Double
    let totalReviews: Int

    enum CodingKeys: String, CodingKey {
        case average, totalReviews = "total_reviews"
    }
}
