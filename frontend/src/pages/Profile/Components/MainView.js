import React, { useContext, useState, useEffect } from 'react';
import defaultPfp from '../../../assets/images/defaultPfp.jpg';
import { StyledContainer, ProfileInfo, InfoBox, StyledPfp, UploadPhoto, Button, InputField, ButtonsWrap } from '../style';
import { toast } from 'react-toastify';
import AuthContext from '../../../context/AuthContext';
import { useParams } from 'react-router';

const MainView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(defaultPfp);
  const [cv, setCV] = useState(null);
  const { authToken, userID } = useContext(AuthContext)
  const { id } = useParams();

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
    fetch(`/api/users/${id}/`, req)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.username);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handleUpdate = () => {

    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true'
      }
      , body: JSON.stringify({ first_name: firstName, last_name: lastName })
    }
    fetch(`/api/users/${id}/update/`, req)
      .then(response => {
        return response.json()
      })
      .then(data => {
        toast("Account updated successfully");
        localStorage.removeItem("userFirstName");
        localStorage.setItem("userFirstName", JSON.stringify(firstName));
      })
      .catch((error) => {
        console.log(error);
        toast.error("An Error Occurred, please try again")
      })
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
        {userID == id ?
          <InputField type="text" id="fname" value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
          :
          <InfoBox>
            {firstName}
          </InfoBox>
        }

        <label htmlFor="lname">Last name</label>
        {userID == id ?
          <InputField type="text" id="lname" value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
          :
          <InfoBox>
            {lastName}
          </InfoBox>
        }


        <label htmlFor="email">Email</label>
        <InfoBox>
          {email}
        </InfoBox>

        <label htmlFor="cv">CV</label>
        {userID == id ?
          <InfoBox>
            <input type="file" id="cv" name="cv" onChange={handleCVchange} />
          </InfoBox>
          :
          <InfoBox>
            {cv == null ? <p>(Empty)</p>
              :
              <p>User's CV:{cv}</p>
            }
          </InfoBox>
        }
        {userID == id ?
          <ButtonsWrap>
            <Button onClick={handleUpdate}>
              Save
            </Button>

          </ButtonsWrap>
          :
          <></>
        }
      </ProfileInfo>

      <StyledPfp>
        <img src={defaultPfp} alt="Profile Picture" />
        {userID == id ?
          <>
            <label htmlFor="photo">Update Photo:</label>
            <UploadPhoto>
              <input type="file" id="photo" name="photo" onChange={handlePhotoChange} />
            </UploadPhoto>
          </>
          :
          <></>
        }

      </StyledPfp>
    </StyledContainer>
  );
};

export default MainView;
