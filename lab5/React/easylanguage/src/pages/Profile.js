import { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserData(data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {userData ? (
        <ul>
          <li>First Name: {userData.firstName}</li>
          <li>Last Name: {userData.lastName}</li>
          <li>Age: {userData.age}</li>
          <li>Email: {userData.email}</li>
        </ul>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
