const express = require("express");
const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: "20 W 34th St,New York,NY 10001",
    creator: "u1",
  },
];
router.post("/", (req, res, next) => {
  console.log(req.body);
  return res.json({ message: "good" });
});

router.get("/:pid",
router.get("user/:Cid", (req, res, next) => {
  console.log("GET Request in Places");
  const creatorID = req.params.Cid;
  const place = DUMMY_PLACES.find((c) => {
    return c.creator == creatorID;
  });
  if (!place) {
    throw next(new Error("not found place id", 404));
    // return res.status(404).json({ message: "not found place for the user id" });
  }
  return res.json({ place });
});

module.exports = router;
