/* eslint-disable */
const NodeHelper = require("node_helper");

const axios = require("axios");

module.exports = NodeHelper.create({
  async socketNotificationReceived(notification, payload) {
    if (notification === "GetTrains") {
      let data = {};
      try {
        let headers = {
          Authorization: `Basic ${Buffer.from(
            `${payload.username}:${payload.password}`
          ).toString("base64")}`
        };
        data.trainData = (
          await axios.get(
            `https://api.rtt.io/api/v1/json/search/${payload.origin}`,
            { headers }
          )
        ).data;
      } catch (error) {
        data.error = error;
      }

      this.sendSocketNotification("GetTrainsResult", data);
    }
  }
});
