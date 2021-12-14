import React from 'react';
import WarForm from '../components/WarForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { purple } from '@ant-design/colors'

const CreateWar = () => {

  const { username: userParam } = useParams();

  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (!user?.username) {
    return (
      <h4 style={{color: purple[3]}}>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  
  return (
    <div>
      <div style={{ border: '1px dotted #1a1a1a', alignContent: 'center', justifyContent: 'center', display: 'flex'}}>
        <WarForm />
      </div>
    </div>
  );
};

export default CreateWar