import logo from "./rydex_logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg";
import close_icon from "./close_icon.svg";
import users_icon from "./users_icon.svg";
import car_icon from "./car_icon.svg";
import location_icon from "./location_icon.svg";
import fuel_icon from "./fuel_icon.svg";
import addIcon from "./addIcon.svg";
import carIcon from "./carIcon.svg";
import carIconColored from "./carIconColored.svg";
import dashboardIcon from "./dashboardIcon.svg";
import dashboardIconColored from "./dashboardIconColored.svg";
import addIconColored from "./addIconColored.svg";
import listIcon from "./listIcon.svg";
import listIconColored from "./listIconColored.svg";
import cautionIconColored from "./cautionIconColored.svg";
import arrow_icon from "./arrow_icon.svg";
import star_icon from "./star_icon.svg";
import check_icon from "./check_icon.svg";
import tick_icon from "./tick_icon.svg";
import delete_icon from "./delete_icon.svg";
import eye_icon from "./eye_icon.svg";
import eye_close_icon from "./eye_close_icon.svg";
import filter_icon from "./filter_icon.svg";
import edit_icon from "./edit_icon.svg";
import calendar_icon_colored from "./calendar_icon_colored.svg";
import location_icon_colored from "./location_icon_colored.svg";
import testimonial_image_1 from "./testimonial_image_1.png";
import testimonial_image_2 from "./testimonial_image_2.png";
import main_bike from "./main_bike.png";
import banner_bike_image from "./banner_bike_image.png";
import user_profile from "./user_profile.png";
import upload_icon from "./upload_icon.svg";
import car_image1 from "./car_image1.png";
import car_image2 from "./car_image2.png";
import car_image3 from "./car_image3.png";
import car_image4 from "./car_image4.png";
import bike_image1 from "./bike1.jpg";
import bike_image2 from "./bike2.jpg";
import bike_image3 from "./bike3.jpg";
import bike_image4 from "./bike4.jpg";
import bike_image5 from "./bike5.jpg";
import bike_image6 from "./bike6.jpg";
import speed_icon from "./speed_icon.svg";
import engine_icon from "./engine-icon.svg";
import helmet_icon from "./elmet_icon.svg";
import linkedin_logo from "./linkedin_logo.svg";
import FacePlaceholder from "./face_placeholder.svg";
import cancelIcon from "./cancel_icon.svg";

type menuLinksType = {
  name: string;
  path: string;
}[];

export type BikeModelType = {
  _id: string;
  owner: string;
  brand: string;
  bikeModel: string;
  bikeImage: string;
  year: number;
  category: string;
  top_speed: string;
  helmet: string;
  fuel_type: string;
  pricePerDay: number;
  location: string;
  description: string;
  isAvaliable: boolean;
  createdAt: string;
};

export type BookingStatus = "pending" | "confirmed";

export type BookingType = {
  _id: string;
  bike: BikeModelType;
  user: string;
  owner: string;
  pickupDate: string;
  returnDate: string;
  status: BookingStatus;
  price: number;
  createdAt: string;
};

export type dummyUserDataType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
};

export type dashboadDatatype = {
  totalBikes: number;
  totalBookings: number;
  pendingBooking: number;
  completeBookings: number;
  recentBookings: BookingType[];
  monthlyRevenue: number;
};

export const cityList = ["Bangalore", "Mumbai", "Chennai", "Hyderabad"];

export const assets = {
  logo,
  gmail_logo,
  facebook_logo,
  instagram_logo,
  twitter_logo,
  menu_icon,
  search_icon,
  close_icon,
  users_icon,
  edit_icon,
  car_icon,
  location_icon,
  fuel_icon,
  addIcon,
  carIcon,
  carIconColored,
  dashboardIcon,
  dashboardIconColored,
  addIconColored,
  listIcon,
  listIconColored,
  cautionIconColored,
  calendar_icon_colored,
  location_icon_colored,
  arrow_icon,
  star_icon,
  check_icon,
  tick_icon,
  delete_icon,
  eye_icon,
  eye_close_icon,
  filter_icon,
  testimonial_image_1,
  testimonial_image_2,
  main_bike,
  banner_bike_image,
  car_image1,
  upload_icon,
  user_profile,
  car_image2,
  car_image3,
  car_image4,
  bike_image1,
  bike_image2,
  bike_image3,
  bike_image4,
  bike_image5,
  bike_image6,
  speed_icon,
  engine_icon,
  helmet_icon,
  linkedin_logo,
  FacePlaceholder,
  cancelIcon,
};

export const menuLinks: menuLinksType = [
  { name: "Home", path: "/" },
  { name: "Bikes", path: "/bikes" },
  { name: "My Bookings", path: "/my-bookings" },
];

export const ownerMenuLinks = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: dashboardIcon,
    coloredIcon: dashboardIconColored,
  },
  {
    name: "Add bike",
    path: "/owner/add-bike",
    icon: addIcon,
    coloredIcon: addIconColored,
  },
  {
    name: "Manage bikes",
    path: "/owner/manage-bikes",
    icon: carIcon,
    coloredIcon: carIconColored,
  },
  {
    name: "Manage Bookings",
    path: "/owner/manage-bookings",
    icon: listIcon,
    coloredIcon: listIconColored,
  },
];

