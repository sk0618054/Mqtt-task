const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

const dataToPublish = JSON.stringify({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
});

client.on("connect", () => {
  console.log("Connected to the MQTT broker");

  client.publish("myTopic", dataToPublish, (err) => {
    if (!err) {
      console.log("Message published successfully");
    } else {
      console.error("Failed to publish message:", err);
    }

    client.end();
  });
});
