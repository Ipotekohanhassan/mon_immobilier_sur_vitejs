import agents from "@/data/agents";

import { Link } from "react-router-dom";
import React from "react";

const AvailableAgent = () => {
  return (
    <>
      {agents.slice(23, 26).map((agent) => (
        <div className="col-sm-6 col-md-4" key={agent.id}>
          <div className="feature-style2 mb30">
            <div className="feature-img">
              <Link  to={`/agent-single/${agent.id}`}>
                <img
                 
                  className="bdrs12 w-100 h-100 cover"
                  src={agent.image}
                  alt="agents"
                />
              </Link>
            </div>
            <div className="feature-content pt20">
              <h6 className="title mb-1">
                <Link  to={`/agent-single/${agent.id}`}>{agent.name}</Link>
              </h6>
              <p className="text fz15">Broker</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AvailableAgent;
