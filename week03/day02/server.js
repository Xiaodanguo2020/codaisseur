const express = require("express");
const Pet = require("./models").Pet;

const app = express();
app.use(express.json());

app.get("/pets", async (req, res) => {
  // should return a list of all the pets
  const allPets = await Pet.findAll();
  res.send(allPets);
});

app.get("/pets/:id", async (req, res) => {
  // Should return a specific pet
  const specificPet = await Pet.findByPk(req.params.id);
  if (specificPet) {
    res.send(specificPet);
  } else {
    res.status(404).send("Pet with that ID not found");
  }
});

app.post("/pets", async (req, res) => {
  console.log("POST /pets got ", req.body);
  const { name, kind, breed, gender, food } = req.body;
  if (name && kind && breed && food) {
    try {
      const newPet = await Pet.create(req.body);
      res.status(201).send(newPet);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(400).send("Missing attributes for pet");
  }
});

app.post("/parrot", async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
