import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-admin",
  brokers: ["kafka:9092"],
});

const admin = kafka.admin();

const createTopics = async () => {
  await admin.connect();
  console.log("✅ Connected to Kafka");

  await admin.createTopics({
    topics: [
      { topic: "authenticated" },
      { topic: "project-deleted" },
      { topic: "project-liked" }
    ],
  });

  console.log("✅ Topics created successfully");
  await admin.disconnect();
};

const runWithRetry = async () => {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      await createTopics();
      break;
    } catch (err:any) {
      attempts++;
      console.error(`❌ Attempt ${attempts}: Failed to create topics — ${err.message}`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  if (attempts === maxAttempts) {
    console.error("❌ Failed to create topics after max retries");
    process.exit(1);
  }
};

runWithRetry();


