final class Recipe: Codable {
    let title: String
    let servings: Int
    let calories: Int

    init(title: String, servings: Int, calories: Int) {
        self.title = title
        self.servings = servings
        self.calories = calories
    }
}