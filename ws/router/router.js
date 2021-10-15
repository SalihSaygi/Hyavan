import { client } from '../../redis/client'
import Lounge from './lounge'
import Joi from 'joi'
import { router as routeConfig } from '../../config/router'
import { multipleEnds } from './helperFns'

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
        this.config = config,
        this.timeoutID
    }

    findUser(userId, isLounge) {
        if(isLounge) {
            return this.findUserInLounge(userId)
        }
        else {
            return this.findUserInRoom(userId)
        }
    }

    findUserInRoom(userId) {
        const user = 
            this.rooms.map(room => { //fix O(n)^2 here
            room.chatters.filter(chatter => {
                return chatter.id == userId
            })
        })
        return user       
    }

    findUserInLounge(userId) {
        const lounges = this.refreshLounges()
        const user = 
            lounges.map(lounge => { //fix O(n)^2 here
            lounge.users.filter(chatter => {
                return chatter.id == userId
            })
        })
        return user
    }

    findFromId(id, type) {
        if(type == "room") {
            return this.fromIdToRoom(id)
        }
        else {
            return this.fromIdToLounge(id)
        }
    }

    fromIdToRoom(roomId) {
        const rooms = this.refreshRooms()
        const room = rooms.map(room => {
            return room.id === roomId
        })
        return room
    }

    fromIdToLounge(loungeId) {
        const lounges = this.refreshLounges()
        const lounge = lounges.map(lounge => {
            return lounge.id == loungeId
        })
        return lounge
    }

    getUsers() {
        client.get('chat-users', function (err, reply) {
            if (reply) {
            this.users = JSON.parse(reply);
            }
        });
        return this.users;
    }

    refreshUsers() {
        this.getUsers()
        clearTimeout(this.timeoutID)
        this.init(15)
    }

    setUsers(newUser) {
        this.users = [...this.users, newUser]
        client.set('chat-chat', this.users)
    }

    getSockets(userId) {
        client.get('chat-users', function (err, reply) {
            if (reply) {
            this.users = JSON.parse(reply);
            const foundUser = users.filter(user => {
                return userId == user.id
            })
            this.sockets = foundUser.sockets
            }
        });
        return this.sockets;
    }

    refreshSockets(userId) {
        this.getSockets(userId)
        clearTimeout(this.timeoutID)
        this.init(15)
    }

    setSockets(userId, newSockets) {
        const sockets = this.refreshSockets(userId)
        const user = this.findUser(userId)
        const users = this.refreshUsers()
        const index = users.indexOf(user)
        this.users[index].sockets = [sockets, ...newSockets]
        client.set('chat-users', this.users)
    }

    updateSockets(newSocket) {
        this.rooms[roomId].chatter = newSocket
        client.set('chat-rooms', this.rooms)
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

    refreshChatters(isPriv, roomId) {
        this.getChatters(isPriv, roomId)
        clearTimeout(this.timeoutID)
        this.init(15)
    }

    setChatters(roomId, newChatters) {
        const chatters = this.refreshChatters(roomId)
        this.rooms[roomId].chatters = [chatters, ...newChatters]
    }

    updateChatter(newChatter, roomId, userId) {
        this.rooms[roomId].chatters[userId] = newChatter
        client.set('chat-rooms', this.rooms)
    }

    getLounges() {
        client.get('chat-lounges', function (err, reply) {
            if (reply) {
            this.lounges = JSON.parse(reply);
            }
        });
        
        return this.lounges;
    }

    refreshLounges() {
        this.getLounges()
        clearTimeout(this.timeoutID)
        this.init(15)
    }

    setLounges(newLounges) {
        const lounges = getLounges()
        this.lounges = [lounges, ...newLounges]
        client.set('chat-lounges', this.lounges)
    }

    findLounges(userId) {
        const user = this.findUser(userId)
        const { friends } = user
        const lounges = friends.map(friends => {
            return friends.subscribedLounges
        })
        client.set('chat-lounges', lounges)
        return lounges
    }

    emitToLounges(userId) {
        const lounges = this.findLounges(userId)
        const command = multipleEnds(lounges)
        this.socket.emit + command
    }

    updateLounge(index, newLounge) {
        this.lounges[index] = newLounge
        client.set('chat-lounges', this.lounges)
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

    refreshRooms(isPriv) {
        this.getRooms(isPriv) 
        clearTimeout(this.timeoutID)
        this.init(15)
    }

    setRooms(newRooms) {
        const rooms = getRooms()
        this.rooms = [rooms, ...newRooms]
        client.set('chat-lounges', this.rooms)
    }

    init(delay) {
        this.getLounges()
        this.getRooms()
        this.getUsers()
        this.distributeLounges()
        this.timeoutID = setTimeout(this.init, this.config.statusTimer, delay)
        //these will run every "statusTimer"
    }

    initLounges(delay) {
        this.loungeTimeoutID = setTimeout(this.initLounges, delay)
    }
    
    initRooms(delay) {
        this.roomsTimeoutID = setTimeout(this.initRooms, delay)
    }

    initUsers(delay) {
        this.usersTimeoutID = setTimeout(this.initUsers, delay)
    }

    initDistributeLounges(delay) {
        this.distributeLoungesTimeoutID = setTimeout(this.initDistributeLounges, delay)
    }

    distributeLounges() {
        let average = 0; 
        const values = []
        this.lounges.forEach(lounge => {
            average += lounge.chatters
            values.push({ lounge: lounge, chatters: lounge.chatters})
        })
        average = average / lounges.length
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
            const newLounge =  this.removeManager(toKicked, this.lounges[index].id, "lounge")
            this.updateLounge(index, newLounge)
        })
    }

    addSocketToUserSockets(userId, socket) {
        if (this.chatters[userId]) {
            if (this.chatters === 4) {
                socket.emit('room full');
            }
            this.setSockets(userId, socket)
        } else {
            users[userId] = [socket.id];
        }
    }

    createLounge(userId) {
        if(this.lounges.host === userId) {
            const newLounge = new Lounge(userId)
            this.setLounges(newLounge)
        }
    }

    addUserToLounge(userId) {
        const lounges = this.refreshLounges()
        const sortedLounges = lounges.sort((a, b) => a - b)
        Object.values(sortedLounges).map(lounge => {
            if (lounge.chatters < this.config) {
                this.socket.join(lounge.id, userId)
            }
        })
        this.createLounge(userId)
    }

    deleteLounge(userId) {
        const lounges = getLounges()
        this.lounges = lounges.filter(lounge => {
            return lounge.host === userId
        })
        client.set('chat-lounges', this.lounges)
    }

    deleteUser(userId) {
        const users = getUsers()
        const index = users.indexOf(userId)
        this.users = users.splice(index, 1)
        client.set("chat-users", this.users)
    }

    removeManager(userId= null, user = null, placeId = null, type) {
        let user
        if(userId && user === null) {
            user = this.findUser(userId)
        } else if(!userId && !user) {
            throw new Error("You either need to provide userId or user.")
        }
        switch(type) {
            case "lounge":
                this.removeUserFromLounge(user, placeId)
                break
            case "room":
                this.removeChatterFromRoom(user, placeId)
                break
            case "socket":
                this.removeSocketFromUserSockets(userId, placeId)
        }
        throw new Error("There is no matching type for removing.")
    }

    removeSocketFromUserSockets(theUser, socketId) {
        Object.values(this.users).map(user => {
            const index = user.sockets.indexOf(socketId)
            if (index !== -1) {
                const remainingSockets = user.sockets.splice(index, 1);
                this.setSockets(remainingSockets, user.id)
            }
            if (user.chatters.length === 0) {
                this.deleteUser(theUser.id)
            }
        })
        throw new Error("User does not exist.")
    }
    
    removeUserFromLounge(theUser) {
        Object.values(this.lounges).map(lounge => {
            const index = lounge.users.indexOf(theUser)
            if (index !== -1) {
                this.socket.leave(lounge.id, theUser)
                const remainingChatters = lounge.chatters.splice(index, 1);
                this.setChatters(remainingChatters, lounge.id)
            }
            if (lounge.chatters.length === 0) {
                this.deleteLounge(theUser.id)
            }
        })
        throw new Error("Lounge does not exist.")

    }

    removeSockets(room) {
        this.socket.socketsLeave(room)
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
                this.socket.leave(roomId, userId)
                return;
            }
        })
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