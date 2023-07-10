import React, { useState, useContext } from "react";
import { StyledApplicationForm } from "./style";
import Button from "../Button";
import AuthContext from "../../context/AuthContext";

const ApplicationForm = ({ projectId }) => {
  const { authToken, userID } = useContext(AuthContext);
  const [price, setPrice] = useState("");
  const [proposal, setProposal] = useState("");

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleProposalChange = (e) => {
    setProposal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const applicationData = {
      bid: parseInt(price),
      proposal,
      project: projectId,
      freelancer: userID,
    };
    submitApplication(applicationData);
    setPrice("");
    setProposal("");
  };

  const submitApplication = async (applicationData) => {
    const url = '/api/application/create/';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(applicationData),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        console.log('Application submitted!');
        // Perform any additional actions upon successful submission
      } else {
        console.error('Failed to submit application:', response.status);
      }
    } catch (error) {
      console.error('Error occurred while submitting the application:', error);
    }
  };

  return (
    <StyledApplicationForm>
      <h1>Application Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price"><h2>Price:</h2></label>
        <div className="price">
        <div>How much do you want to offer to the post owner? </div>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          required
        />
        </div>
        
        <label htmlFor="proposal"><h2>Proposal:</h2></label>
        <textarea
          id="proposal"
          value={proposal}
          onChange={handleProposalChange}
          rows={15}
          required
        />
        <Button type="submit" primary={true}>Submit Application</Button>
      </form>
    </StyledApplicationForm>
  );
};

export default ApplicationForm;
