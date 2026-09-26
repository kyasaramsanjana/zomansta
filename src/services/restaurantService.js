const Restaurant = require('../models/Restaurant');

const createRestaurant = async (data) => {
  const restaurant = await Restaurant.create(data);
  return restaurant;
};

const getAllRestaurants = async () => {
  const restaurants = await Restaurant.find({ isActive: true })
    .populate('owner', 'name email')
    .sort({ createdAt: -1 });
  return restaurants;
};

const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id)
    .populate('owner', 'name email');
  if (!restaurant) throw new Error('Restaurant not found');
  return restaurant;
};

const updateRestaurant = async (id, userId, data) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) throw new Error('Restaurant not found');
  if (restaurant.owner.toString() !== userId) {
    throw new Error('Not authorized');
  }
  const updated = await Restaurant.findByIdAndUpdate(
    id, data, { new: true }
  );
  return updated;
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant
};
