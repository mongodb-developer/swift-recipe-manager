import Foundation
import MongoDBVapor
import Vapor

struct Recipe: Content {
    let _id: BSONObjectID
    let title: String
    let photo: URL?
    let servings: Int
    let caloriesPerServing: Int
    let ingredients: [Ingredient]
    let instructions: [Instruction]
    let rating: Rating
}

struct Ingredient: Content {
    let name: String
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
    let photo: URL?
}

struct Rating: Content {
    let average: Double
    let totalReviews: Int
}
