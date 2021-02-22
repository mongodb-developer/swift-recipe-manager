import App
import MongoDBVapor
import Vapor

var env = try Environment.detect()
try LoggingSystem.bootstrap(from: &env)

let app = Application(env)
try configure(app)

let mongoDBURI = ProcessInfo.processInfo.environment["MONGODB_URI"] ?? "mongodb://localhost:27017"

// Configure the app for using a MongoDB server at the provided connection string.
try app.mongoDB.configure(mongoDBURI)

// Use `ExtendedJSONEncoder` and `ExtendedJSONDecoder` for encoding/decoding `Content`.
ContentConfiguration.global.use(encoder: ExtendedJSONEncoder(), for: .json)
ContentConfiguration.global.use(decoder: ExtendedJSONDecoder(), for: .json)

defer {
    // Cleanup the application's MongoDB data.
    app.mongoDB.cleanup()
    // Clean up the driver's global state. The driver will no longer be usable from this program after this method is
    // called.
    cleanupMongoSwift()
    app.shutdown()
}

try app.run()

