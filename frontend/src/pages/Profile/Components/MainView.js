import React, { useContext, useState, useEffect } from 'react';
import defaultPfp from '../../../assets/images/defaultPfp.jpg';
import { StyledContainer, ProfileInfo, InfoBox, StyledPfp, UploadPhoto, Button, InputField, ButtonsWrap } from '../style';
import { toast } from 'react-toastify';
import AuthContext from '../../../context/AuthContext';

const MainView = () => {
  const [firstName, setFirstName] = useState('FirstName');
  const [lastName, setLastName] = useState('LastName');
  const [photo, setPhoto] = useState(defaultPfp);
  const [cv, setCV] = useState(null);
  const { authToken } = useContext(AuthContext)

  useEffect(() => {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true'
      }
    }
    fetch('/api/users/id/', req)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        // for (let i = 0; i < 3; i++) {
        //     setPosts([])
        // }
        console.log(error);
      })
  }, []);

  const handleUpdate = () => {

    // Post request

    toast("Account updated successfully");
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    const photoURL = URL.createObjectURL(selectedPhoto);
    setPhoto(photoURL);
  };

  const handleCVchange = (e) => {
    const selectedFile = e.target.files[0];
    setCV(selectedFile);
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
          <input type="file" id="cv" name="cv" onChange={handleCVchange} />
        </InfoBox>
        <ButtonsWrap>
          <Button onClick={handleUpdate}>
            Update
          </Button>

        </ButtonsWrap>
      </ProfileInfo>

      <StyledPfp>
        <img src={defaultPfp} alt="Profile Picture" />
        <label htmlFor="photo">Update Photo:</label>

        <UploadPhoto>
          <input type="file" id="photo" name="photo"  onChange={handlePhotoChange} />
        </UploadPhoto>

      </StyledPfp>
    </StyledContainer>
  );
};

export default MainView;
