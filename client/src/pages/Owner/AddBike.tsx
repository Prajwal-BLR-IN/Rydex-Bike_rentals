import React, { useEffect, useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { assets } from "../../assets/assets";
import { useOwnerMutation } from "../../hooks/useOwnerMutation";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/ButtonLoader";

type intialValueType = {
  bikeImage: File | null;
  brand: string;
  bikeModel: string;
  year: string;
  category: string;
  top_speed: string;
  helmet: string;
  fuel_type: string;
  pricePerDay: string;
  location: string;
  description: string;
};

const AddBike = () => {
  const [bikeImage, setBikeImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const initialValues: intialValueType = {
    bikeImage: null,
    brand: "",
    bikeModel: "",
    year: "",
    category: "",
    top_speed: "",
    helmet: "",
    fuel_type: "",
    pricePerDay: "",
    location: "",
    description: "",
  };

  const validationSchema = Yup.object({
    bikeImage: Yup.mixed()
      .required("⚠ Image is required")
      .test("fileType", "Only image files are allowed", (value) => {
        if (value && typeof value === "object" && "type" in value) {
          return (value as File).type.startsWith("image/");
        }
        return false;
      })
      .test("fileSize", "Image too large (max 5MB)", (value) => {
        if (value && typeof value === "object" && "size" in value) {
          return (value as File).size <= 5 * 1024 * 1024;
        }
        return false;
      }),
    brand: Yup.string().required("⚠ Required"),
    bikeModel: Yup.string().required("⚠ Required"),
    year: Yup.number()
      .typeError("Must be a valid 4-digit year")
      .integer("Year must be a whole number")
      .min(1980, "Year must be 1980 or later")
      .max(new Date().getFullYear(), "Enter a valid year")
      .required("⚠ Required"),
    category: Yup.string().required("⚠ Required"),
    top_speed: Yup.number()
      .typeError("Must be a number")
      .min(60, "Invalid speed")
      .max(400, "Invalid speed")
      .required("⚠ Required"),
    helmet: Yup.string().required("⚠ Required"),
    fuel_type: Yup.string().required("⚠ Required"),
    pricePerDay: Yup.string()
      .matches(/^\d+$/, "Must be a number")
      .required("⚠ Required"),
    location: Yup.string().required("⚠ Required"),
    description: Yup.string().required("⚠ Required"),
  });

  const { mutate, isPending } = useOwnerMutation({
    url: "/owner/add-bike",
    onSuccessRedirect: () => navigate("/owner"),
    invalidateKey: "owner",
  });

  const onSubmit = (value: typeof initialValues) => {
    if (!bikeImage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const formData = new FormData();
    const bikeData = {
      brand: value.brand,
      bikeModel: value.bikeModel,
      year: value.year,
      category: value.category,
      top_speed: value.top_speed,
      helmet: value.helmet,
      fuel_type: value.fuel_type,
      pricePerDay: value.pricePerDay,
      location: value.location,
      description: value.description,
    };

    formData.append("bikeData", JSON.stringify(bikeData));
    formData.append("bikeImage", bikeImage);

    mutate(formData);
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <TitleOwner
        title="Add New Bike"
        subTitle="Fill in details to list a new bike for booking, including pricing, availability, and bike specifications."
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const { touched, errors, setFieldValue } = formik;

          //  useEffect here to scroll only after submit attempt
          useEffect(() => {
            if (formik.submitCount > 0 && Object.keys(errors).length > 0) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }, [errors, formik.submitCount]);

          return (
            <Form className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
              {/* Bike image upload */}
              <div className="flex items-center gap-2 w-full">
                <label htmlFor="bikeImage" className="cursor-pointer w-fit">
                  <img
                    src={
                      bikeImage
                        ? URL.createObjectURL(bikeImage)
                        : assets.upload_icon
                    }
                    alt="Upload"
                    className={`h-14 rounded border${
                      touched.bikeImage && errors.bikeImage && " border-red-500"
                    }`}
                  />
                  <input
                    type="file"
                    id="bikeImage"
                    name="bikeImage"
                    accept="image/*"
                    hidden
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFieldValue("bikeImage", file);
                        setBikeImage(file);
                      }
                    }}
                  />
                </label>

                {touched.bikeImage && errors.bikeImage ? (
                  <p className="text-sm text-red-500">{errors.bikeImage}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Upload the picture of your bike
                  </p>
                )}
              </div>

              {/* car brand and model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="brand"
                    className="flex items-center justify-between"
                  >
                    <span>Brand</span>
                    {touched.brand && errors.brand && (
                      <span className="text-red-500">{errors.brand}</span>
                    )}
                  </label>
                  <Field
                    type="text"
                    placeholder="eg: KTM, Yamaha, Hero..."
                    name="brand"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.brand && errors.brand
                        ? "border-red-500"
                        : "border-borderColor"
                    }`}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="model"
                    className="flex items-center justify-between"
                  >
                    <span>Model</span>
                    {touched.bikeModel && errors.bikeModel && (
                      <span className="text-red-500">{errors.bikeModel}</span>
                    )}
                  </label>
                  <Field
                    type="text"
                    placeholder="eg: Duke 200, R15 V4, Splendor Plus..."
                    name="bikeModel"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.bikeModel && errors.bikeModel
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  />
                </div>
              </div>

              {/* Year, Price, Category, top speed, helmet, fuel type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-end">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="year"
                    className="flex items-center justify-between text-right"
                  >
                    <span>Year</span>
                    {touched.year && errors.year && (
                      <span className="text-red-500">{errors.year}</span>
                    )}
                  </label>
                  <Field
                    type="number"
                    placeholder="eg: 2025"
                    name="year"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.year && errors.year
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="pricePerDay"
                    className="flex items-center justify-between text-right"
                  >
                    <span>Daily Price {"(₹)"}</span>
                    {touched.pricePerDay && errors.pricePerDay && (
                      <span className="text-red-500">{errors.pricePerDay}</span>
                    )}
                  </label>
                  <Field
                    type="number"
                    placeholder="eg: 550"
                    name="pricePerDay"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.pricePerDay && errors.pricePerDay
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="category"
                    className="flex items-center justify-between text-right"
                  >
                    <span>Category</span>
                    {touched.category && errors.category && (
                      <span className="text-red-500">{errors.pricePerDay}</span>
                    )}
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.category && errors.category
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="Sports">Sports</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Naked">Naked</option>
                    <option value="Electric">Electric</option>
                  </Field>
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="top_speed"
                    className="flex items-center justify-between text-right"
                  >
                    <span className="text-left">Top speed {"(km/h)"}</span>
                    {touched.top_speed && errors.top_speed && (
                      <span className="text-red-500">{errors.top_speed}</span>
                    )}
                  </label>
                  <Field
                    type="number"
                    placeholder="eg: 110"
                    name="top_speed"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.top_speed && errors.top_speed
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="fuel_type"
                    className="flex items-center justify-between text-right"
                  >
                    <span>Fuel type</span>
                    {touched.fuel_type && errors.fuel_type && (
                      <span className="text-red-500">{errors.fuel_type}</span>
                    )}
                  </label>
                  <Field
                    as="select"
                    name="fuel_type"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.fuel_type && errors.fuel_type
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  >
                    <option value="">Select a fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel </option>
                    <option value="Electric">Electric</option>
                  </Field>
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="helmet"
                    className="flex items-center justify-between text-right"
                  >
                    <span>Helmet incuded?</span>
                    {touched.helmet && errors.helmet && (
                      <span className="text-red-500">{errors.helmet}</span>
                    )}
                  </label>
                  <Field
                    as="select"
                    name="helmet"
                    className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                      touched.helmet && errors.helmet
                        ? " border-red-500"
                        : "border-borderColor"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Included">Included</option>
                    <option value="Not Included">Not included </option>
                  </Field>
                </div>
              </div>

              {/* Location */}

              <div className="flex flex-col w-full">
                <label
                  htmlFor="location"
                  className="flex items-center justify-between text-right"
                >
                  <span>Location</span>
                  {touched.location && errors.location && (
                    <span className="text-red-500">{errors.location}</span>
                  )}
                </label>
                <Field
                  as="select"
                  name="location"
                  className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                    touched.location && errors.location
                      ? " border-red-500"
                      : "border-borderColor"
                  }`}
                >
                  <option value="">Select a location</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai </option>
                  <option value="Mumbai">Mumbai </option>
                  <option value="Hyderabad">Hyderabad </option>
                </Field>
              </div>

              {/* Description */}

              <div className="flex flex-col w-full">
                <label
                  htmlFor="description"
                  className="flex items-center justify-between"
                >
                  <span>Description</span>
                  {touched.description && errors.description && (
                    <span className="text-red-500">{errors.description}</span>
                  )}
                </label>
                <Field
                  as="textarea"
                  placeholder="e.g. A powerful cruiser ideal for long highway trips and weekend getaways."
                  name="description"
                  className={`px-3 py-2 mt-1 border rounded-md outline-none ${
                    touched.description && errors.description
                      ? "border-red-500"
                      : "border-borderColor"
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`flex items-center px-5 py-3 bg-primary text-white w-fit rounded-md gap-1  hover:bg-primary-dull font-medium active:scale-95 ${
                  isPending ? "pointer-events-none" : "cursor-pointer"
                } `}
              >
                {isPending ? (
                  <>
                    <ButtonLoader />
                    <span>Adding bike...</span>
                  </>
                ) : (
                  <>
                    <img src={assets.tick_icon} alt="tick icon" />
                    <span>List your bike</span>
                  </>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBike;
