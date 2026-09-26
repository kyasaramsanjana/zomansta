const asyncHandler = require('../utils/asyncHandler');
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant
} = require('../services/restaurantService');

// @route POST /api/restaurants
const addRestaurant = asyncHandler(async (req, res) => {
  const { name, description, location, cuisine, isVeg } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Restaurant name is required');
  }

  const restaurant = await createRestaurant({
    name,
    description,
    location,
    cuisine,
    isVeg,
    owner: req.user._id
  });

  res.status(201).json({ success: true, data: restaurant });
});

// @route GET /api/restaurants
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await getAllRestaurants();
  res.status(200).json({ success: true, data: restaurants });
});

// @route GET /api/restaurants/:id
const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await getRestaurantById(req.params.id);
  res.status(200).json({ success: true, data: restaurant });
});

// @route PUT /api/restaurants/:id
const editRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await updateRestaurant(
    req.params.id,
    req.user._id.toString(),
    req.body
  );
  res.status(200).json({ success: true, data: restaurant });
});

module.exports = {
  addRestaurant,
  getRestaurants,
  getRestaurant,
  editRestaurant
};