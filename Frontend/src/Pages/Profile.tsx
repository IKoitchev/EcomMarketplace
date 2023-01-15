import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';
import configJson from '../config/auth_config.json';

const Profile: React.FC = () => {
  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  function handleClick() {
    getAccessTokenWithPopup({ audience: configJson.audience })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // getAccessTokenSilently({ audience: configJson.audience })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  }
  return (
    <>
      {!isAuthenticated ? (
        <>not logged in </>
      ) : (
        <>
          React says: {user?.email}
          <button onClick={handleClick}>get user</button>
        </>
      )}
    </>
  );
};

export default Profile;
