import React from 'react';
import { useParams } from 'react-router-dom';
import ImputComponents from '../ImputComponents.jsx/ImputConditional';
import '../Screen.scss';

function Strength() {
  const { id } = useParams();
  const [strength, setStrength] = React.useState({
    s1: '',
    s2: '',
    s3: '',
  });

  function onChange(event) {
    setStrength({
      ...strength,
      [event.target.name]: event.target.value,
    });
  }

  function submitForm(event) {
    event.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(strength),
    };
    const url = `http://localhost:5000/screen/${id}/strength`;
    fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          alert(res.error);
        } else {
          console.log('succès');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return (
    <p className="bubble-text strength">
      <form onSubmit={submitForm}>
        <label className="label">Vos forces :</label>
        <ImputComponents type="text" name="s1" onChange={onChange} value={strength.s1} />
        <ImputComponents type="text" name="s2" onChange={onChange} value={strength.s2} />
        <ImputComponents type="text" name="s3" onchange={onChange} value={strength.s3} />
        <input className="submit" type="submit" value="&#10146;" />
      </form>
    </p>
  );
}

export default Strength;
