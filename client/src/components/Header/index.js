import React from 'react';
import { Link } from 'react-router-dom';
import { purple, grey } from '@ant-design/colors';
import { Button, Space } from 'antd';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header style={{backgroundColor: grey[7], marginBottom: '3rem', paddingTop: '3rem'}}>
      <div style={{textAlign: 'center'}}>
          <Link  to="/">
            <h1 style={{color:purple[3]}}>New World War Helper</h1>
          </Link>
      </div>
      <div style={{display: 'flex', justifyContent: 'right', marginBottom: 10, marginRight: 10}}>
         {Auth.loggedIn() ? (
           <>
           <Space>
              <Link to="/me">
              <Button style={{backgroundColor: purple[3], color: 'white', borderColor: purple[3]}}>Wars</Button>
              </Link>
              <Link to="/createwar">
              <Button style={{backgroundColor: purple[3], color: 'white', borderColor: purple[3]}}>Create War</Button>
              </Link>
              <Button onClick={logout} style={{backgroundColor: purple[3], color: 'white', borderColor: purple[3]}}>Logout</Button>
            </Space>
           </>
         ) : (
           <>
           <Space>
              <Button style={{backgroundColor: purple[3], color: 'white', borderColor: purple[3]}}>
              <Link to="/loginSignup">Login/Signup</Link>
              </Button>
            </Space>
           </>
         )}
       </div>
    </header>
  );
};

export default Header;
