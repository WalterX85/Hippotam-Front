import React from 'react';
import { useParams } from 'react-router-dom';
import ImputComponents from '../ImputComponents/ImputConditional';
import '../Screen.scss';

function Ambition() {
  const { id } = useParams();
  const [ambition, setAmbition] = React.useState({
    a1: '',
    a2: '',
    a3: '',
  });

  function onChange(event) {
    setAmbition({
      ...ambition,
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
      body: JSON.stringify(ambition),
    };
    const url = `http://localhost:5000/screen/${id}/ambition`;
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
    <p className="bubble-text ambition">
      <form className="test" onSubmit={submitForm}>
        <label className="label">Vos ambition :</label>
        <ImputComponents type="text" name="a1" onChange={onChange} value={ambition.a1} />
        <ImputComponents type="text" name="a2" onChange={onChange} value={ambition.a2} />
        <ImputComponents type="text" name="a3" onchange={onChange} value={ambition.a3} />
        <input className="submit" type="submit" value="&#10146;" />
      </form>
    </p>
  );
}

export default Ambition;
