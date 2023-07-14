import React, { useContext, useState, useEffect } from 'react';
import defaultPfp from '../../../assets/images/defaultPfp.jpg';
import {
    StyledContainer,
    ProfileInfo,
    InfoBox,
    StyledPfp,
    UploadPhoto,
    StyledButton,
    InputField,
    ButtonsWrap,
} from '../style';
import { toast } from 'react-toastify';
import AuthContext from '../../../context/AuthContext';
import { useParams } from 'react-router';
import Button from '../../../components/Button';

const MainView = () => {
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState({});
    const [cv, setCV] = useState(null);
    const [updatedExtra, setUpdatedExtra] = useState(false);
    const { authToken, userID, setUserFirstName } = useContext(AuthContext);
    const { id } = useParams();
    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
                setAddress(res);
                setUpdatedExtra(true);
            });
        } else {
            toast.error('Please install MetaMask wallet to continue');
        }
    };

    useEffect(() => {
        const req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `token ${authToken}`,
                'ngrok-skip-browser-warning': 'true',
            },
        };
        const getInfo = async () => {
            await fetch(`/api/users/${id}/`, req)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setEmail(data.username);
                    if (data.wallet_address) {
                        setAddress(data.wallet_address);
                    } else {
                        setAddress('Please connect metamask wallet');
                    }
                    if (data.profile_image) {
                        fetch(data.profile_image, req);
                        setPhoto({ preview: data.profile_image, data: '' });
                    } else {
                        setPhoto({ preview: defaultPfp, data: '' });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getInfo();
    }, [id]);

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('profile_image', photo.data);
        formData.append('wallet_address', address);

        const req = {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `token ${authToken}`,
                'ngrok-skip-browser-warning': 'true',
            },
            body: formData,
        };
        const req2 = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `token ${authToken}`,
                'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
            }),
        };
        fetch(`/api/users/${id}/update/`, req2)
            .then((response) => {
                if (response.ok) return response.json();
                else throw Error(response);
            })
            .then((data) => {
                toast('Account updated successfully');
                console.log(data);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                localStorage.removeItem('userFirstName');
                localStorage.setItem('userFirstName', JSON.stringify(data.first_name));
                setUserFirstName(data.first_name);
            })
            .catch((error) => {
                console.log(error);
                toast.error('An Error Occurred, please try again');
            });
        if (updatedExtra)
            fetch(`/api/users/${id}/update/extra-details/`, req)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data instanceof Array && data.includes('Address already exists.')) {
                        toast.error('This address is already in use, please try another address');
                    } else {
                        toast('Profile photo and address updated successfully');
                    }
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('An Error Occurred, please try again');
                });
    };

    const handlePhotoChange = (e) => {
        setPhoto({
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        });
    };

    const handleCVchange = (e) => {
        const selectedFile = e.target.files[0];
        setCV(selectedFile);
    };

    return (
        <StyledContainer>
            <ProfileInfo>
                <h2>Your Profile Info:</h2>

                <label htmlFor='fname'>First name</label>
                {userID.toString() === id ? (
                    <InputField
                        type='text'
                        id='fname'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                ) : (
                    <InfoBox>{firstName}</InfoBox>
                )}

                <label htmlFor='lname'>Last name</label>
                {userID.toString() === id ? (
                    <InputField
                        type='text'
                        id='lname'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                ) : (
                    <InfoBox>{lastName}</InfoBox>
                )}

                <label htmlFor='email'>Email</label>
                <InfoBox>{email}</InfoBox>

                <label htmlFor='cv'>CV</label>
                {userID.toString() === id ? (
                    <InfoBox>
                        <input type='file' id='cv' name='cv' onChange={handleCVchange} />
                    </InfoBox>
                ) : (
                    <InfoBox>{cv === null ? <p>(Empty)</p> : <p>User's CV:{cv}</p>}</InfoBox>
                )}
                {userID.toString() === id && (
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor='wallet'>Wallet Address</label>
                        <InfoBox>{address}</InfoBox>
                        <Button onClick={connectWallet}>
                            Connect wallet{' '}
                            <i
                                style={{ paddingLeft: '0.5rem' }}
                                className='fab fa-ethereum fa-l'
                            ></i>
                        </Button>
                    </div>
                )}
                {userID.toString() === id ? (
                    <ButtonsWrap>
                        <StyledButton onClick={handleUpdate}>Save</StyledButton>
                    </ButtonsWrap>
                ) : (
                    <></>
                )}
            </ProfileInfo>

            <StyledPfp>
                <img src={photo.preview} alt='' />
                {userID.toString() === id ? (
                    <>
                        <label htmlFor='photo'>Update Photo:</label>
                        <UploadPhoto>
                            <input
                                type='file'
                                id='photo'
                                name='photo'
                                src={photo.preview}
                                onChange={(e) => {
                                    handlePhotoChange(e);
                                    setUpdatedExtra(true);
                                }}
                            />
                        </UploadPhoto>
                    </>
                ) : (
                    <></>
                )}
            </StyledPfp>
        </StyledContainer>
    );
};

export default MainView;
