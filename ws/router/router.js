import { client } from '../../redis/client'
import Lounge from './lounge'
import Joi from 'joi'
import { router as routeConfig } from '../../config/router'

const roomSchema = Joi.object({
    isPriv: Joi.boolean().required(),
    roomName: Joi.string().required()
})

class Router {
    constructor(socket, config = routeConfig, sids, rooms) {
        this.socket = socket,
        this.sids = sids,
        this.chatters = [],
        this.lounges = [],
        this.rooms = rooms,
        this.config = config
    }

    findUser(userId) {
        const user = 
            this.rooms.map(room => { //fix O(n)^2 here
            room.chatters.filter(chatter => {
                return chatter.id == userId
            })
        })
        return user
    }

    getUserSockets(userId) {
        const user = findUser(userId)
        return user.sockets
    }

    getChatters(isPriv = false, roomId) {
        if(isPriv) {
            return;
        }
        client.get('chat-rooms', function (err, reply) {
            if (reply) {
            const rooms = JSON.parse(reply);
            const foundRoom = rooms.filter(room => {
                return roomId == room.id
            })
            this.chatters = foundRoom.chatters
            }
        });
        return this.chatters;
    }

    getLounges() {
        client.get('chat-lounges', function (err, reply) {
            if (reply) {
            this.lounges = JSON.parse(reply);
            }
        });
        return this.lounges;
    }

    getRooms(isPriv = false) {
        if(isPriv) {
            return;
    }
        client.get('chat-rooms', function (err, reply) {
            if (reply) {
            this.rooms = JSON.parse(reply);
            }
        });
        return this.rooms;
    }

    init() {
        this.getChatters()
        this.getLounges()
        this.getRooms()
        this.distributeLounges()
        setTimeout(init(), this.config.statusTimer)
    }

    distributeLounges() {
        let average = 0; 
        const values = []
        this.lounges.forEach(lounge => {
            average += lounge.chatters
            values.push({ lounge: lounge, chatters: lounge.chatters})
        })
        const topValues = values.chatters.sort((a,b) => b-a).slice(0,5);
        const toChange = topValues.map(value => {
            if(value.chatters - average > this.config.deviationAmountForDistrubution) {
                return value
            }
        })
        toChange.forEach(e => {
            const lounges = getLounges()
            const index = lounges.indexOf(e.lounge)
            const toKicked = [this.lounges[index].chatters.splice(1, e.chatters - average)]
            const newLounge =  this.removeUserFromLounge(toKicked)
            this.lounges[index] = lounge 
        })
    }

    addSocketToUserSockets(userId) {
        if (this.chatters[userId]) {
            if (this.chatters === 4) {
                socket.emit('room full');
                return this.chatters
            }
            users[userId].push(socket.id);
        } else {
            users[userId] = [socket.id];
        }
    }

    removeSocketFromUserSockets(socketId, userId) {
        const index = chatters.findIndex(user => user.id === id);

        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }

    createLounge(userId) {
        if(this.lounges.host === userId) {
            const newLounge = new Lounge(userId)
            this.lounges.push(newLounge)
            client.set('chat-lounges', this.lounges)
        }
        return 'User already has a lounge'
    }

    addUserToLounge(userId) {
        this.lounges = this.getLounges()
        Object.values(this.lounges).map(lounge => {
            if (lounge.chatters < this.config) {
                this.socket.join(lounge.id, userId)
            }
        })
        this.createLounge(userId)
    }

    deleteLounge(userId) {
        const lounges = getLounges()
        const filteredLounges = lounges.filter(lounge => {
            return lounge.host === userId
        })
        client.set('chat-lounges', filteredLounges)
        this.lounges = filteredLounges
    }

    removeUserFromLounge(userId) {
        const user = findUser(userId)
        Object.values(this.lounges).map(lounge => {
            if (lounge.chatters.includes(user)) {
                this.socket.leave(lounge.id, userId)
            }
            if (lounge.chatters.length === 1) {
                this.deleteLounge(userId)
            }
        })
    }

    createRoom() {
        socket.on("create room", (payload, callback) => {
        if (typeof callback !== "function") {
        // not an acknowledgement
        return socket.disconnect();
        }
        const { error, value } = roomSchema.validate(payload);
        if (error) {
        return callback({
            status: "KO",
            error
        });
        }
        // do something with the value, and then
        const room = new Room(value.roomId = false, value.roomName)
        this.rooms.push(room)
        client.set('chat-rooms', this.rooms)
        callback({
        status: "OK"
        });
    });
    }

    addChatterToRoom(userId, roomId) {
        this.rooms.forEach(room => {
            if(room.id === roomId) {
                this.socket.join(roomId, userId)
                return;
            }
        })
    }

    removeChatterFromRoom(userId, roomId) {
        this.rooms.forEach(room => {
            if(room.id === roomId) {
                this.socket.off(roomId, userId)
                return;
            }
        })
    }

    multipleEnds(ends) {
        let command = [];
        ends.forEach(end => {
            if (end.includes(store.endStore)) {
            command.push(`.to(${end})`);
            }
            throw new Error('No end found', end);
        });
        return command.join('');
    }

    nameGenerator() {
        let split = socket.handshake.query.roomName.split('--with--'); // ['username2', 'username1']

        let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']

        let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

        return updatedRoomName
    }
    
    initUser(userId) {
        const room
        this.addChatterToRoom(userId)
        try {
            room = this.addUserToLounge(userId)
            
        } catch (err) {
            throw new Error("Error adding user to a lounge", err)
        }
        this.addChatterToRoom(room)
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit('all users', usersInThisRoom);
    }

    init()
}

export default Router