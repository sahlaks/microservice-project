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
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "kafka-admin",
    brokers: ["kafka:9092"],
});
const admin = kafka.admin();
const createTopics = () => __awaiter(void 0, void 0, void 0, function* () {
    yield admin.connect();
    console.log("✅ Connected to Kafka");
    yield admin.createTopics({
        topics: [
            { topic: "authenticated" },
            { topic: "project-deleted" },
            { topic: "project-liked" }
        ],
    });
    console.log("✅ Topics created successfully");
    yield admin.disconnect();
});
const runWithRetry = () => __awaiter(void 0, void 0, void 0, function* () {
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
        try {
            yield createTopics();
            break;
        }
        catch (err) {
            attempts++;
            console.error(`❌ Attempt ${attempts}: Failed to create topics — ${err.message}`);
            yield new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
    if (attempts === maxAttempts) {
        console.error("❌ Failed to create topics after max retries");
        process.exit(1);
    }
});
runWithRetry();
