import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'project-service',
    brokers: ['kafka:9092']
})

export const producer = kafka.producer();

export const connectProducer = async () => {
  const maxAttempts = 5;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      await producer.connect();
      console.log("✅ Kafka producer connected");
      break; // Exit the loop if connected successfully
    } catch (err: any) {
      attempts++;
      console.error(`❌ Kafka producer connect failed (attempt ${attempts})`, err.message);
      if (attempts === maxAttempts) {
        console.error("❌ Max retry attempts reached. Could not connect to Kafka.");
        process.exit(1); // Or throw if you want to crash the service
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
    }
  }
}