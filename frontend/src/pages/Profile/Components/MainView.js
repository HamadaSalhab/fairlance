import React, { useContext, useState, useEffect } from 'react';
import defaultPfp from '../../../assets/images/defaultPfp.jpg';
import {
  StyledContainer, ProfileInfo, InfoBox, StyledPfp, UploadPhoto, Button,
  InputField, BalanceContainer, BalanceInfo, BalanceBox
} from '../style';
import { toast } from 'react-toastify';
import AuthContext from '../../../context/AuthContext';
import { useParams } from 'react-router';

const MainView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState({ preview: defaultPfp, data: '' });
  const [cv, setCV] = useState(null);
  const { authToken, userID, setUserFirstName, userFirstName } = useContext(AuthContext)
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
    const getInfo = async () => {
      await fetch(`/api/users/${id}/`, req)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.username);
          setPhoto({ preview: data.profile_image, data: '' })
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getInfo();
  }, []);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('profile_image', photo.data);
    const req = {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true'
      }
      , body: formData
    };
    const req2 = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true'
      }
      , body: JSON.stringify({
        first_name: firstName,
        last_name: lastName
      })
    }
    fetch(`/api/users/${id}/update/`, req2)
      .then(response => {
        return response.json()
      })
      .then(data => {
        toast("Account updated successfully");
        console.log(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        localStorage.removeItem("userFirstName");
        localStorage.setItem("userFirstName", JSON.stringify(data.first_name));
        setUserFirstName(data.first_name);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An Error Occurred, please try again")
      })
    if (photo.data)
      fetch(`/api/users/${id}/update/profile-image/`, req)
        .then(response => {
          return response.json()
        })
        .then(data => {
          toast("Profile photo updated successfully");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("An Error Occurred, please try again")
        })
  };

  const handlePhotoChange = (e) => {
    setPhoto({ preview: URL.createObjectURL(e.target.files[0]), data: e.target.files[0] });
  };

  const handleCVchange = (e) => {
    const selectedFile = e.target.files[0];
    setCV(selectedFile);
  };

  return (
    <>
      <StyledContainer>
        <section>
          <ProfileInfo>
            <h2>Profile Info:</h2>

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
              <Button onClick={handleUpdate}>
                Save
              </Button>
              :
              <></>
            }
          </ProfileInfo>

          <StyledPfp>
            <img src={photo.preview} alt="" />
            {userID == id ?
              <>
                <label htmlFor="photo">Update Photo:</label>
                <UploadPhoto>
                  <input type="file" id="photo" name="photo" src={photo.preview} onChange={handlePhotoChange} />
                </UploadPhoto>
              </>
              :
              <></>
            }

          </StyledPfp>
        </section>
        <BalanceInfo>
          <h2>Balance Info:</h2>
          <section>
            <div>
              <label htmlFor='balance'>Current Balance</label>
              <BalanceBox>
                <p>0.00</p>
              </BalanceBox>
            </div>
            <div>
              <label htmlFor='balance'>Top-up your account</label>
              <Button>
                Top-Up
              </Button>
            </div>
          </section>
        </BalanceInfo>
      </StyledContainer>
    </>
  );
};

export default MainView;
