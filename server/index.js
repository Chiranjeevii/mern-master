import express from "express";
//Express enables you to build server applications in Node.js. 
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
//Morgan - HTTP req logger: when we make an API req we can see it in our local
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
mongoose.set('strictQuery', true);
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);

const MONGODB_URL = "mongodb+srv://Chiru:MongoDB123@cluster0.qwcqdkg.mongodb.net/forms_db?retryWrites=true&w=majority";
const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
