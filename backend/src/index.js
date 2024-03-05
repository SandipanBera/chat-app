import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config(
    {
        path: "./.env"
    }
);

const port = process.env.PORT || 3000
connectDB().then(()=>{app.listen(port, () => console.log("Server is running on port " + port))
    app.on('error', (error) => {
        console.log("Error occurred", error);
        throw error
    })}
).catch((err)=>console.log(err));

