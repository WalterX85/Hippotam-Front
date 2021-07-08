import React from 'react';
import ImputFiles from '../ImputComponents/ImputFiles';
import '../Screen.scss';

function ProfileImage() {
  const [selectedFile, setSelectedFile] = React.useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('File', selectedFile);

    fetch(
      'http://localhost:5000/upload',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="profile-image">
      <label className="label">
        {' '}
        Votre photo :
      </label>
      <label className="label-file">
        Choisir un fichier
        <ImputFiles name="File" onChange={changeHandler} />
      </label>
      <p>
        Filename:
        {selectedFile.name}
      </p>
      <button type="submit" className="submit-invert" onClick={handleSubmission}>&#10146;</button>
    </div>
  );
}

export default ProfileImage;
