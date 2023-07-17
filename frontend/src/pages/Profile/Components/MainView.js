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
  DepositField,
  BalanceBox,
  BalanceInfo,
} from '../style';
import { toast } from 'react-toastify';
import AuthContext from '../../../context/AuthContext';
import { useParams } from 'react-router';
import Button from '../../../components/Button/Button';
import USDT from '../../../USDT.json';
import * as ethers from 'ethers';
import { BigNumber } from 'bignumber.js';
import Request from '../../../utils/Request';

const USDT_ABI = USDT;
const USDT_ADDRESS = '0x9FE7b16A0532f3B6FD3512df12A5B981fF9C2Da2';
const CONTRACT_ADDRESS = '0x827E8AA9E0f73229AEd872D4a12AE5102fc5Fe0a';

const MainView = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: 'loading...',
    lastName: 'loading...',
    email: 'loading...',
    address: 'loading...',
    balance: 'loading...',
    photo: {},
    cv: null,
  });
  const [fund, setFund] = useState(0);
  const [updatedExtra, setUpdatedExtra] = useState(false);
  const { authToken, userID, setUserFirstName } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    let errorOccured = false;
    fetch(`/api/users/balance/`, Request('GET', '', authToken))
      .then(async (res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      })
      .then((data) => {
        console.log(data);
        setUserDetails((userDetails) => {
          return {
            ...userDetails,
            balance: data.balance,
          };
        });
      })
      .catch((e) => {
        if (errorOccured) return;
        errorOccured = true;
        if (e === 401) toast.error('You are not authorized to view the balance');
        else toast.error(`We could not retrive your balance: error code ${e}`);
      });
    fetch(`/api/users/${id}/`, Request('GET', '', authToken))
      .then((response) => {
        if (response.ok) return response.json();
        else return Promise.reject(response.status);
      })
      .then((data) => {
        console.log(data);
        setUserDetails((userDetails) => {
          return {
            ...userDetails,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.username,
            address: data.wallet_address ? data.wallet_address : 'Please connect to metamask',
          };
        });
        if (data.profile_image) {
          fetch(data.profile_image, Request('GET', '', authToken));
          setUserDetails((userDetails) => {
            return { ...userDetails, photo: { preview: data.profile_image, data: '' } };
          });
        } else
          setUserDetails((userDetails) => {
            return { ...userDetails, photo: { preview: defaultPfp, data: '' } };
          });
      })
      .catch((e) => {
        if (errorOccured) return;
        errorOccured = true;
        if (e === 401) toast.error('Not authorized, please log in');
        else toast.error(`We could not retrive your balance: error code ${e}`);
      });
  }, [id, authToken]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setUserDetails({ ...userDetails, address: await signer.getAddress() });
        setUpdatedExtra(true);
      }
      catch (e) {
        if (e.code === 4001) {
          toast.error('User rejected transaction')
        }
        else {
          toast.error('Unknow error')
        }
      }
    } else {
      toast.error('Please install MetaMask wallet to continue');
    }
  };
  
  const addFunds = async () => {
    fetch('/api/users/deposit/', Request('GET', '', authToken))
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(res.status);
      })
      .then(async () => {
        let tx=null
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const signer = provider.getSigner();
          const USDT_CONTRACT = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);
          const value = new BigNumber(fund * 10 ** 18);
          tx = await USDT_CONTRACT.transfer(CONTRACT_ADDRESS, value.toString());
        }
        catch (e) {
          console.log(e);
        }
        if (tx == null) {
          throw new Error('Unable to handle the transaction');
        }
        const formData = new FormData();
        console.log(tx.hash);
        formData.append('transaction_hash', tx.hash);
        const req = {
          method: 'PUT',
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `token ${authToken}`,
            'ngrok-skip-browser-warning': 'true',
          },
          body: formData,
        };
        const res = await fetch(
          `/api/users/${id}/update/extra-details/`,
          req,
        );
        if (res.ok) {
          toast(
            'Got your request, you will be able to see your balance when we verify your transaction',
          );
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('profile_image', userDetails.photo.data);
    formData.append('wallet_address', userDetails.address);

    const req = {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `token ${authToken}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: formData,
    };
    fetch(
      `/api/users/${id}/update/`,
      Request(
        'PUT',
        {
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
        },
        authToken,
      ),
    )
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response);
      })
      .then((data) => {
        toast('Account updated successfully');
        console.log(data);
        setUserDetails({ ...userDetails, firstName: data.first_name, lastName: data.last_name });
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
    setUserDetails((userDetails) => {
      return {
        ...userDetails,
        photo: {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        },
      };
    });
  };

  const handleCVchange = (e) => {
    // const selectedFile = e.target.files[0];
    // TODO: handle CV change
  };

  return (
    <>
      <StyledContainer>
        <section>
          <ProfileInfo>
            <h2>Profile Info:</h2>

            <label htmlFor="fname">First name</label>
            {userID.toString() === id ? (
              <InputField
                type='text'
                id='fname'
                value={userDetails.firstName}
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
              />
            ) : (
              <InfoBox>{userDetails.firstName}</InfoBox>
            )}

            <label htmlFor="lname">Last name</label>
            {userID.toString() === id ? (
              <InputField
                type='text'
                id='lname'
                value={userDetails.lastName}
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
              />
            ) : (
              <InfoBox>{userDetails.lastName}</InfoBox>
            )}

            <label htmlFor='email'>Email</label>
            <InfoBox>{userDetails.email}</InfoBox>

            <label htmlFor="cv">CV</label>
            {userID.toString() === id ? (
              <InfoBox>
                <input type='file' id='cv' name='cv' onChange={handleCVchange} />
              </InfoBox>
            ) : (
              <InfoBox>
                {userDetails.cv === null ? <p>(Empty)</p> : <p>User's CV:{userDetails.cv}</p>}
              </InfoBox>
            )}

            {userID.toString() === id && (
              <StyledButton onClick={handleUpdate}>Save</StyledButton>
            )}
          </ProfileInfo>
          <StyledPfp>
            <img src={userDetails.photo.preview} alt='' />
            {userID.toString() === id && (
              <>
                <label htmlFor='photo'>Update Photo:</label>
                <UploadPhoto>
                  <input
                    type='file'
                    id='photo'
                    name='photo'
                    src={userDetails.photo.preview}
                    onChange={(e) => {
                      handlePhotoChange(e);
                      setUpdatedExtra(true);
                    }}
                  />
                </UploadPhoto>
              </>
            )}
          </StyledPfp>
        </section>
        <BalanceInfo>
          <h2>Balance Info:</h2>
          {userID.toString() === id && (
            <div id ='wallet-box'>
              <label htmlFor='wallet'>Wallet Address</label>
              <InfoBox>{userDetails.address}</InfoBox>
              <Button onClick={connectWallet}>
                Connect wallet
                <i style={{ paddingLeft: '0.5rem' }} className='fab fa-ethereum fa-l'></i>
              </Button>
            </div>
          )}
          <div id='balance-container'>
            <div>
              <label htmlFor='balance' style={{ display: 'block' }}>
                Balance
              </label>
              <BalanceBox name='balance'>{userDetails.balance}</BalanceBox>
              <div id='withdrawButton'>
                <Button>
                  Withdraw
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor='fund' style={{ display: 'block', marginBottom: '0.5rem' }}>
                Deposit funds
              </label>
              <DepositField
                type='number'
                id='fund'
                name='fund'
                value={fund}
                onChange={(e) => setFund(e.target.value)}
              />
              <div id='depositButton'>
                <Button onClick={addFunds}>
                  Deposit
                </Button>
              </div>
            </div>
          </div>
        </BalanceInfo>
      </StyledContainer>
    </>
  );
};

export default MainView;
