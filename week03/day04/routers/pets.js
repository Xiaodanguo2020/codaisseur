const express = require("express");
const Pet = require("../models").Pet;
const { Router } = express;
const AuthMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res) => {
  console.log(req.headers);
  // should return a list of all the pets
  const allPets = await Pet.findAll();
  res.send(allPets);
});

router.get("/:id", async (req, res) => {
  // Should return a specific pet
  const specificPet = await Pet.findByPk(req.params.id);
  if (specificPet) {
    res.send(specificPet);
  } else {
    res.status(404).send("Pet with that ID not found");
  }
});

router.post("/", AuthMiddleware, async (req, res) => {
  const { name, kind, breed, gender, food } = req.body;
  if (name && kind && breed && food) {
    try {
      const newPet = await Pet.create({
        name: name,
        kind: kind,
        breed: breed,
        gender: gender,
        food: food,
        OwnerId: req.user.id
      });
      res.status(201).send(newPet);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(400).send("Missing attributes for pet");
  }
});

module.exports = router;
