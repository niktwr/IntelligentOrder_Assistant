class EmailService {
  async sendOrderConfirmation(userId, order) {
    // Implement with your preferred email service (e.g., nodemailer)
    console.log(`Order confirmation email sent for order ${order._id}`);
    return true;
  }
}

const emailService = new EmailService();
module.exports = { emailService };
