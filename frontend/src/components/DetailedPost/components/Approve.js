import { useEffect, useContext, useState } from 'react';
import { StyledApprove } from '../style';
import AuthContext from '../../../context/AuthContext';
import Request from '../../../utils/Request';
import Button from '../../Button/Button';
import { toast } from 'react-toastify';

const Approve = ({ submissionLink, project_id }) => {
  const { authToken } = useContext(AuthContext);
  const [submissionFile, setSubmissionFile] = useState({});

  //   useEffect(() => {
  //     if (submissionLink) {
  //       fetch(submissionLink, Request('GET', '', authToken));
  //       setSubmissionFile({ preview: submissionLink, data: '' });
  //     }
  //   });

  const downloadSubmissionFile = async () => {
    try {
      const response = await fetch(submissionLink, Request('GET', '', authToken));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob(); // get the file as a blob
      const url = window.URL.createObjectURL(blob); // create a URL representing the blob
      const link = document.createElement('a'); // create an anchor element
      link.href = url; // set its href property to the file URL
      const fileName = submissionLink.split('/').pop(); // extract the file name from the URL
      link.download = fileName; // set the file name here
      document.body.appendChild(link); // append the link to the body
      link.click(); // simulate a click to start the download
      document.body.removeChild(link); // remove the link from the body
    } catch (e) {
      console.log(e);
    }
  };

  const approveAndPay = async () => {
    try {
      const response = await fetch(
        `/api/projects/${project_id}/pay/`,
        Request('POST', '', authToken),
      );
      console.log(response);
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast('The payment has been successfully completed. Thanks for using our service!');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledApprove>
      The freelancer has submitted the project. Please view it carefully, and if it meets your
      conditions, please approve it.
      <br />
      {/* <div className='download-file'>
        <a href={submissionFile.preview} download>
          <i className='fas fa-file-download'></i>
          Download
        </a>
      </div> */}
      <Button primary={true} onClick={downloadSubmissionFile}>
        Download File
      </Button>
      <Button primary={true} onClick={approveAndPay}>
        Approve project & pay
      </Button>
    </StyledApprove>
  );
};

export default Approve;
