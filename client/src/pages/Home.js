import React from 'react';
import { useQuery } from '@apollo/client';

import WarList from '../components/WarList';

import { QUERY_WARS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_WARS);
  const wars = data?.wars || [];

  return (
    <main>
      <div style={{textAlign: 'center', fontSize: 32}}>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WarList
              wars={wars}
              title="Available Wars:"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
