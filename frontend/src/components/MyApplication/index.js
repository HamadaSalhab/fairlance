import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StyledMyApplication } from "./style";
import Button from "../Button";

const MyApplication = ({ application }) => {
    
  return (
    <div>
      <StyledMyApplication>
        {application && (
          <>
            <Link to={`/profile/${application.freelancer}`}>
              <h4>
                {application.freelancer_first_name}{" "}
                {application.freelancer_last_name}
              </h4>
            </Link>
            <p>{application.proposal}</p>
            <div className="price-info">
              <div className="price-range">
                <div>{application.bid} $</div>
              </div>
              {/* <Link to={`/post/${projectid}`}>
                <Button>Return</Button>
              </Link> */}
              {/* <Button primary={true} onClick={hire}>
                Hire
              </Button> */}
            </div>
          </>
        )}
      </StyledMyApplication>
    </div>
  );
};

export default MyApplication