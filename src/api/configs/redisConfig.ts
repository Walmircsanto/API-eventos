import * as redis from "redis";
import dotenv from "dotenv";
export const RedisClient = redis.createClient({
    url:process.env.REDIS_URL,
    password:'',
});

RedisClient.on('connect',()=>{
    console.log(`Redis running on: localhost 6379`)
})

RedisClient.on("error", (err:Error)=>{
    console.log(err);
})
