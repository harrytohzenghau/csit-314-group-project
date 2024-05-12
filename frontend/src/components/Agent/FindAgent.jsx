import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AgentCard from "./AgentCard";
import classes from "./FindAgent.module.css";

const FindAgent = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const getAllAgents = async () => {
      const response = await fetch("http://localhost:3000/api/agent", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        return toast.error("Something went wrong when fetching agents");
      }

      const data = await response.json();
      setAgents(data.allAgents);
    };

    getAllAgents();
  }, []);

  return (
    <div className={classes["agents-wrapper"]}>
      {agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
};

export default FindAgent;
