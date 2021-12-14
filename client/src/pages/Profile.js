import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { purple } from '@ant-design/colors'

import WarList from '../components/WarList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 style={{color: purple[3]}}>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div style={{color: purple[3], textAlign: 'center', justifyContent: 'center', alignContent: 'center'}}>
      <div style={{fontWeight: 600,fontSize: 32}}>
        Viewing {userParam ? `${user.username}'s` : 'your'} wars
      </div>

        <div>
          <WarList
            wars={user.wars}
            title={`${user.username}'s wars...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
      </div>
  );
};

export default Profile;
