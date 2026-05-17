import colors from "colors";
import dotenv from "dotenv";
import app from "./Src/app.js"
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Application is Running on port:${PORT} http://localhost:${PORT}/`.bgGreen)
})