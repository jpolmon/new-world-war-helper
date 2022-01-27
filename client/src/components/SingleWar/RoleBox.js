import React, { useContext } from "react";

import { WarContext } from "./WarContext";

import { Row, Col, Card, Tooltip, Button } from "antd";
import { purple, grey} from "@ant-design/colors";

import Auth from '../../utils/auth';

const RoleBox = ({ user, allUsers, tanks, mdps, prdps, erdps, healers, artillery, tankUsers, mdpsUsers, prdpsUsers, erdpsUsers, healersUsers, artilleryUsers }) => {
  
  const { value1, value2, value3, value4, value5 } = useContext(WarContext);
  const setVisible = value1[1];
  const setModalText = value2[1];
  const [registerDisplay, setRegisterDisplay] = value3;
  const setUserRole = value4[1];
  const setRole = value5[1];

  let tankEditDisplay = 'none';
  let mdpsEditDisplay = 'none';
  let prdpsEditDisplay = 'none';
  let erdpsEditDisplay = 'none';
  let healersEditDisplay = 'none';
  let artilleryEditDisplay = 'none';

  let tankChangeDisplay = 'none';
  let mdpsChangeDisplay = 'none';
  let prdpsChangeDisplay = 'none';
  let erdpsChangeDisplay = 'none';
  let healersChangeDisplay = 'none';
  let artilleryChangeDisplay = 'none';

  if (Auth.loggedIn() && !allUsers.includes(user)) {
    setRegisterDisplay('inline');
  } else {
    setRegisterDisplay('none');
    if (tankUsers.includes(user)) {
      tankEditDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      setUserRole('tanks');
    } else if (mdpsUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsEditDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      setUserRole('mdps');
    } else if (prdpsUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsEditDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      setUserRole('prdps');
    } else if (erdpsUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsEditDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      setUserRole('erdps');
    } else if (healersUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersEditDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      setUserRole('healers');
    } else if (artilleryUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryEditDisplay = 'inline';
      setUserRole('artillery');
    }    
  }

  const showModal = (e) => {
    setVisible(true);
    setModalText('');
    setRole(e.target.dataset.role);
  };

  return(
    <div>
      <Row justify="space-around">
                
        <Col className="gutter-row" xs={24} md={8} style={{ padding: '8px 0' }}>
          <Card title="Tanks 🛡" headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}} extra={<Tooltip title="Register for this war as a Tank" color = {purple[3]}>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: registerDisplay}} size='small'><span data-role='tanks'>Register Now!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: tankEditDisplay}} size='small'><span data-role='tanks'>Update Info!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: tankChangeDisplay}} size='small'><span data-role='tanks'>Change Role!</span></Button>
            </Tooltip>} style={{ maxWidth: 350}}>
            {tanks.map((user) => {
              return (
                <pre style={{fontSize: '12px', whiteSpace: 'pre-wrap'}}>{user.username}:  Level {user.charLvl}   {user.primaryWep}-{user.primaryWepLvl} | {user.secondaryWep}-{user.secondaryWepLvl}</pre>
              )
            })}
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} md={8} style={{padding: '8px 0'}}>
          <Card title="Melee DPS 🗡" headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}} extra={<Tooltip title="Register for this war as a Melee DPS" color = {purple[3]}>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: registerDisplay}} size='small'><span data-role='mdps'>Register Now!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: mdpsEditDisplay}} size='small'><span data-role='mdps'>Update Info!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: mdpsChangeDisplay}} size='small'><span data-role='mdps'>Change Role!</span></Button>
            </Tooltip>} style={{ maxWidth: 350 }}>
            {mdps.map((user) => {
              return (
                <pre style={{fontSize: '12px', whiteSpace: 'pre-wrap'}}>{user.username}:  Level {user.charLvl}   {user.primaryWep}-{user.primaryWepLvl} | {user.secondaryWep}-{user.secondaryWepLvl}</pre>
              )
            })}
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} md={8} style={{padding: '8px 0'}}>
          <Card title="Physical DPS 🏹" headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}} extra={<Tooltip title="Register for this war as a Physical DPS" color = {purple[3]}>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: registerDisplay}} size='small'><span data-role='prdps'>Register Now!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: prdpsEditDisplay}} size='small'><span data-role='prdps'>Update Info!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: prdpsChangeDisplay}} size='small'><span data-role='prdps'>Change Role!</span></Button>
            </Tooltip>} style={{ maxWidth: 350 }}>
            {prdps.map((user) => {
              return (
                <pre style={{fontSize: '12px', whiteSpace: 'pre-wrap'}}>{user.username}:  Level {user.charLvl}   {user.primaryWep}-{user.primaryWepLvl} | {user.secondaryWep}-{user.secondaryWepLvl}</pre>
              )
            })}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="gutter-row" xs={24} md={8} style={{padding: '8px 0'}}>
          <Card title="Elemental DPS 🔥" headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}} extra={<Tooltip title="Register for this war as an Elemental DPS" color = {purple[3]}>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: registerDisplay}} size='small'><span data-role='erdps'>Register Now!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: erdpsEditDisplay}} size='small'><span data-role='erdps'>Update Info!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: erdpsChangeDisplay}} size='small'><span data-role='erdps'>Change Role!</span></Button>
            </Tooltip>} style={{ maxWidth: 350 }}>
            {erdps.map((user) => {
              return (
                <pre style={{fontSize: '12px', whiteSpace: 'pre-wrap'}}>{user.username}:  Level {user.charLvl}   {user.primaryWep}-{user.primaryWepLvl} | {user.secondaryWep}-{user.secondaryWepLvl}</pre>
              )
            })}
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} md={8} style={{padding: '8px 0'}}>
          <Card title="Healer 💝" headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}} extra={<Tooltip title="Register for this war as a Healer" color = {purple[3]}>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: registerDisplay}} size='small'><span data-role='healers'>Register Now!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: healersEditDisplay}} size='small'><span data-role='healers'>Update Info!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: healersChangeDisplay}} size='small'><span data-role='healers'>Change Role!</span></Button>
            </Tooltip>} style={{ maxWidth: 350 }}>
            {healers.map((user) => {
              return (
                <pre style={{fontSize: '12px', whiteSpace: 'pre-wrap'}}>{user.username}:  Level {user.charLvl}   {user.primaryWep}-{user.primaryWepLvl} | {user.secondaryWep}-{user.secondaryWepLvl}</pre>
              )
            })}
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} md={8} style={{padding: '8px 0'}}>
          <Card title="Artillery 💥" headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}} extra={<Tooltip title="Register for this war as Artillery" color = {purple[3]}>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: registerDisplay}} size='small'><span data-role='artillery'>Register Now!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: artilleryEditDisplay}} size='small'><span data-role='artillery'>Update Info!</span></Button>
            <Button onClick={showModal} type="primary" style={{backgroundColor: purple[3], borderColor: purple[3], display: artilleryChangeDisplay}} size='small'><span data-role='artillery'>Change Role!</span></Button>
            </Tooltip>} style={{ maxWidth: 350 }}>
            {artillery.map((user) => {
              return (
                <pre style={{fontSize: '12px', whiteSpace: 'pre-wrap'}}>{user.username}:  Level {user.charLvl}   {user.primaryWep}-{user.primaryWepLvl} | {user.secondaryWep}-{user.secondaryWepLvl}</pre>
              )
            })}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default RoleBox;
