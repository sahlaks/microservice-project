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
exports.connectProducer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'project-service',
    brokers: ['kafka:9092']
});
exports.producer = kafka.producer();
const connectProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    const maxAttempts = 5;
    let attempts = 0;
    while (attempts < maxAttempts) {
        try {
            yield exports.producer.connect();
            console.log("✅ Kafka producer connected");
            break; // Exit the loop if connected successfully
        }
        catch (err) {
            attempts++;
            console.error(`❌ Kafka producer connect failed (attempt ${attempts})`, err.message);
            if (attempts === maxAttempts) {
                console.error("❌ Max retry attempts reached. Could not connect to Kafka.");
                process.exit(1); // Or throw if you want to crash the service
            }
            yield new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        }
    }
});
exports.connectProducer = connectProducer;
