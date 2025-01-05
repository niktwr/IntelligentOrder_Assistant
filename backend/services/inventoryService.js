class InventoryService {
  async decreaseStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (product) {
      product.stockQuantity -= quantity;
      await product.save();
    }
  }
}

const inventoryService = new InventoryService();
module.exports = { inventoryService };