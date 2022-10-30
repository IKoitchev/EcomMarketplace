import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';

const Profile: React.FC = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  function handleClick() {
    getAccessTokenSilently().then((res) => {
      console.log(res);
      const options = {
        method: 'GET',
        url: 'http://localhost:3008/healthcheck',
        headers: { authorization: 'Bearer ' + res },
      };
      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
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
