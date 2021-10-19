const getPlaceById = (req, res, next) => {
  console.log("GET Request in Places");
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
