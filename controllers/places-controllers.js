const uuid = require("uuid");

const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  console.log("GET Request in Places1");
  const placeID = req.params.pid; //{pid:p1}
  const place = DUMMY_PLACES.find((p) => {
    return p.id == placeID;
  });
  if (!place) {
    throw new HttpError("not found place id", 404);
    // error.code = 404;
    // throw error;
    // return res.status(404).json({ message: "not found place" });
  }
  return res.json({ place }); //==>{place}=>{place:place}
};

//two option:
//1. function getPlaceById() {...}
//2. const getPlaceById= function(){...}///the best

const getPlaceByUserId = (req, res, next) => {
  console.log("GET Request in Places2");
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  //instead do it:const title=req.body.title;
  const createdPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)-to add to the first element
  return res.status(201).json({ place: createdPlace });
};
const updatePlaceById = (req, res, next) => {
  const { title, description } = req.body;
};
const deletePlaceById = (req, res, next) => {};

exports.getPlaceByUserId = getPlaceByUserId;
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
