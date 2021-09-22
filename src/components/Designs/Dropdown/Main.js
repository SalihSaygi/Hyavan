import React from 'react';
import Navbar from './Navbar';
import Item from './Item';
import DropMenu from './DropMenu';
//Icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Dropdown = () => {
  return (
    <Navbar>
      <Item icon={<ArrowForwardIosIcon />}>
        <DropMenu />
      </Item>
    </Navbar>
  );
};

export default Dropdown;
