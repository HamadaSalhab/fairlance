import React from 'react'
import defaultPfp from '../../../assets/images/defaultPfp.jpg'
import { StyledContainer, ProfileInfo, InfoBox, StyledPfp, UploadPhoto, Button } from '../style'

const MainView = () => {
  return (
    <StyledContainer>
      <ProfileInfo>
        <h2>Your Profile Info:</h2>
        <label for="fname">First name</label>
        <InfoBox>
          <p>Fair</p>
        </InfoBox>
        <label for="lname">Last name</label>
        <InfoBox>
          <p>Lance</p>
        </InfoBox>
        <label for="email">Email</label>
        <InfoBox>
          <p>fairlance@example.com</p>
        </InfoBox>
        <label for="cv">CV</label>
        <InfoBox>
          <input type="file" id="cv" name="photo"></input>
        </InfoBox>
        <Button>
          Update
        </Button>
        <Button>
          Save
        </Button>
      </ProfileInfo>
      <StyledPfp>
        <img src={defaultPfp} alt="Profile Picture"></img>
        <label for="photo">Update Photo:</label>
        <UploadPhoto>
          <input type="file" id="photo" name="photo"></input>
        </UploadPhoto>
      </StyledPfp>
    </StyledContainer>
  )
}

export default MainView