import React from 'react';
import ImputFiles from '../ImputComponents/ImputFiles';
import arrowRight from '../../pictures/arrowRight.png';
import '../Screen.scss';

function ProjectImg() {
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
    <p className="bubble-text projetImg">
      <label className="label">
        {' '}
        Image d&apos;un projet :
      </label>
      <label className="label-file">
        Choisir un fichier
        <ImputFiles name="File" onChange={changeHandler} />
      </label>
      {/* <p>
        Filename:
        {selectedFile}
      </p> */}
      <button type="submit" className="submit" onClick={handleSubmission}><img className="arrow-right" src={arrowRight} alt="arrow-right" /></button>
    </p>
  );
}

export default ProjectImg;
