import React, { useState } from 'react';
import defaultPfp from '../../../assets/images/defaultPfp.jpg';
import { StyledContainer, ProfileInfo, InfoBox, StyledPfp, UploadPhoto, Button, InputField, UpdateMessage, ButtonsWrap} from '../style';
import {toast} from 'react-toastify';

const MainView = () => {
  const [firstName, setFirstName] = useState('FirstName');
  const [lastName, setLastName] = useState('LastName');
  const [photo, setPhoto] = useState(defaultPfp);
  const [cv, setCV] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUpdate = () => {

    console.log(updatedFirstName);
    console.log(updatedLastName);

    const updatedFirstName = firstName;
    const updatedLastName = lastName;
    const updatedPhoto = '';
    const updatedCV = '';

    setFirstName(updatedFirstName);
    setLastName(updatedLastName);
    setPhoto(updatedPhoto);
    setCV(updatedCV);

    setShowSuccessMessage(true);

    toast("Account updated successfully");
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    const photoURL = URL.createObjectURL(selectedPhoto);
    setPhoto(photoURL);
  };

  const handleCVchange = (e) => {
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };

  return (
    <StyledContainer>
      <ProfileInfo>
        <h2>Your Profile Info:</h2>

        <label htmlFor="fname">First name</label>
        <InputField type="text" id="fname" value={firstName}
         onChange={(e) => setFirstName(e.target.value)} />

        <label htmlFor="lname">Last name</label>
        <InputField type="text" id="lname" value={lastName}
         onChange={(e) => setLastName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <InfoBox>
          <p>fairlance@example.com</p>
        </InfoBox>

        <label htmlFor="cv">CV</label>
        <InfoBox>
          <input type="file" id="cv" name="cv" onChange={handleCVchange}/>
        </InfoBox>
        <ButtonsWrap>
          <Button onClick={handleUpdate}>
            Update
          </Button>

          <UpdateMessage>
            {showSuccessMessage && (
              <div className="success-message">Account updated successfully</div>
            )}
          </UpdateMessage>
        </ButtonsWrap>
      </ProfileInfo>

      <StyledPfp>
        <img src={defaultPfp} alt="Profile Picture" />
        <label htmlFor="photo">Update Photo:</label>

        <UploadPhoto>
          <input type="file" id="photo" name="photo" onChange={handlePhotoChange} />
        </UploadPhoto>

      </StyledPfp>
    </StyledContainer>
  );
};

export default MainView;
