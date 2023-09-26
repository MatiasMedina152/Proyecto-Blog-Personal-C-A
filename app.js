import express from "express";
import { taskRouter } from "./src/routes/task.routes.js";
import { startDB } from "./src/config/database.js"; 

const app = express();
// IMPORTANTE PONER EXPRESS.JSON 
app.use(express.json())

const port = 3000;

app.use("/", taskRouter )


app.listen(port,() => {
    console.log(`server listening http://localhost:${port}`)
    startDB()
})