
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";
import express from "express"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.render("index.ejs", { imgsrc: "" })
})

app.post("/submit", (req, res) => {

    const url = req.body["linkGiven"]

    var qr_svg = qr.image(url, { type: "png" });
    const imagePath = "public/qr_svg.png";
    qr_svg.pipe(fs.createWriteStream(imagePath));

    fs.writeFile("message.txt", url, (err) => {
        if (err) throw err
        console.log("Successfull file saved");

    })
    qr_svg.on("end", () => {
        res.render("index.ejs", { imgsrc: "qr_svg.png" });
    });
})

app.listen(port, () => {
    console.log("Server is running ...");

})

