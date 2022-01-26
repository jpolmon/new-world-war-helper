import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { grey, purple } from '@ant-design/colors';
import { Button } from 'antd'

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <footer style={{alignContent: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div>
        {location.pathname !== '/' && (
          <Button
            onClick={() => history.goBack()}
            style={{backgroundColor: purple[3], borderColor: purple[3],marginTop: '10rem'}}
            type="primary"
          >
            &larr; Go Back
          </Button>
        )}
        <h4 style={{color: purple[3], textAlign: 'center', fontSize: 14, marginTop: '10rem'}}>
          Made by Jonathan, Bailey, and Jeffrey!
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
