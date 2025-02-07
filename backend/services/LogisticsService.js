// services/logisticsService.js
const Shipment = require('../models/Shipment');
const AggregatedLoad = require('../models/AggregatedLoad');
const Provider = require('../models/Provider');
const NotificationService = require('./notificationService');

class LogisticsService {
  // Calculate optimal route using distance matrix and delivery priorities
  calculateOptimalRoute(locations, priorities) {
    // Initialize distance matrix (in a real application, you would use a mapping API)
    const distances = {};
    locations.forEach(start => {
      distances[start] = {};
      locations.forEach(end => {
        if (start !== end) {
          // Simulate distance calculation - replace with actual distance API
          distances[start][end] = Math.random() * 1000;
        }
      });
    });

    // Sort locations by priority and distance
    const route = [];
    let current = locations[0];
    route.push(current);

    while (route.length < locations.length) {
      let next = null;
      let minScore = Infinity;

      locations.forEach(location => {
        if (!route.includes(location)) {
          const distance = distances[current][location];
          const priority = priorities[location] || 0;
          const score = distance * (1 - priority * 0.2); // Priority reduces effective distance

          if (score < minScore) {
            minScore = score;
            next = location;
          }
        }
      });

      route.push(next);
      current = next;
    }

    return route;
  }

  // Check if shipments can be aggregated based on various factors
  async canAggregateShipments(shipments) {
    // Calculate total weight and volume
    const totalWeight = shipments.reduce((sum, s) => sum + Number(s.shipmentDetails.totalWeight || 0), 0);
const totalVolume = shipments.reduce((sum, s) => sum + Number(s.shipmentDetails.totalVolume || 0), 0);


    // Check if any available provider can handle the aggregated load
    const availableProvider = await Provider.findOne({
      'vehicles.capacity.weight': { $gte: totalWeight },
      'vehicles.capacity.volume': { $gte: totalVolume }
    });

    if (!availableProvider) return false;

    // Check delivery time constraints
    const deliveryTimes = shipments.map(s => s.expectedDeliveryDate);
    const earliestDelivery = Math.min(...deliveryTimes);
    const latestDelivery = Math.max(...deliveryTimes);
    
    // If delivery window is too wide, don't aggregate
    const MAX_DELIVERY_WINDOW = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
    if (latestDelivery - earliestDelivery > MAX_DELIVERY_WINDOW) return false;

    return true;
  }

  // Aggregate compatible shipments
  async aggregateShipments(shipments) {
    try {
      // Group shipments by region and delivery window
      const groups = this.groupShipmentsByCompatibility(shipments);
      const aggregatedLoads = [];

      for (const group of Object.values(groups)) {
        if (group.length > 1 && await this.canAggregateShipments(group)) {
          const priorities = this.calculateDeliveryPriorities(group);
          const locations = this.extractLocations(group);
          const optimizedRoute = this.calculateOptimalRoute(locations, priorities);

          const aggregatedLoad = await this.createAggregatedLoad(group, optimizedRoute);
          aggregatedLoads.push(aggregatedLoad);
          console.log("Aggregated Loads Created:", aggregatedLoads);
          // Notify MSMEs about aggregation
          for (const shipment of group) {
            await NotificationService.notifyShipmentStatus(shipment, 'aggregated');
          }
        }
      }

      return aggregatedLoads;
    } catch (error) {
      console.error('Aggregation error:', error);
      throw error;
    }
  }

  // Group shipments by compatibility
  groupShipmentsByCompatibility(shipments) {
    const groups = {};
    
    shipments.forEach(shipment => {
        const regionKey = this.getRegionKey(shipment.origin, shipment.destination);
        const timeKey = this.getTimeWindowKey(shipment.expectedDeliveryDate);
        const groupKey = `${regionKey}-${timeKey}`;
        
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(shipment);
    });

    console.log("Shipment Groups:", groups); // Debugging
    return groups;
}


  // Calculate delivery priorities based on urgency and delivery time
  calculateDeliveryPriorities(shipments) {
    const priorities = {};
    
    shipments.forEach(shipment => {
      const urgencyScore = {
        high: 1.0,
        medium: 0.6,
        low: 0.3
      }[shipment.loadDetails.urgency];

      const timeToDelivery = shipment.expectedDeliveryDate - Date.now();
      const timeScore = Math.max(0, 1 - timeToDelivery / (7 * 24 * 60 * 60 * 1000));

      priorities[shipment.destination] = Math.max(
        priorities[shipment.destination] || 0,
        (urgencyScore + timeScore) / 2
      );
    });

    return priorities;
  }

  // Find the best provider for a load
  async findBestProvider(load) {
    try {
      // Get available providers with sufficient capacity
      const providers = await Provider.find({
        'vehicles.available': true,
        'vehicles.capacity.weight': { $gte: load.totalWeight },
        'vehicles.capacity.volume': { $gte: load.totalVolume }
      });

      if (providers.length === 0) return null;

      // Score each provider
      const scoredProviders = await Promise.all(
        providers.map(async provider => {
          const score = await this.calculateProviderScore(provider, load);
          return { provider, score };
        })
      );

      // Sort by score and return the best provider
      scoredProviders.sort((a, b) => b.score - a.score);
      return scoredProviders[0].provider;
    } catch (error) {
      console.error('Provider matching error:', error);
      throw error;
    }
  }

  // Calculate provider score based on various factors
  async calculateProviderScore(provider, load) {
    const weights = {
      rating: 0.3,
      distance: 0.3,
      reliability: 0.2,
      price: 0.2
    };

    const ratingScore = provider.rating / 5;
    const distanceScore = this.calculateDistanceScore(provider.currentLocation, load.optimizedRoute[0].location);
    const reliabilityScore = provider.totalTrips > 0 ? 
      (provider.completedTrips / provider.totalTrips) : 0.5;
    const priceScore = this.calculatePriceScore(provider, load);

    return (
      weights.rating * ratingScore +
      weights.distance * distanceScore +
      weights.reliability * reliabilityScore +
      weights.price * priceScore
    );
  }

  // Helper methods for region and time window calculations
  getRegionKey(origin, destination) {
    if (!origin || !destination || !origin.zipCode || !destination.zipCode) {
        console.error("Invalid origin or destination:", origin, destination);
        return "unknown-region";
    }
    
    // Use zip codes instead of substring to avoid object errors
    return `${origin.zipCode}-${destination.zipCode}`;
}


  getTimeWindowKey(deliveryDate) {
    // Group deliveries into 24-hour windows
    return Math.floor(deliveryDate.getTime() / (24 * 60 * 60 * 1000));
  }
}

module.exports = new LogisticsService();