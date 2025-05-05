import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

const Register = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: ''
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { email, password, firstName, lastName, age } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, firstName, lastName, age }),
      });

      navigate('/login');
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
      <input placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
      <input placeholder="Age" onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
