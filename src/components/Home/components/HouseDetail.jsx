import axios from "axios";
import { CheckCircle, Mail, Phone, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import backEndApi from "../../../utils/constant";
import useFetch from "../../../utils/useFetch";
import EmptyState from "../../core/EmptyState";
import ErrorPage from "../../core/ErrorPage";
import Loading from "../../core/Loading";

const HouseDetail = () => {
  const { user } = useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);
  const { advertiseId } = useParams();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const {
    data: house,
    loading: houseLoading,
    error: houseError,
  } = useFetch(`${backEndApi}/house/advertisements/list/${advertiseId}/`, {}, [
    refresh,
    advertiseId,
  ]);
  // console.log(user?.user?.id);
  // console.log(house?.house?.owner?.user?.id);

  const {
    data: reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useFetch(`${backEndApi}/house/review/?advertisement=${advertiseId}`, {}, [
    refresh,
    advertiseId,
  ]);
  console.log("object", house);

  const handleRentRequest = async (advertisementId) => {
    console.log(advertisementId);
    try {
      const response = await axios.post(
        `${backEndApi}/house/request-rent/`,
        {
          advertisement: advertisementId,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setRefresh((prev) => !prev);
      console.log(response);
      toast.success("Rent request sent successfully!");
      // console.log("Rent request sent successfully:", response.data);
    } catch (error) {
      error.status == 401
        ? toast.error("You have to login !!")
        : toast.error(error.message);
      // toast.error(error.response.data.error || "Rent request failed");
    }
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(reviewText, rating, advertiseId);
      const response = await axios.post(
        `${backEndApi}/house/review/`,
        {
          advertisement: advertiseId,
          rating: rating,
          text: reviewText,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      setReviewText("");
      toast.success("Review Added successfully");
      setRefresh((prev) => !prev);
      setRating(0);
    } catch (error) {
      console.log(error);
      error.status == 401
        ? toast.error("You have to login !!")
        : toast.error(error.message);

      // console.error("Error submitting review:", error);
    }
  };

  if (houseLoading || reviewsLoading) return <Loading />;
  if (houseError) return <ErrorPage message={houseError.message} />;
  if (!house) return <EmptyState />;

  const { title, description, location, image, price, owner } = house.house;
  // console.log(house.is_rented);
  // console.log(reviews);
  const { email, first_name, last_name } = owner.user;
  const { mobile_number, image: ownerImage } = owner;

  return (
    <div className="container mx-auto p-4 lg:flex lg:space-x-4">
      <div className="lg:w-1/3 bg-white p-4 shadow-md rounded-lg mb-4 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Write your review..."
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate} ⭐
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <div className="border-t border-gray-200 pt-4">
            {reviewsError ? (
              <p className="text-red-500">
                Error loading reviews: {reviewsError.message}
              </p>
            ) : reviews?.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <AiOutlineUser className="text-gray-500" />
                    <span className="ml-2 font-semibold">
                      {review.user.user.username}
                    </span>
                    <span className="ml-auto flex items-center">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <AiFillStar key={index} className="text-yellow-500" />
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="lg:w-2/3 bg-white p-4 shadow-md rounded-lg">
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="lg:w-1/2">
            <img
              src={image}
              alt={title}
              className="w-full rounded-lg mb-4 lg:mb-0"
            />
            <h1 className="mt-2 mb-2 text-xl">
              <span className="font-semibold">Title:</span> {title}
            </h1>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Description:</span> {description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {location}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price: ${price}</strong>
            </p>
            <div className="text-gray-700 mb-4">
              {house?.house?.category?.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1"
                >
                  {cat.name}
                </span>
              ))}
            </div>
            {user?.user?.id !== house?.house?.owner?.user?.id && (
              <div className="flex items-center justify-between">
                {!house.is_rented ? (
                  <>
                    <button
                      onClick={() => handleRentRequest(house.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      <CheckCircle className="inline-block w-5 h-5 mr-2" />
                      Rent This House
                    </button>
                    <button
                      disabled
                      className="px-4 py-2 text-white rounded-md
                      bg-green-500"
                    >
                      Available
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className={`px-4 py-2 text-white rounded-md ${
                      !house.is_rented ? "bg-green-500" : "bg-red-400"
                    }`}
                  >
                    {!house.is_rented ? "Available" : "Not Available"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Owner Info */}
          <div className="m-6 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Owner Information
            </h2>
            <div className="rounded-full mx-auto overflow-hidden w-24 h-24">
              <img
                src={ownerImage}
                alt={`${first_name} ${last_name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-blue-500 mr-2" />
              <span>
                {first_name} {last_name}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-red-500 mr-2" />
              <span>{email}</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-green-500 mr-2" />
              <span>{mobile_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
