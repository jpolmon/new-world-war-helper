import React from 'react';
import { Link } from 'react-router-dom';
import { purple, red, gold } from '@ant-design/colors';
import wanted from './wantedpaper.png'

const WarList = ({
  wars,
  title,
  showTitle = true
  }) => {
  if (!wars.length) {
    return <h3 style={{ color: purple[3] }}>No Wars Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3 style={{ color: purple[3] }}>{title}</h3>}
      <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
      {wars &&
        wars.map((war) => (
              <div style={{ 
                backgroundImage: `url(${wanted})`,
                backgroundSize: 'contain',
                width: '300px',
                height: '420px',
                color: red[7],
                fontSize: 24,
                fontFamily: 'IM Fell DW Pica',
                fontWeight: 600
              }}>
                <div style={{fontSize: 32, textDecoration: 'underline', marginTop: 65, fontWeight: 'bolder'}}>{war.city}</div>
                <div style={{fontSize: 28, fontWeight: 600}}>on</div>
                {war.date} <br />
                @ {war.time} EST <br />
                
                <Link title={war.city} to={`/wars/${war._id}`}>
                  <button style={{color: red[7], fontSize: 18, borderRadius: 6, backgroundColor: gold[2]}}>Join⚔️</button>
                </Link>
                <div style={{fontSize: 18, marginTop: 105}}>created by {war.warAuthor}</div>
              </div>
        ))}
        </div>
    </div>
  );
};

export default WarList;
