const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3002 
const app = express() 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
}
app.use(routes)
// app.get("*", (request, response) => {
//     response.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// });
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exerciseApp", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});


const server = app.listen(PORT, () => {
    console.log(`API server now listening on port ${PORT}`)
}); 

module.exports = server
