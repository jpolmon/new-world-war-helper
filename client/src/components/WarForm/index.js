import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import moment from 'moment';

import { ADD_WAR } from '../../utils/mutations';
import { QUERY_WARS, QUERY_ME } from '../../utils/queries';
import { purple, red, grey } from '@ant-design/colors';
import { Select, DatePicker, TimePicker, Space } from 'antd';

import Auth from '../../utils/auth';

const WarForm = () => {

  const { Option } = Select;

  function onSearch(val) {
    console.log('search:', val);
  }

  const [city, setCity] = useState('');

  const [date, setDate] = useState('');
  
  const [time, setTime] = useState('');
  
  const dateFormat = 'dddd, MMMM Do';

  const timeFormat = 'h:mm A';

  const [ addWar, { error }] = useMutation(ADD_WAR, {
    update(cache, { data: { addWar } }) {
      try {
        const { wars } = cache.readQuery({ query: QUERY_WARS });

        cache.writeQuery({
          query: QUERY_WARS,
          data: { wars: [addWar, ...wars] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, wars: [...me.wars, addWar] } },
      })
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {

      const { data } = await addWar({
        variables: {
          city,
          date: moment(date).format(dateFormat),
          time: moment(time).format(timeFormat),
          warAuthor: Auth.getProfile().data.username,
        },
      });
      
      setCity('');
      setDate('');
      setTime('');
    } catch (err) {
      console.error(err);
    }
  };

  function cityChange (value){
    setCity(value)
  }
  function dateChange (value){
    setDate(value)
  }
  function timeChange (value){
    setTime(value)
  }

  return (
    <div style={{ color: purple[3], fontSize: 20 }}>
      {Auth.loggedIn() ? (
        <>
        <Space direction='vertical' size='large'>
          <div style={{textAlign: 'center', fontSize: 32}}>War Details</div>
          <div style={{textAlign: 'center'}}>Select city:</div>
          <Select
            showSearch
            style={{ width: 250 }}
            placeholder="Select a city"
            optionFilterProp="children"
            onSearch={onSearch}
            name="city"
            value={city}
            onChange={cityChange}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value='Brightwood'>Brightwood</Option>
            <Option value='Cutlass Keys'>Cutlass Keys</Option>
            <Option value='Ebonscale Reach'>Ebonscale Reach</Option>
            <Option value='Edengrove'>Edengrove</Option>
            <Option value='Everfall'>Everfall</Option>
            <Option value='First Light'>First Light</Option>
            <Option value='Great Cleave'>Great Cleave</Option>
            <Option value="Monarch's Bluffs">Monarch's Bluffs</Option>
            <Option value='Mourningdale'>Mourningdale</Option>
            <Option value='Reekwater'>Reekwater</Option>
            <Option value='Restless Shore'>Restless Shore</Option>
            <Option value='Shattered Mountain'>Shattered Mountain</Option>
            <Option value="Weaver's Fen">Weaver's Fen</Option>
            <Option value='Windsward'>Windsward</Option>
          </Select>

          <div style={{textAlign: 'center'}}>Select date:</div>
          <DatePicker name="date" value={date} onChange={dateChange} format={dateFormat} style={{ width: 250 }}/>

          <div style={{textAlign: 'center'}}>Select time(EST):</div>
          <TimePicker name="time" value={time} onChange={timeChange} use12Hours format={timeFormat} minuteStep={30} style={{ width: 250 }}/>

          <form onSubmit={handleFormSubmit}>
            <button type="submit" style={{color: purple[3], backgroundColor: grey[7], width: 250, height: 50, marginTop: 30, marginBottom: 30, borderRadius: 12, fontWeight: 'bold', cursor: 'pointer'}}>
            +Add War
            </button>
            {error && (
              <div style={{width: 250, backgroundColor: red[3], color: 'white', borderRadius: 2, padding: 6}}>
                {error.message}
              </div>
            )}
          </form>
        </Space>
        </>
      ) : (
        <p style={{color: purple[3]}}>
          You need to be logged in to share your wars. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WarForm;
