const express = require("express");
const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log(req.body);
  return res.json({ message: "good" });
});

router.get("/:pid", placesControllers.getPlaceById);
router.get("/user/:uid", placesControllers.getPlacesByUserId);
router.post("/addplace", placesControllers.createPlace);
router.patch("/:pid", placesControllers.updatePlaceById);
router.delete("/:pid", placesControllers.deletePlaceById);
module.exports = router;
