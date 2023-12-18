// utils/ratingUtils.js
const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0; // Default to 0 if there are no reviews
    }
  
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };
  
  const extractFeedback = (reviews) => {
    return reviews.map((review) => ({
      rating: review.rating,
      feedback: review.feedback,
    }));
  };
  
  module.exports = {
    calculateAverageRating,
    extractFeedback,
  };
  