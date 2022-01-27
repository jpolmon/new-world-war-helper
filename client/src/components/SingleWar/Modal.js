import React, { useState, useContext } from "react";

import { WarContext } from "./WarContext";

import {Form, Modal, Select, Button, notification} from 'antd';
import { purple } from '@ant-design/colors';

import { useMutation } from "@apollo/client";

import { ADD_TO_WAR, UPDATE_TO_WAR, CHANGE_ROLE } from '../../utils/mutations';

const { Option } = Select;

const MyModal = ({ warId, token, user, allUsers}) => {

  const { value1, value2, value3, value4, value5 } = useContext(WarContext);
  const [visible, setVisible] = value1;
  const modalText = value2[0];
  const setRegisterDisplay = value3[1];
  const userRole = value4[0];
  const role = value5[0];

  const [addToWar] = useMutation(ADD_TO_WAR);
  const [updateToWar] = useMutation(UPDATE_TO_WAR);
  const [changeRole] = useMutation(CHANGE_ROLE);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

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

    setRegisterDisplay('none');

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

  return (
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
  )
}

export default MyModal;
