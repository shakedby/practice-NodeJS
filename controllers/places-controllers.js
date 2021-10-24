const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  console.log("GET Request in Places2");
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    return next(new HttpError("invalid inputs", 422));
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    throw new HttpError("invalid inputs", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) }; //{...-create new object with the all data from the old object-copy}
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("could not find a place for that id.", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  return res.status(200).json({ message: "place deleted" });
};

exports.getPlacesByUserId = getPlacesByUserId;
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
