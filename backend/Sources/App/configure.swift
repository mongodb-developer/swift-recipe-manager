import MongoDBVapor
import Vapor

/// Configures the application.
public func configure(_ app: Application) throws {
    // serve files from /Public folder
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    // register routes
    try routes(app)
}
