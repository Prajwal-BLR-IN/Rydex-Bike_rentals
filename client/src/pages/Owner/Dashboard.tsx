import React, { useEffect, useState } from "react";
import {
  assets,
  dummyDashboardData,
  type dashboadDatatype,
} from "../../assets/assets";
import TitleOwner from "../../components/owner/TitleOwner";

type dashboardCardType = {
  title: string;
  value: number;
  icon: string;
};

const Dashboard = () => {
  const [data, setData] = useState<dashboadDatatype | null>(null);

  const dashboadCard: dashboardCardType[] = data
    ? [
        {
          title: "Total bikes",
          value: data.totalBikes,
          icon: assets.carIconColored,
        },
        {
          title: "Total Bookings",
          value: data.totalBookings,
          icon: assets.listIconColored,
        },
        {
          title: "Pending",
          value: data.pendingBooking,
          icon: assets.cautionIconColored,
        },
        {
          title: "Confirmed",
          value: data.completeBookings,
          icon: assets.listIconColored,
        },
      ]
    : [];

  const fetchDashboadData = async () => {
    setData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboadData();
  }, []);

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <TitleOwner
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total bikes, bookings, revenue, and recent activities"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboadCard.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center border border-borderColor rounded-md p-4 justify-between"
          >
            <div>
              <h3 className="text-xs text-gray-500">{card.title}</h3>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="bg-primary/10 rounded-full flex items-center justify-center w-10 h-10">
              <img src={card.icon} alt="icon" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="border border-borderColor rounded-md p-4 md:p-6 max-w-lg w-full">
          <h2 className="font-medium text-lg">Recent Bookings</h2>
          <p className="text-gray-500">Latest customer bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <h3>
                    {booking.bike.brand} {booking.bike.model}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">र{booking.price}</p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Total Revenue */}
        <div className="border border-borderColor rounded-md p-4 md:p-6 mb-6 w-full md:max-w-xs">
          <h2 className="text-lg font-medium">Monthly Revenue</h2>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-green-600">
            र{data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