export const dummyUserData: dummyUserDataType = {
  _id: "6847f7cab3d8daecdb517095",
  name: "Prajwal",
  email: "admin@example.com",
  role: "owner",
  image: user_profile,
};

export const dummyBikeData = [
  {
    _id: "bike001",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Royal Enfield",
    model: "Classic 350",
    image: bike_image1,
    year: 2022,
    category: "Cruiser",
    top_speed: "110 km/h",
    helmet: "Included",
    fuel_type: "Petrol",
    pricePerDay: 700,
    location: "Bangalore",
    description:
      "Royal Enfield Classic 350 is a retro cruiser ideal for long rides and highway cruising with a strong fanbase across India.",
    isAvaliable: true,
    createdAt: "2025-07-21T09:00:00.000Z",
  },
  {
    _id: "bike002",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "TVS",
    model: "Apache RTR 160 4V",
    image: bike_image2,
    year: 2023,
    category: "Sport",
    top_speed: "114 km/h",
    helmet: "Included",
    fuel_type: "Petrol",
    pricePerDay: 500,
    location: "Hyderabad",
    description:
      "TVS Apache RTR 160 4V offers sporty performance, aggressive styling, and sharp handling, making it a great choice for city and highway rides.",
    isAvaliable: true,
    createdAt: "2025-07-21T09:00:00.000Z",
  },
  {
    _id: "bike003",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Bajaj",
    model: "Pulsar NS200",
    image: bike_image3,
    year: 2021,
    category: "Naked",
    top_speed: "136 km/h",
    helmet: "Included",
    fuel_type: "Petrol",
    pricePerDay: 550,
    location: "Mumbai",
    description:
      "The Bajaj Pulsar NS200 is a powerful and muscular street bike known for performance and aggressive design.",
    isAvaliable: true,
    createdAt: "2025-07-21T09:00:00.000Z",
  },
  {
    _id: "bike004",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ather",
    model: "450X",
    image: bike_image4,
    year: 2024,
    category: "Electric",
    top_speed: "90 km/h",
    helmet: "Not included",
    fuel_type: "Electric",
    pricePerDay: 600,
    location: "Chennai",
    description:
      "Ather 450X is a premium electric scooter made in India, with quick acceleration and smart features like touchscreen dashboard and reverse mode.",
    isAvaliable: true,
    createdAt: "2025-07-21T09:00:00.000Z",
  },
  {
    _id: "bike005",
    owner: "67fe3467ed8a8fe17d0ba6ts",
    brand: "KTM",
    model: "Duke 200",
    image: bike_image5,
    year: 2024,
    category: "Naked",
    top_speed: "130 km/h",
    helmet: "Not included",
    fuel_type: "Petrol",
    pricePerDay: 850,
    location: "Bangalore",
    description:
      "KTM Duke 200 is a lightweight streetfighter packed with punchy performance, aggressive design, and precise handling — perfect for spirited city rides.",
    isAvaliable: true,
    createdAt: "2025-07-21T09:00:00.000Z",
  },
  {
    _id: "bike006",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Honda",
    model: "H'ness CB350",
    image: bike_image6,
    year: 2023,
    category: "Cruiser",
    top_speed: "120 km/h",
    helmet: "Included",
    fuel_type: "Petrol",
    pricePerDay: 750,
    location: "Bangalore",
    description:
      "The Honda H'ness CB350 blends retro styling with modern tech and refined engine performance, ideal for laid-back cruising with a premium feel.",
    isAvaliable: true,
    createdAt: "2025-07-21T09:00:00.000Z",
  },
];

export const dummyMyBookingsData = [
  {
    _id: "68482bcc98eb9722b7751f70",
    bike: dummyBikeData[0],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-13T00:00:00.000Z",
    returnDate: "2025-06-14T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T12:57:48.244Z",
  },
  {
    _id: "68482bb598eb9722b7751f60",
    bike: dummyBikeData[1],
    user: "6847f7cab3d8daecdb517095",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    pickupDate: "2025-06-12T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "pending",
    price: 130,
    createdAt: "2025-06-10T12:57:25.613Z",
  },
  {
    _id: "684800fa0fb481c5cfd92e56",
    bike: dummyBikeData[2],
    user: "6847f7cab3d8daecdb517095",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    pickupDate: "2025-06-11T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "pending",
    price: 600,
    createdAt: "2025-06-10T09:55:06.379Z",
  },
  {
    _id: "6847fe790fb481c5cfd92d94",
    bike: dummyBikeData[3],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-11T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T09:44:25.410Z",
  },
];

export const dummyDashboardData = {
  totalBikes: 4,
  totalBookings: 2,
  pendingBooking: 0,
  completeBookings: 2,
  recentBookings: [dummyMyBookingsData[0], dummyMyBookingsData[1]],
  monthlyRevenue: 840,
};
