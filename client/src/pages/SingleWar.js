import React from 'react';

import { purple, red, } from '@ant-design/colors';

import MyProvider from '../components/SingleWar/WarContext';
import MyModal from '../components/SingleWar/Modal';
import RoleBox from '../components/SingleWar/RoleBox';

import { useParams, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_WAR, QUERY_ME } from '../utils/queries';
import { REMOVE_WAR } from '../utils/mutations';

import Auth from '../utils/auth';

const SingleWar = () => {

  const [removeWar] = useMutation(REMOVE_WAR);

  const { warId } = useParams();

  const { loading: warLoading, data: warData } = useQuery(QUERY_SINGLE_WAR, {
    variables: { warId: warId }
  });
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  
  let war = warData?.war;
  const tanks = war?.tanks || [];
  const mdps = war?.mdps || [];
  const prdps = war?.prdps || [];
  const erdps = war?.erdps || [];
  const healers = war?.healers || [];
  const artillery = war?.artillery || [];

  let tankUsers = tanks.map(user => user.username);
  let mdpsUsers = mdps.map(user => user.username);
  let prdpsUsers = prdps.map(user => user.username);
  let erdpsUsers = erdps.map(user => user.username);
  let healersUsers = healers.map(user => user.username);
  let artilleryUsers = artillery.map(user => user.username);

  const thisUser = userData?.me;
  let author = war?.warAuthor;
  let user = thisUser?.username;
  const deleteButton = author === user ? 'inline' : 'none';

  const allUsers = [...tankUsers, 
                  ...mdpsUsers, 
                  ...prdpsUsers, 
                  ...erdpsUsers,
                  ...healersUsers,
                  ...artilleryUsers];

  if (warLoading || userLoading) {
    return <div>Loading...</div>
  }
  
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const handleDelete = async () => {
    if (!token) {
      return false;
    }

    try {    
      const { deletedWar } = await removeWar({variables: {warId}}); 
      console.log('War deleted!', deletedWar);
      if (!war) {
        window.location.href = '/';
      }
    } catch (err) {
      console.log(err)    
    }
  }

  if (!war && !warLoading) {
    return(<Redirect to='/'/>)
  } else {
    return (
      <div>
        <div  style={{justifyContent: 'space-between', alignContent: 'center', display: 'flex'}}>
          <div style={{color: purple[3], margin: 'auto', fontSize: 48, paddingBottom: 40}}>{war.city}</div>
          <form style={{width: 100, display: deleteButton}}>
            <button onClick = {handleDelete} style={{height: 30, backgroundColor: red[4], color: 'white', borderRadius: 4 }}>Delete War</button>
          </form>
        </div>
        <MyProvider>
          <MyModal warId={warId} token={token} user={user} allUsers={allUsers}/>
          <RoleBox user={user} allUsers={allUsers} tanks={tanks} mdps={mdps} prdps={prdps} erdps={erdps} healers={healers} artillery={artillery} tankUsers={tankUsers} mdpsUsers={mdpsUsers} prdpsUsers={prdpsUsers} erdpsUsers={erdpsUsers} healersUsers={healersUsers} artilleryUsers={artilleryUsers} />
        </MyProvider>
      </div>
    );
  } 
};

export default SingleWar;
