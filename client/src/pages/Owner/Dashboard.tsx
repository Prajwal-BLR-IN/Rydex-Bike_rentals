import { assets, type BookingType } from "../../assets/assets";
import DataEmpty from "../../components/DataEmpty";
import Loader from "../../components/Loader";
import TitleOwner from "../../components/owner/TitleOwner";
import { useOwnerQuery } from "../../hooks/useOwnerQuery";

type DashboardCardType = {
  title: string;
  value: number;
  icon: string;
};

const Dashboard = () => {
  const { isLoading, ownerData } = useOwnerQuery();
  const dashboardData = ownerData?.dashboardData;

  const dashboardCard: DashboardCardType[] = dashboardData
    ? [
        {
          title: "Total bikes",
          value: dashboardData.totalBikes || 0,
          icon: assets.carIconColored,
        },
        {
          title: "Total Bookings",
          value: dashboardData.totalBookings || 0,
          icon: assets.listIconColored,
        },
        {
          title: "Pending",
          value: dashboardData.pendingBooking || 0,
          icon: assets.cautionIconColored,
        },
        {
          title: "Confirmed",
          value: dashboardData.completeBookings || 0,
          icon: assets.listIconColored,
        },
      ]
    : [];

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <TitleOwner
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total bikes, bookings, revenue, and recent activities"
      />

      {!dashboardData ? (
        <div className="mt-6">
          <DataEmpty
            title="No Data Available"
            para="You have not added any bikes yet."
          />
        </div>
      ) : (
        <>
          {/* Cards Section */}
          {dashboardCard.length === 0 ? (
            <DataEmpty title="No Cards" para="Dashboard cards not available." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
              {dashboardCard.length === 0 ? (
                <DataEmpty
                  title="No Cards"
                  para="Dashboard cards not available."
                />
              ) : (
                dashboardCard.map((card, index) => (
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
                ))
              )}
            </div>
          )}

          {/* Recent Bookings & Revenue Section */}
          <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
            {/* Recent Bookings */}
            <div className="border border-borderColor rounded-md p-4 md:p-6 max-w-lg w-full">
              <h2 className="font-medium text-lg">Recent Bookings</h2>
              <p className="text-gray-500">Latest customer bookings</p>

              {dashboardData.recentBookings &&
              dashboardData.recentBookings.length > 0 ? (
                dashboardData.recentBookings.map(
                  (booking: BookingType, index: number) => (
                    <div
                      key={index}
                      className="mt-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          <img
                            src={assets.listIconColored}
                            alt="icon"
                            className="h-5 w-5"
                          />
                        </div>
                        <div>
                          <h3>
                            {booking.bike.brand} {booking.bike.bikeModel}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {booking.createdAt.split("T")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <p className="text-sm text-gray-500">
                          र{booking.price}
                        </p>
                        <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                          {booking.status}
                        </p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="mt-4">
                  <DataEmpty
                    title="No Bookings Yet"
                    para="Customer bookings will appear here once they booked."
                  />
                </div>
              )}
            </div>

            {/* Monthly Revenue */}
            <div className="border border-borderColor rounded-md p-4 md:p-6 mb-6 w-full md:max-w-xs">
              <h2 className="text-lg font-medium">Monthly Revenue</h2>
              <p className="text-gray-500">Revenue for current month</p>
              {!dashboardData.monthlyRevenue ? (
                <DataEmpty
                  title="No Booking Yet"
                  para="Monthly revenue will appear once you list the bike"
                />
              ) : (
                <p className="text-3xl mt-6 font-semibold text-green-600">
                  र{dashboardData.monthlyRevenue.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
