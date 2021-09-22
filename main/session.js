import session from 'express-session';
import SESSION_OPTIONS from './config/session';
import store from './redis/store';

const appSession = session({ ...SESSION_OPTIONS, store });

export default appSession;
