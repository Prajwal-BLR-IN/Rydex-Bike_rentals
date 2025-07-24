// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">Page Not Found</p>
      <p className="text-md mt-2 text-gray-500">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition duration-300"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
