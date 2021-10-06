import ws from './init';

import { createAdapter } from 'socket.io-redis';
import client from '../redis/client';

const pubClient = client;
const subClient = pubClient.duplicate();

import entities from './entities/index';

import appSession from '../session';
import sharedSession from 'express-socket.io-session';

import Router from './router/router';

const runSocketServer = (server, WebRtc) => {
  const io = ws(server);
  io.use(sharedSession(appSession));
  io.adapter(createAdapter({ pubClient, subClient }));
  io.on('connection', socket => {
    console.log('client connected');
    const sids = io.adapter.sids;
    const rooms = io.adapter.rooms;
    const router = new Router(socket, sids, rooms);
    socket
      .on('login', userdata => {
        try {
          socket.handshake.session.userdata = userdata;
          socket.handshake.session.save();
          socket.emit('login-succesful');
        } catch (error) {
          socket.emit('login-unsuccessful', error);
        }
      })
      .on('logout', () => {
        try {
          if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
            socket.emit('logout-succesful');
          }
        } catch (error) {
          socket.emit('logout-unsuccessful', error);
        }
      })
      .on('authenticated', () => {
        entities(socket, WebRtc, router);
      })
      .on('unauthorized', msg => {
        console.log(`unauthorized: ${JSON.stringify(msg.text)}`);
        throw new Error('Could not authorize');
      })
      .on('disconnection', () => {
        console.log('client disconnected');
      })
      .on('connect_error', err => {
        console.error('client connection error', err);
      });
  });
};

export default runSocketServer;
