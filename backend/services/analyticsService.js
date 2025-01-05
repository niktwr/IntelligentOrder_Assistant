const Order = require('../models/Order');

exports.getOrderAnalytics = async (startDate, endDate) => {
  const analytics = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalOrders: { $sum: 1 },
        revenue: { $sum: "$totalAmount" }
      }
    }
  ]);
  return analytics;
};