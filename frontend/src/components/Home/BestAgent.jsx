import { MdStar } from "react-icons/md";
import Card from "../UI/Card";
import classes from "./BestAgent.module.css";
import data from "../../util/DUMMY_AGENTS.json";

const BestAgent = () => {
  return (
    <div className={classes["best-agent-wrapper"]}>
      <div>
        <h2>Agent of the month</h2>
      </div>
      <div className={classes["best-agent-card-wrapper"]}>
        {data.map((d) => (
          <Card key={d._id} className={classes["card-style"]}>
            <div></div>
            <div className={classes["best-agent-details-wrapper"]}>
              <div className={classes["best-agent-details"]}>
                <h4 className={classes["best-agent-name-and-rating-wrapper"]}>
                  {d["user-details"].first_name +
                    " " +
                    d["user-details"].last_name}
                  &nbsp; &nbsp;
                  <span className={classes["best-agent-rating-wrapper"]}>
                    ({d["agent-rating"]} <MdStar />)
                  </span>
                </h4>
              </div>
              <div>
                <h5>Recent reviews</h5>
                {d["agent-reviews"].map((review, index) => (
                  <p key={index}>{review}</p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestAgent;
