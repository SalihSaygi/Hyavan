import React, { useState } from 'react';
import './styles/DropMenu.module.css';
import DropItem from './DropItem';
import { CSSTransition } from 'react-transition-group';
//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LockIcon from '@material-ui/icons/Lock';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CodeIcon from '@material-ui/icons/Code';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ArrowForwardIosIcon as ForwardIcon } from '@material-ui/icons/ArrowForwardIos';
import { ArrowBackIosIcon as BackIcon } from '@material-ui/icons/ArrowBackIos';

import useMenuHeight from './useMenuHeight';

import { getProfile } from '@apiCalls/back/userApi';
import { useQuery } from 'react-query';

const DropMenu = () => {
  const url = window.location.href;

  const [activeMenu, setActiveMenu] = useState('main');
  const { menuHeight, dropdownRef, setMenuHeight } = useMenuHeight(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const { data } = useQuery('currentUser', getProfile);

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        classNames="menu-primary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeght}
      >
        <div className="menu">
          <DropItem>{data.displayName}</DropItem>
          <DropItem
            leftIcon={<AccountBoxIcon />}
            url={`${url}/profile`}
            setActiveMenu={setActiveMenu}
          >
            My Profile
          </DropItem>
          <DropItem
            leftIcon={<SettingsApplicationsIcon />}
            rightIcon={<ForwardIcon />}
            goToMenu="settings"
            setActiveMenu={setActiveMenu}
          >
            Settings
          </DropItem>
          <DropItem
            leftIcon={<LockIcon />}
            rightIcon={<ForwardIcon />}
            goToMenu="security"
            setActiveMenu={setActiveMenu}
          >
            Security
          </DropItem>
          <DropItem
            leftIcon={<FormatListBulletedIcon />}
            rightIcon={<ForwardIcon />}
            goToMenu="logs"
            setActiveMenu={setActiveMenu}
          >
            Logs
          </DropItem>
          <DropItem
            url={`${url}/logout`}
            setActiveMenu={setActiveMenu}
            leftIcon={<ExitToAppIcon />}
          >
            Log Out
          </DropItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'settings'}
        classNames="menu-secondary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div>
          <DropItem
            goToMenu="main"
            leftIcon={<BackIcon />}
            setActiveMenu={setActiveMenu}
          >
            <h2>Settings</h2>
          </DropItem>
          <DropItem
            url={`${url}/settings/Bot`}
            setActiveMenu={setActiveMenu}
            leftIcon={<CodeIcon />}
          >
            Bot
          </DropItem>
          <DropItem
            url={`${url}/settings/Audio`}
            setActiveMenu={setActiveMenu}
            leftIcon={<AudiotrackIcon />}
          >
            Audio
          </DropItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'security'}
        classNames="menu-secondary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div>
          <DropItem
            goToMenu="main"
            leftIcon={<BackIcon />}
            setActiveMenu={setActiveMenu}
          >
            <h2>Security</h2>
          </DropItem>
          <DropItem
            url={`${url}/security#password`}
            setActiveMenu={setActiveMenu}
            leftIcon={<VpnKeyIcon />}
          >
            Password
          </DropItem>
          <DropItem
            url={`${url}/security#email`}
            setActiveMenu={setActiveMenu}
            leftIcon={<AlternateEmailIcon />}
          >
            Email
          </DropItem>
          <DropItem
            url={`${url}/security/terminate`}
            setActiveMenu={setActiveMenu}
            leftIcon={<DeleteForeverIcon />}
          >
            Delete Account
          </DropItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'logs'}
        classNames="menu-secondary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div>
          <DropItem goToMenu="main" leftIcon={<BackIcon />}>
            <h2>Download Logs</h2>
          </DropItem>
          <DropItem url={`${url}/logs#week`} setActiveMenu={setActiveMenu}>
            Last Week
          </DropItem>
          <DropItem url={`${url}/logs#today`} setActiveMenu={setActiveMenu}>
            Today
          </DropItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropMenu;
