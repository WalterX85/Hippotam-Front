import React from 'react';
import { useParams } from 'react-router-dom';
import { useLoginData } from '../../contexts/LoginDataContext';
import ImputComponents from '../ImputComponents/ImputConditional';
import '../Screen.scss';

function Ambition() {
  const { id } = useParams();
  const { loginData } = useLoginData();
  const [ambition, setAmbition] = React.useState({
    a1: '',
    a2: '',
    a3: '',
  });
  React.useEffect(() => {
    fetch(`http://localhost:5000/screen/${id}/ambition`)
      .then((response) => response.json())
      .then((res) => {
        setAmbition(res.reduce((acc, ambitions) => ({ ...acc, [`a${ambitions.number}`]: ambitions.ambition }), {}));
        console.log(res);
      });
  }, []);

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
        Authorization: `Bearer ${loginData.token}`,
      },
    };
    const url = `http://localhost:5000/screen/${id}/ambition`;
    for (let i = 1; i <= 3; i += 1) {
      config.body = JSON.stringify({ ambition: ambition[`a${i}`], number: i });
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
  }
  return (
    <p className="bubble-text ambition">
      <form className="test" onSubmit={submitForm}>
        <label className="label">Vos ambition :</label>
        <ImputComponents type="text" name="a1" onChange={onChange} value={ambition.a1} />
        <ImputComponents type="text" name="a2" onChange={onChange} value={ambition.a2} />
        <ImputComponents type="text" name="a3" onChange={onChange} value={ambition.a3} />
        <input className="submit" type="submit" value="&#10146;" />
      </form>
    </p>
  );
}

export default Ambition;
