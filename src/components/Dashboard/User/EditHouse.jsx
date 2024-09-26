import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import backEndApi from "../../../utils/constant";
import useFetch from "../../../utils/useFetch";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const EditHouse = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    category: [],
    existingImageUrl: "", // To store the existing image URL
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(`${backEndApi}/house/category/`);

  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await axios.get(`${backEndApi}/house/list/${id}/`);
        const houseData = response.data;
        setFormData({
          title: houseData.title,
          description: houseData.description,
          location: houseData.location,
          price: houseData.price,
          category: houseData.category.map((cat) => cat.id.toString()),
          existingImageUrl: houseData.image,
        });
        setPreview(houseData.image);
      } catch (error) {
        toast.error("Error fetching house data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouseData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPreview(selectedFile);

    if (selectedFile) {
      setPreview(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, category: selectedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("User is not authenticated.");
      return;
    }

    const authToken = localStorage.getItem("token");
    const formDataToSend = new FormData();

    let imageUrlToSend = formData.existingImageUrl;

    if (preview) {
      const imgBBApiKey = "1852d1780a7c1d17aff8afe66b4878a8";
      const imgFormData = new FormData();
      imgFormData.append("image", preview);

      try {
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
          imgFormData
        );
        imageUrlToSend = imgbbResponse.data.data.url;
      } catch (error) {
        toast.error("Failed to upload image to ImgBB.");
        return;
      }
    }

    for (const key in formData) {
      if (key === "category") {
        formData[key].forEach((categoryId) =>
          formDataToSend.append("category_ids", categoryId)
        );
      } else if (key !== "existingImageUrl") {
        formDataToSend.append(key, formData[key]);
      }
    }

    formDataToSend.append("image", imageUrlToSend);

    try {
      const response = await axios.put(
        `${backEndApi}/house/list/${id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${authToken}`,
          },
        }
      );
      toast.success("House updated successfully");
    } catch (error) {
      error.response?.status === 401
        ? toast.error("You have to login!")
        : toast.error("Error updating house: " + error.message);
    }
  };

  if (loading || categoriesLoading) return <Loading />;
  if (categoriesError) return <ErrorPage message={categoriesError.message} />;

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Edit House
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
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>

            <div className="mt-4">
              <img
                src={
                  preview && preview.type
                    ? URL.createObjectURL(preview)
                    : `${formData.existingImageUrl}`
                }
                alt="House"
                className="w-64 h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <label
            htmlFor="category"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Categories
          </label>
          <select
            multiple
            name="category"
            id="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-white font-semibold hover:bg-indigo-700"
          >
            Update House
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHouse;
