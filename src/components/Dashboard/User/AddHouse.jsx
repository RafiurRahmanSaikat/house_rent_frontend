import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import backEndApi from "../../../utils/constant";
import useFetch from "../../../utils/useFetch";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const AddHouse = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    category: [],
  });

  const {
    data: categories,
    loading,
    error,
  } = useFetch(`${backEndApi}/house/category/`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, category: selectedCategories });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage({
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      });
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("User is not authenticated.");
      return;
    }

    const authToken = localStorage.getItem("token");

    if (image) {
      const imgBBApiKey = "1852d1780a7c1d17aff8afe66b4878a8";
      const imgFormData = new FormData();
      imgFormData.append("image", image.file);

      try {
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
          imgFormData
        );
        const imageUrlFromImgBB = imgbbResponse.data.data.url;

        const formDataToSend = new FormData();
        formDataToSend.append("image", imageUrlFromImgBB);

        for (const key in formData) {
          if (key === "category") {
            formData[key].forEach((categoryId) =>
              formDataToSend.append("category_ids", categoryId)
            );
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }

        try {
          const response = await axios.post(
            `${backEndApi}/house/list/`,
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${authToken}`,
              },
            }
          );
          toast.success("House added successfully");

          setFormData({
            title: "",
            description: "",
            location: "",
            price: "",
            category: [],
          });
          setImage(null);
        } catch (error) {
          toast.error(
            error.response && error.response.status === 401
              ? "You have to login !!"
              : error.message
          );
        }
      } catch (error) {
        toast.error("Failed to upload image to ImgBB.");
      }
    } else {
      toast.error("Please upload an image.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add New House
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-2.5">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md"
              />
            </div>
            {image && image.preview && (
              <div className="mt-4">
                <img
                  src={image.preview}
                  alt="House preview"
                  className="w-64 h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2.5">
              <select
                name="category"
                id="category"
                multiple
                value={formData.category}
                onChange={handleCategoryChange}
                className="block w-full text-sm text-gray-900 border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add House
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHouse;
