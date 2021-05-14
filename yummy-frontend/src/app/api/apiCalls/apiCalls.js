import axios from 'axios';

const getHeaders = (addicional = {}) => {
  if (localStorage.getItem('token'))
    return {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...addicional
      }
    };
  else
    return { headers: { ...addicional } };
};

/* Auth */
export function getUserByEmail({ email }) {
  return axios.get(`/api/v1/users/email/${email}`).then(response => response.data);
}
export function login({ payload }) {
  return axios.post('/api/v1/auth/login', payload).then(response => response.data);
}
export function sendSms({ phone }) {
  return axios.post('/api/v1/auth/sendSMS', { phone }).then(response => response.data);
}
export function validateSms({ payload }) {
  return axios.post('/api/v1/auth/validateSMS', payload).then(response => response.data);
}
export function renewToken({ renew }) {
  return axios.post('/api/v1/auth/renew', { renew }, getHeaders()).then(response => response.data);
}
export function logout() {
  return axios.post('/api/v1/auth/logout', {}, getHeaders()).then(response => response.data);
}

/* User */
export function addUser({ payload }) {
  return axios.post('/api/v1/users', payload).then(response => response.data);
}
export function blockUser({ userId }) {
  return axios.post(`/api/v1/users/${userId}/block`, {reason: '-'}, getHeaders()).then(response => response.data);
}


/* Restaurants */
export function getRestaurants() {
  return axios.get(`/api/v1/restaurants`, getHeaders()).then(response => response.data);
}
export function addRestaurant({ payload }) {
  return axios.post(`/api/v1/restaurants`, payload, getHeaders()).then(response => response.data);
}
export function updateRestaurant({ payload }) {
  return axios.patch(`/api/v1/restaurants/${payload.id}`, payload, getHeaders()).then(response => response.data);
}
export function deleteRestaurant({ restaurantId }) {
  return axios.delete(`/api/v1/restaurants/${restaurantId}`, getHeaders()).then(response => response.data);
}
export function getRestaurantsPublic() {
  return axios.get(`/api/v1/restaurants/public`).then(response => response.data);
}

/* Meals */
export function getMeals({ restaurantId }) {
  return axios.get(`/api/v1/restaurants/${restaurantId}/meals`, getHeaders()).then(response => response.data);
}
export function addMeal({ payload }) {
  return axios.post(`/api/v1/restaurants/${payload.restaurantId}/meals`, payload, getHeaders()).then(response => response.data);
}
export function updateMeal({ payload }) {
  return axios.patch(`/api/v1/restaurants/${payload.restaurantId}/meals/${payload.id}`, payload, getHeaders()).then(response => response.data);
}
export function deleteMeal({ restaurantId, mealId }) {
  return axios.delete(`/api/v1/restaurants/${restaurantId}/meals/${mealId}`, getHeaders()).then(response => response.data);
}

/* Order */
export function createOrder({ payload }) {
  return axios.post('/api/v1/orders', payload, getHeaders()).then(response => response.data);
}
export function updateMealOrder({ payload }) {
  return axios.post(`/api/v1/orders/${payload.orderId}/meals`, payload, getHeaders()).then(response => response.data);
}
export function listOrders() {
  return axios.get('/api/v1/orders/', getHeaders()).then(response => response.data);
}
export function updateOrderStatus({ orderId, status }) {
  return axios.patch(`/api/v1/orders/${orderId}`, { status }, getHeaders()).then(response => response.data);
}
export function getOrder({ orderId }) {
  return axios.patch(`/api/v1/orders/${orderId}`, getHeaders()).then(response => response.data);
}
