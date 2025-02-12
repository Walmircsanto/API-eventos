import * as redis from "redis";
import dotenv from "dotenv";
export const BlackListedRedisClient = redis.createClient({
    url:process.env.REDIS_URL,
    password:'',
});

BlackListedRedisClient.on('connect',()=>{
    console.log(`Redis running on: localhost 6379`)
})

BlackListedRedisClient.on("error", (err:Error)=>{
    console.log(err);
})
