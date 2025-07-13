"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const likeModel_1 = require("../model/likeModel");
const kafka = new kafkajs_1.Kafka({
    clientId: "like-service",
    brokers: ["kafka:9092"], // Internal Docker hostname
});
const consumer = kafka.consumer({ groupId: "like-group" });
const startConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    const maxAttempts = 5;
    let attempts = 0;
    let connected = false;
    // Retry connecting to Kafka
    while (!connected && attempts < maxAttempts) {
        try {
            yield consumer.connect();
            console.log("✅ Kafka consumer connected");
            connected = true;
        }
        catch (err) {
            attempts++;
            console.error(`❌ Kafka consumer connect failed (attempt ${attempts})`, err.message);
            if (attempts === maxAttempts) {
                console.error("❌ Max retry attempts reached. Could not connect to Kafka.");
                process.exit(1); // Or throw error
            }
            yield new Promise((res) => setTimeout(res, 2000)); // Wait 2 seconds
        }
    }
    // Subscribe to the topic
    yield consumer.subscribe({ topic: "project-deleted", fromBeginning: false });
    // Handle messages
    yield consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ message }) {
            try {
                const { projectId } = JSON.parse(message.value.toString());
                console.log(`🗑️ Deleting likes for projectId: ${projectId}`);
                yield likeModel_1.likeModel.deleteMany({ projectId });
            }
            catch (err) {
                console.error("⚠️ Failed to process Kafka message:", err.message);
            }
        }),
    });
});
exports.startConsumer = startConsumer;
