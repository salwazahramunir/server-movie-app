function errorHandler(error, req, res, next) {
    
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        let errors = error.errors.map(el => el.message);
        res.status(400).json({ message: errors });
    } else if (error.name === "addFavoriteUnique") {
        res.status(400).json({ message: "The movie is already in favorites"})
    } else if (error.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ message: "Genre Id is required"})
    } else if (error.name === "No Token") {
        res.status(401).json({ message: "Please login" });
    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid token" });
    } else  if (error.name === "Invalid email or password") {
        res.status(401).json({ message: "error invalid username or email or password" });
    } else if (error.name === "Forbidden") {
        res.status(403).json({ message: "Sorry you don't have permission" });
    } else if (error.name === "Not Found") {
        res.status(404).json({ message: "Data not found" });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = errorHandler;