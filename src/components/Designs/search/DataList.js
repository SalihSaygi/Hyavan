import React from 'react';
import { Users, Product, Rooms } from '../data';

const DataList = ({ entity, dataList }) => {
  switch (entity) {
    case 'users':
      return <Users userList={dataList} />;
    case 'bots':
      return <Product productList={dataList} />;
    case 'rooms':
      return <Rooms roomList={dataList} />;
  }
};

export default DataList;
