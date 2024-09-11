const express = require("express");
const mqtt = require("mqtt");
const path = require("path");
const app = express();

const MQTT_BROKER_URL = "mqtt://broker.hivemq.com:1883";
const MQTT_TOPIC = "myTopic";

// MQTT Broker connection
const mqttClient = mqtt.connect(MQTT_BROKER_URL);
let mqttData = [
  {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "9876543210",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "8765432109",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "7654321098",
  },
];

// Subscribe to a topic and store data
mqttClient.on("connect", () => {
  console.log("Connected to MQTT Broker");
  mqttClient.subscribe(MQTT_TOPIC, (err) => {
    if (!err) {
      console.log(`Subscribed to ${MQTT_TOPIC}`);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    mqttData.push(data);
    console.log("Data received from MQTT:", data);
  } catch (e) {
    console.error("Error parsing MQTT message:", e);
  }
});

// Express.js settings
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Main route to render the page
app.get("/", (req, res) => {
  res.render("index", { apiData: [], mqttData });
});

// Mock API endpoint (if needed for other purposes)
app.get("/api/data", (req, res) => {
  res.json({ mqttData });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
