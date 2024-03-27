require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser"); //
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json()); //

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB);

const Tema = mongoose.model("tema", {
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
  });

app.post("/contents", async (req, resp) => {
    try {
      const tema = new Tema(req.body);
      await tema.save();
      resp.status(201).json(tema);
    } catch (error) {
      resp.status(400).json({ message: error.message });
    }
  });

app.get("/contents/:id", async (req, resp) =>{
    try {
        const tema = await Tema.findById(req.params.id).exec()
        resp.json(tema)
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
})

app.get("/contents", async (req, resp) => {
    const filter = {};
    const all = await Tema.find(filter);
    resp.json(all)
})

app.put("/contents/:id", async (req, resp) => {
    try {
        const tema = await Tema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        resp.json(tema)
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
})

app.delete("/contents/:id", async (req, resp) => {
    try {
        const tema = await Tema.findByIdAndDelete(req.params.id);
        resp.json(tema)
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
})

app.get("/", (req, resp) => {
    resp.json({ message: "witam, niczego nierozwal" });
  });

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })