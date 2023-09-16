import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
import UserProfileModel from "./models/Profile.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const PORT = 3000 || process.env.PORT;

app.get("/find-unique-profile/:id", async (req, res) => {
  const { id } = req.params;

  const profileDoc = await UserProfileModel.findOne({ userId: id });
  if (profileDoc) {
    res.status(200).json({ message: "Profile found", data: profileDoc });
  } else {
    res.status(200).json({ message: "Profile not found!", data: null });
  }
});

app.post("/create-unique-profile", async (req, res) => {
  const { userId, username, imageUrl, email } = req.body;

  const newProfileDoc = await UserProfileModel.create({
    userId: userId,
    username: username,
    imageUrl: imageUrl,
    email: email
  });

  if (newProfileDoc) {
    await newProfileDoc.save();
    res.status(200).json({ message: "Profile created successfully", data: newProfileDoc });
  } else {
    res.status(400).json({ message: "Something went wrong!", data: null });
  }

});

app.get("/find-profile-servers/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
});

app.post("/public/images",(req,res)=>{
  console.log("image");
})

// DB connection
connectDB();

// server connection
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
