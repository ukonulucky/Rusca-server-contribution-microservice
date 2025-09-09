import * as amqplib from "amqplib"
import { Connection, Channel } from 'amqplib';
import logger from "../utils/logger"



const exchangeName ="paymentApp"
 let rabitConnection: Connection | null = null
let rabitChannel: Channel | null = null
 
export async function connectToRabbitMqFunc() {
    logger.info("Connection to rabbitmq started")
        try {
            // connect to rabitmq local server
            rabitConnection = await amqplib.connect(process.env.RABBITMQ_URL as string) 
            // create a channel for communication after the connection
            if (!rabitConnection) { 
                throw new Error("Failed to establish RabbitMQ connection");
            }
            rabitChannel = await rabitConnection.createChannel()
            await rabitChannel?.assertExchange(exchangeName, "topic", { durable: false })
            logger.info("Rabbitmq connection made successfully")    
  
        } catch (error) {
            logger.error("Error connecting to rabbitmq:", error)
            console.log("Error connecting to rabbitmq:", error)
        }
        
    }


export async function consumeMessageRabitmq(routingKey: string, callback: (msg: any) => void) {

    try {
       logger.info("Attempting publishing message")
     // reconnect if no channel is found
     if (!rabitChannel) { 
        await connectToRabbitMqFunc()
     }
        const q = await rabitChannel?.assertQueue("", {
            exclusive: true
        })
        await rabitChannel?.bindQueue(q?.queue!, exchangeName, routingKey)
        rabitChannel?.consume(q?.queue!, (msg) => { 
            if (msg !== null) { 

                const content = JSON.parse(msg.content.toString())
                callback(content)
                rabitChannel?.ack(msg)
            }
        })
        logger.info(`Subcribed to event ${routingKey}`)
     
   } catch (error) {
        logger.warn("RabitMq Error in publishing message", error)
        throw new Error("RabitMq Error in publishing message")
   }
    
}

