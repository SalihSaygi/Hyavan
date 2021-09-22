import client from './client'

client.on('error', function (error) {
    console.dir(error)
    console.error("Redis Error")
})
client.on("ready", function () {
    console.dir("Redis connection is ready")
})
client.on("end", function () {
    console.dir("Redis connection closed")
})