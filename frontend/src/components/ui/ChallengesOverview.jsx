import React from "react";
import Card from "./Card";
import CardContent from "./CardContent";


const ChallengesOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">High Transportation Costs</h3>
          <p className="text-sm text-gray-600">
            MSMEs incur 20-30% extra costs due to low shipment volumes and lack of negotiating power.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Inefficient Resource Utilization</h3>
          <p className="text-sm text-gray-600">
            Empty return trips and underutilized capacity increase operational expenses.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Shipment Aggregation Issues</h3>
          <p className="text-sm text-gray-600">
            No efficient way to consolidate small shipments prevents economies of scale.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Limited Tech & Finance Access</h3>
          <p className="text-sm text-gray-600">
            MSMEs struggle to access modern technology and financial services to optimize logistics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengesOverview;
