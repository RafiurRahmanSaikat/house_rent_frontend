import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../utils/useFetch";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const EditHouse = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("https://house-rent-backend.onrender.com/house/category/");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: null,
    category: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const house = await axios.get(
          `https://house-rent-backend.onrender.com/house/list/${id}/`
        );
        setFormData({
          title: house.data.title,
          description: house.data.description,
          location: house.data.location,
          price: house.data.price,
          category: house.data.category.map((cat) => cat.id.toString()),
        });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
      toast.error(error.message);
      return;
    }

    const authToken = localStorage.getItem("token");
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key === "category") {
        formData[key].forEach((categoryId) =>
          formDataToSend.append("category_ids", categoryId)
        );
      } else if (key === "image" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(
        `https://house-rent-backend.onrender.com/house/list/${id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log(response);

      toast.success("House Updated successfully.");
    } catch (error) {
      error.status == 401
        ? toast.error("You have to login !!")
        : toast.error(error.message);
    }
  };

  if (loading || categoriesLoading) return <Loading />;
  if (categoriesError)
    return <ErrorPage message={"Error loading categories"} />;

  return (
    <div className="bg-white px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Edit House
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="block w-full mt-2.5 rounded-md border px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-600 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="block w-full mt-2.5 rounded-md border px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-600 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="block w-full mt-2.5 rounded-md border px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-600 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="block w-full mt-2.5 rounded-md border px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-600 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="block w-full mt-2.5 rounded-md border px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-600 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              multiple
              value={formData.category}
              onChange={handleCategoryChange}
              className="block w-full mt-2.5 rounded-md border px-3.5 py-2 shadow-sm focus:ring-2 focus:ring-indigo-600 text-gray-900"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update House
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHouse;
