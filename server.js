import { createServer } from 'node:http'

const server = createServer(() =>{
    console.log("OII")
})

server.listen(3333)
