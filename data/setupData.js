import dotenv from dotenv
dotenv.config()
import user from './user.js'
import bot from './bot.js'
import priviliged from '.priviliged.js'
import User from '../models/userModel.js'
import Bot from '../models/botModel.js'
import Priviliged from '../models/privilegedModel.js'
import connectDb from '../db.js'
connectDb()

const importData = async () => {
  try {
    if(process.env.NODE_ENV === "development") { 
        await User.deleteMany()
        await Priviliged.deleteMany()
        await Bot.deleteMany()

        await User.insertMany(user)
        await Priviliged.deleteMany(priviliged)
        await Bot.deleteMany(bot)

        console.log('Data Imported!')
        process.exit()
    }
    console.error('Not in Development')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    if(process.env.NODE_ENV === "development") {
        await User.deleteMany()
        await Priviliged.deleteMany()
        await Bot.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    }
    console.error('Not in Development')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}