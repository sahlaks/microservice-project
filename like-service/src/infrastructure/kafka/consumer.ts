import { Kafka } from "kafkajs";
import { likeModel } from "../model/likeModel";

const kafka = new Kafka({
  clientId: "like-service",
  brokers: ["kafka:9092"], // Internal Docker hostname
});

const consumer = kafka.consumer({ groupId: "like-group" });

export const startConsumer = async () => {
  const maxAttempts = 5;
  let attempts = 0;
  let connected = false;

  // Retry connecting to Kafka
  while (!connected && attempts < maxAttempts) {
    try {
      await consumer.connect();
      console.log("✅ Kafka consumer connected");
      connected = true;
    } catch (err:any) {
      attempts++;
      console.error(`❌ Kafka consumer connect failed (attempt ${attempts})`, err.message);
      if (attempts === maxAttempts) {
        console.error("❌ Max retry attempts reached. Could not connect to Kafka.");
        process.exit(1); // Or throw error
      }
      await new Promise((res) => setTimeout(res, 2000)); // Wait 2 seconds
    }
  }

  // Subscribe to the topic
  await consumer.subscribe({ topic: "project-deleted", fromBeginning: false });

  // Handle messages
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { projectId } = JSON.parse(message.value!.toString());
        console.log(`🗑️ Deleting likes for projectId: ${projectId}`);
        await likeModel.deleteMany({ projectId });
      } catch (err:any) {
        console.error("⚠️ Failed to process Kafka message:", err.message);
      }
    },
  });
};
