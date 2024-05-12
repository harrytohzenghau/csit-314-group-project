import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AgentDetails.module.css";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const AgentDetails = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState({});
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  const [cookie] = useCookies();

  const token = cookie.token;

  useEffect(() => {
    const getAgentDetails = async () => {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Something went wrong when fetching agent detail");
      }

      const data = await response.json();
      setAgent(data.profile.user_details);
    };

    getAgentDetails();
  }, [id]);

  const reviewChangeHandler = (e) => {
    setReview(e.target.value);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const ratingReviewSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Please login to perform this action.");
    }

    const rating_review = {
      agentRating: rating,
      agentReview: review,
    };

    const response = await fetch(
      `http://localhost:3000/api/agent/review/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(rating_review),
      }
    );

    if (!response.ok) {
      return toast.error("Something went wrong when posting a review");
    }

    const data = await response.json();

    toast.success(data.message);

    return navigate("/find-agent");
  };

  return (
    <Card className={classes["agent-detail-wrapper"]}>
      <div className={classes["agent-detail-inner-wrapper"]}>
        <h4>
          Agent name: {agent.first_name} {agent.last_name}
        </h4>
        <h4>Email: {agent.email_address}</h4>
      </div>
      <div className={classes["agent-detail-inner-wrapper"]}>
        <form
          className={classes["agent-detail-form-wrapper"]}
          onSubmit={ratingReviewSubmitHandler}
        >
          <div className={classes["agent-detail-rating-wrapper"]}>
            <h4>Leave a rating:</h4>
            <div className={classes["agent-detail-star"]}>
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span key={index} onClick={() => handleStarClick(starValue)}>
                    {rating >= starValue ? (
                      <MdOutlineStar />
                    ) : (
                      <MdOutlineStarBorder />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <div className={classes["agent-detail-review-wrapper"]}>
            <h4>Leave a review:</h4>
            <textarea
              placeholder="Provide a review..."
              onChange={reviewChangeHandler}
              required={true}
            />
          </div>
          <div className={classes["agent-detail-button-wrapper"]}>
            <Button type="submit" style="primary">
              Submit
            </Button>
            <Button
              type="button"
              style="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AgentDetails;
