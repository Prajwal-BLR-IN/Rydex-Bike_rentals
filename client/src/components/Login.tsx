import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { assets } from "../assets/assets";

type propType = {
  setShowLogin: (value: boolean) => void;
};

type formToShowType = "register" | "login";

type intialValueType = {
  profileImage?: File | null;
  name?: string;
  email: string;
  password: string;
};

const Login = ({ setShowLogin }: propType) => {
  const [formType, setFormType] = useState<formToShowType>("login");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const initialValues =
    formType === "register"
      ? {
          profileImage: profileImage ? profileImage : null,
          name: "",
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        };

  const validationSchema =
    formType === "register"
      ? Yup.object({
          profileImage: Yup.mixed()
            .required("Image is required")
            .test("fileType", "invalid file", (value) => {
              if (value && typeof value === "object" && "type" in value) {
                return (value as File).type.startsWith("image/");
              }
              return false;
            })
            .test("fileSize", "Image size must be less than 5MB", (value) => {
              if (value && typeof value === "object" && "size" in value) {
                return (value as File).size <= 5 * 1024 * 1024;
              }
              return false;
            }),
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string()
            .min(8, "Must 8+ characters")
            .required("Required"),
        })
      : Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string()
            .min(8, "Must 8+ characters")
            .required("Required"),
        });

  const onSubmit = (value: intialValueType) => {
    console.log(value);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50 backdrop-blur-md"
      onClick={() => setShowLogin(false)}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ touched, errors, setFieldValue }) => (
          <Form
            className="flex flex-col gap-4 m-auto  p-8 py-12 w-80 sm:w-[352px] rounded-lg rounded-tr-none   bg-white/70 backdrop-blur-2xl z-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-10 w-7 rounded-r-lg  bg-white/65 backdrop-blur-2xl z-200 absolute  left-[100%] -top-0 flex justify-center items-center cursor-pointer"
              onClick={() => setShowLogin(false)}
            >
              <img src={assets.cancelIcon} alt="cancel" className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-center">
              <span className="text-primary">User</span>{" "}
              {formType === "register" ? (
                <span>Signup</span>
              ) : (
                <span>Login</span>
              )}
            </h2>
            {formType === "register" && (
              <>
                <div className="flex flex-col items-center justify-center gap-2">
                  <label htmlFor="profileImage" className="cursor-pointer mt-5">
                    <img
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : assets.upload_icon
                      }
                      alt=""
                      className="size-20 rounded-full object-cover object-center border-2 border-primary"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="profileImage"
                      name="profileImage"
                      hidden
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newImage = e.target.files?.[0];
                        if (newImage) {
                          setFieldValue("profileImage", newImage);
                          setProfileImage(newImage);
                        }
                      }}
                    />
                  </label>

                  {touched.profileImage && errors.profileImage ? (
                    <p className="text-sm text-red-500">
                      {errors.profileImage}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Upload your picture</p>
                  )}
                </div>

                <div className="flex flex-col ">
                  <label htmlFor="name" className="flex justify-between">
                    <span>Name</span>
                    {touched.name && errors.name && (
                      <span className="text-red-500">{errors.name}</span>
                    )}
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full name"
                    className={`focus:outline-primary-dull px-2 py-2 border  rounded-md ${
                      errors.name ? "border-red-500" : "border-black/50"
                    }`}
                  />
                </div>
              </>
            )}

            <div className="flex flex-col ">
              <label htmlFor="email" className="flex justify-between">
                <span>Email</span>
                {touched.email && errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </label>
              <Field
                type="text"
                name="email"
                placeholder="email"
                className={`focus:outline-primary px-2 py-2 border  rounded-md ${
                  errors.email ? "border-red-500" : "border-black/50"
                }`}
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="password" className="flex justify-between">
                <span>Password</span>
                {touched.password && errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </label>
              <Field
                type="password"
                name="password"
                placeholder="password"
                className={`focus:outline-primary px-2 py-2 border  rounded-md ${
                  errors.password ? "border-red-500" : "border-black/50"
                }`}
              />
            </div>

            {formType === "register" ? (
              <p className="text-base">
                Already have an account?{" "}
                <span
                  className="text-primary font-bold cursor-pointer hover:underline"
                  onClick={() =>
                    setFormType(formType === "register" ? "login" : "register")
                  }
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-base">
                Don't have an account?{" "}
                <span
                  className="text-primary font-bold cursor-pointer hover:underline"
                  onClick={() =>
                    setFormType(formType === "login" ? "register" : "login")
                  }
                >
                  Signup
                </span>
              </p>
            )}

            <button
              type="submit"
              className="bg-primary py-2 rounded-md hover:bg-primary-dull active:scale-95 cursor-pointer text-white shadow"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
