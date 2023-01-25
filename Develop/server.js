const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require('./controller/htmlController'));
app.use(require('./controller/notesController'));

app.listen(PORT, function () {
    console.log("Server is listening at http://localhost:" + PORT);
});