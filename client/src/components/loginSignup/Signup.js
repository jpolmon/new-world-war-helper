import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import { purple, grey } from '@ant-design/colors';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {

  const [addUser] = useMutation(ADD_USER);

  const onFinish = async (values) => {

    try {
      
    const { data } = await addUser({variables: {...values}});

    Auth.login(data.addUser.token);
    
    } catch (e) {
      console.error(e);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (


      <Card title="Sign Up"  style={{ width: 800, marginTop: '50px' }} headStyle={{ fontSize: '20px', backgroundColor: grey[7], color: 'white' }} bodyStyle={{ backgroundColor: grey[6], color: 'white'}}>
        <Form
          name="signup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<label style={{ color: 'white'}}>Username</label>}
            style={{color: purple[3]}}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}        
          >
            <Input placeholder="username"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Email</label>}
            style={{color: purple[3]}}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}        
          >
            <Input placeholder="email"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Character Level</label>}
            style={{color: purple[3]}}
            name="level"
            rules={[{ required: true, message: 'Please input your character level!' }]}        
          >
            <Input placeholder="1-60"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Primary Weapon</label>}
            style={{color: purple[3]}}
            name="main"
            rules={[{ required: true, message: 'Please input your main hand weapon!' }]}        
          >
            <Input placeholder="weapon name"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Primary Weapon Level</label>}
            style={{color: purple[3]}}
            name="mainLvl"
            rules={[{ required: true, message: 'Please input your main hand weapon level!' }]}        
          >
            <Input placeholder="1-20"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Secondary Weapon</label>}
            style={{color: purple[3]}}
            name="secondary"
            rules={[{ required: true, message: 'Please input your secondary weapon!' }]}        
          >
            <Input placeholder="weapon name"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Secondary Weapon Level</label>}
            style={{color: purple[3]}}
            name="secondaryLvl"
            rules={[{ required: true, message: 'Please input your secondary weapon level!' }]}        
          >
            <Input placeholder="1-20"/>
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white'}}>Discord ID</label>}
            style={{color: purple[3]}}
            name="discord"
            rules={[{ required: true, message: 'Please input your username!' }]}        
          >
            <Input placeholder="Discord ID"/>
          </Form.Item>
  
          <Form.Item
            label={<label style={{ color: 'white'}}>Password</label>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
  
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{backgroundColor: purple[3], color: 'white', borderColor: purple[3]}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
  );
};

export default Signup;
