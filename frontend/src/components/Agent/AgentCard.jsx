import { MdStar } from "react-icons/md";
import Card from "../UI/Card";
import classes from "./AgentCard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AgentCard = ({ agent }) => {
  const [agentDetail, setAgentDetail] = useState({});

  const navigate = useNavigate();
  
  useEffect(() => {
    const agentData = {
      id: agent.agent_userSchema && agent.agent_userSchema._id,
      rating: agent && agent.agent_rating,
      first_name:
        agent.agent_userSchema &&
        agent.agent_userSchema.user_details.first_name,
      last_name:
        agent.agent_userSchema && agent.agent_userSchema.user_details.last_name,
      email:
        agent.agent_userSchema &&
        agent.agent_userSchema.user_details.email_address,
    };

    setAgentDetail(agentData);
  }, [agent]);

  const agentDetailsHandler = (id) => {
    navigate(`/find-agent/${id}`);
  };
  return (
    <Card
      className={classes["card-style"]}
      onClick={() => agentDetailsHandler(agentDetail.id)}
    >
      <div></div>
      <div className={classes["agent-details-wrapper"]}>
        <div className={classes["agent-details"]}>
          <h4 className={classes["agent-name-and-rating-wrapper"]}>
            Agent name: &nbsp;
            {agentDetail.first_name + " " + agentDetail.last_name}
            &nbsp; &nbsp;
            <span className={classes["agent-rating-wrapper"]}>
              ({agent && agentDetail.rating} <MdStar />)
            </span>
          </h4>
          <h4>Email: {agentDetail.email}</h4>
        </div>
        <div>
          {/* <h5>Recent reviews</h5> */}
          {/* {d["agent-reviews"].map((review, index) => (
            <p key={index}>{review}</p>
          ))} */}
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;
