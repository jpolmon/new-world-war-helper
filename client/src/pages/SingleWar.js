import React,{ useState } from 'react';

import { Row, Col, Card, Tooltip, Button, Modal, Select, Form, notification }  from 'antd';
import { purple, red, grey } from '@ant-design/colors';

import { useParams, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SINGLE_WAR, QUERY_ME } from '../utils/queries';
import { ADD_TO_WAR, REMOVE_WAR, UPDATE_TO_WAR, CHANGE_ROLE } from '../utils/mutations';

import Auth from '../utils/auth';

const { Option } = Select;

const SingleWar = () => {

  const [addToWar] = useMutation(ADD_TO_WAR);
  const [removeWar] = useMutation(REMOVE_WAR);
  const [updateToWar] = useMutation(UPDATE_TO_WAR);
  const [changeRole] = useMutation(CHANGE_ROLE);

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

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [form] = Form.useForm();
  const [role, setRole] = useState('');

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

  if (warLoading || userLoading) {
    return <div>Loading...</div>
  }
  
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  
  let registerDisplay = 'none'
  let userRole = '';

  if (Auth.loggedIn() && !allUsers.includes(user)) {
    registerDisplay = 'inline';
  } else {
    registerDisplay = 'none';
    if (tankUsers.includes(user)) {
      tankEditDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      userRole = 'tanks'
    } else if (mdpsUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsEditDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      userRole = 'mdps';
    } else if (prdpsUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsEditDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      userRole = 'prdps';
    } else if (erdpsUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsEditDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      userRole = 'erdps';
    } else if (healersUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersEditDisplay = 'inline';
      artilleryChangeDisplay = 'inline';
      userRole = 'healers'
    } else if (artilleryUsers.includes(user)) {
      tankChangeDisplay = 'inline';
      mdpsChangeDisplay = 'inline';
      prdpsChangeDisplay = 'inline';
      erdpsChangeDisplay = 'inline';
      healersChangeDisplay = 'inline';
      artilleryEditDisplay = 'inline';
      userRole = 'artillery';
    }    
  }

  const wepLvls = ['20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
  const charLvls = []
  for(let i=1; i<61; i++) {
    charLvls.push(`${61 - i}`);
  }
  const weps = [{name: 'Sword and Shield', abr: 'SS'}, 
                {name: 'Rapier', abr: 'RA'}, 
                {name: 'Hatchet', abr: 'HA'}, 
                {name: 'Spear', abr: 'SP'},
                {name: 'Great Axe', abr: 'GA'}, 
                {name: 'War Hammer', abr: 'WH'}, 
                {name: 'Bow', abr: 'BO'}, 
                {name: 'Musket', abr: 'MU'}, 
                {name: 'Fire Staff', abr: 'FS'}, 
                {name: 'Life Staff', abr: 'LS'}, 
                {name: 'Ice Gauntlet', abr: 'IG'}
              ];

  const showModal = (e) => {
    setVisible(true);
    setModalText('');
    setRole(e.target.dataset.role);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values) => {
    
    if (!token) {
      return false;
    }

    const charLvl = values.charLvl;
    const primaryWep = values.primaryWep;
    const primaryWepLvl = values.primaryWepLvl;
    const secondaryWep = values.secondaryWep;
    const secondaryWepLvl = values.secondaryWepLvl;

    let messageText = '';
    let descriptionText = '';
    
    if (allUsers.includes(user)) {
      if (userRole === role) {
        try {
          const { data } = await updateToWar({ variables: { warId, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl, role } });
          if (!data) {
            throw new Error("Couldn't update user!");
          }
          messageText = 'Updated!';
          descriptionText = 'Your information has been updated!';
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { data } = await changeRole({ variables: { warId, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl, role } });
          if (!data) {
            throw new Error("Couldn't update user!");
          }
          messageText = 'Updated!';
          descriptionText = 'Your role has been changed!';
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        const { data } = await addToWar({ variables: { warId, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl, role } });
        if (!data) {
          throw new Error("Couldn't add user to war!");
        }
        messageText = 'Registered!';
        descriptionText = 'Thank you for registering for the upcoming invasion!';
      } catch (err) {
        console.log(err);
      }
    }

    registerDisplay = 'none';

    console.log('Success!', values, 'role:', role);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      notification['success']({
        message: `${messageText}`,
        description:
          `${descriptionText}`,
        placement: 'topLeft'
      });
    }, 100);
    form.resetFields();
  }

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
  
        <Modal
          title=''
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={''}
        >
          <p>{modalText}</p>
          <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item name="charLvl" label="Character Level" rules={[{ required: true, message: 'Please select your level!'}]}>
              <Select style={{ width: '50%', margin: '5px' }} placeholder="Character Level" allowClear>
                {charLvls.map((lvl) => {
                  return (
                    <Option value={lvl}>{lvl}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="primaryWep" label="Primary Weapon" rules={[{ required: true, message: 'Please select a weapon!'}]}>
              <Select style={{ width: '50%', margin: '5px' }} placeholder="Primary Weapon" allowClear>
                {weps.map((wep) => {
                  return (
                    <Option value={wep.abr}>{wep.name}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="primaryWepLvl" label="Primary Weapon Level" rules={[{ required: true, message: 'Please select a weapon level!'}]}>
              <Select style={{ width: '50%', margin: '5px' }} placeholder="Lvl" allowClear>
                {wepLvls.map((lvl) => {
                  return (
                    <Option value={lvl}>{lvl}</Option>
                  );
                })}
              </Select>
            </Form.Item>
  
            <Form.Item name="secondaryWep" label="Secondary Weapon" rules={[{ required: true, message: 'Please select a weapon!'}]}>            
              <Select style={{ width: '50%', margin: '5px' }} placeholder="Secondary Weapon" allowClear>
                {weps.map((wep) => {
                  return (
                    <Option value={wep.abr}>{wep.name}</Option>
                  );
                })}
              </Select>            
            </Form.Item>
            <Form.Item name="secondaryWepLvl" label="Secondary Weapon Level" rules={[{ required: true, message: 'Please select a weapon level!'}]}>
              <Select style={{ width: '50%', margin: '5px' }} placeholder="Lvl" allowClear>
                {wepLvls.map((lvl) => {
                  return (
                    <Option value={lvl}>{lvl}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button key="submit" style={{backgroundColor: purple[3], borderColor: purple[3]}} type="primary" loading={confirmLoading} htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
  
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
    );
  } 
};

export default SingleWar;
