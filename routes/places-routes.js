const express = require("express");
const placesControllers = require("../controllers/places-controllers");
const { check } = require("express-validator");
const router = express.Router();

router.post("/", (req, res, next) => {
  console.log(req.body);
  return res.json({ message: "good" });
});

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post(
  "/addplace",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlaceById
);

router.delete("/:pid", placesControllers.deletePlaceById);

module.exports = router;
