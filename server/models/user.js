import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  id: { type: String },
});

export default mongoose.model("User", userSchema);

//Creating the User Schema. Mongoose models allow us to access data from MongoDB in an object-oriented fashion. The first step to creating a model is defining the schema for it. Then, we'll need to register the model with Mongoose so that we can use it throughout our application. Create the schema for the user model.