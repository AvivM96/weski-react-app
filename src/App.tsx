import React from 'react';
import './App.scss';
import {Space} from "antd";
import TripDiscovery from "./features/trip-discovery/trip-discovery";

function App() {
  return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <TripDiscovery />
      </Space>
  );
}

export default App;
