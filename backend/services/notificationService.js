// services/notificationService.js

// Import any database models you need
const MSME = require('../models/MSME'); // Adjust the path as needed

class NotificationService {
  constructor() {
    // Initialize with default configuration
    this.enabled = true;  // Can be used to toggle notifications system-wide
    this.logNotifications = true;  // Whether to log notifications to console
  }

  // Main method to send notifications
  async sendWhatsAppUpdate(phoneNumber, message) {
    try {
      if (!this.enabled) {
        console.log('Notifications are currently disabled');
        return;
      }

      // Log the notification for development/debugging
      if (this.logNotifications) {
        console.log('\n=== Notification Sent ===');
        console.log(`To: ${phoneNumber}`);
        console.log(`Message: ${message}`);
        console.log('========================\n');
      }

      // Here you could add alternative notification methods:
      // - Email notifications
      // - Push notifications
      // - SMS through a different provider
      
      return true;  // Indicate successful sending
    } catch (error) {
      console.error('Notification error:', error);
      throw new Error(`Failed to send notification: ${error.message}`);
    }
  }

  // Send shipment status notification to MSME
  async notifyShipmentStatus(shipment, status) {
    try {
      const message = this.createStatusMessage(shipment, status);
      
      // Get MSME phone number from the database
      const msme = await MSME.findById(shipment.msmeId);
      if (!msme) {
        throw new Error(`MSME not found for shipment ${shipment._id}`);
      }

      if (msme.phone) {
        await this.sendWhatsAppUpdate(msme.phone, message);
      } else {
        console.warn(`No phone number found for MSME ${msme._id}`);
      }
    } catch (error) {
      console.error('Error in notifyShipmentStatus:', error);
      throw error;
    }
  }

  // Send load match notification to provider
  async notifyLoadMatch(provider, load) {
    try {
      const message = this.createLoadMatchMessage(load);
      
      if (provider.phone) {
        await this.sendWhatsAppUpdate(provider.phone, message);
      } else {
        console.warn(`No phone number found for provider ${provider._id}`);
      }
    } catch (error) {
      console.error('Error in notifyLoadMatch:', error);
      throw error;
    }
  }

  // Create status update message
  createStatusMessage(shipment, status) {
    // Enhanced status messages with more details
    const messages = {
      matched: `🚚 Shipment Match Found!\n\nShipment ID: ${shipment._id}\nStatus: Matched with Provider\nExpected Pickup: ${new Date(shipment.expectedDeliveryDate).toLocaleString()}\n\nTrack your shipment in the dashboard for real-time updates.`,
      
      in_transit: `🚛 Shipment In Transit\n\nShipment ID: ${shipment._id}\nCurrent Location: ${shipment.trackingUpdates[shipment.trackingUpdates.length - 1].location}\n\nYour shipment is on its way to the destination.`,
      
      delivered: `✅ Delivery Completed!\n\nShipment ID: ${shipment._id}\nStatus: Successfully Delivered\n\nPlease take a moment to rate your experience and provide feedback.`
    };

    return messages[status] || `📦 Status Update: Shipment ${shipment._id} is now ${status}`;
  }

  // Create load match message for provider
  createLoadMatchMessage(load) {
    return `🆕 New Load Match Available!\n\n` +
           `📦 Weight: ${load.totalWeight}kg\n` +
           `🛣️ Route: ${load.optimizedRoute.map(r => r.location).join(' → ')}\n\n` +
           `Open your dashboard now to review and accept this opportunity.`;
  }

  // Send delivery reminder to provider
  async sendDeliveryReminder(provider, shipment) {
    try {
      const message = `⏰ Delivery Reminder\n\n` +
                     `Shipment ID: ${shipment._id}\n` +
                     `Status: ${shipment.status}\n` +
                     `Delivery Due: In 24 hours\n\n` +
                     `Please ensure timely delivery.`;
      
      if (provider.phone) {
        await this.sendWhatsAppUpdate(provider.phone, message);
      } else {
        console.warn(`No phone number found for provider ${provider._id}`);
      }
    } catch (error) {
      console.error('Error in sendDeliveryReminder:', error);
      throw error;
    }
  }
}

// Export a single instance of the service
module.exports = new NotificationService();