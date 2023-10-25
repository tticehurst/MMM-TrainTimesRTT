/* eslint-disable */

Module.register("MMM-TrainTimesRTT", {
  defaults: {
    origin: "LDS",
    username: undefined,
    password: undefined,
    amount: 5,
    refreshTime: 5
  },

  __getData() {
    this.sendSocketNotification("GetTrains", {
      origin: this.config.origin,
      username: this.config.username,
      password: this.config.password
    });
  },

  start() {
    this.nunjucksEnvironment().addFilter("trainTime", (text) => {
      if (text) {
        return `${text.substr(0, 2)}:${text.substr(2)}`;
      }
    });

    this.nunjucksEnvironment().addFilter(
      "compareTime",
      (bookedTime, realTime, type) => {
        const parseTime = (timeStr) => {
          const [hoursStr, minutesStr] = timeStr.match(/\d{2}/g);
          const hours = parseInt(hoursStr, 10);
          const minutes = parseInt(minutesStr, 10);
          return hours * 60 + minutes;
        };

        if (bookedTime && realTime) {
          const bookedMinutes = parseTime(bookedTime);
          const realMinutes = parseTime(realTime);

          const timeDifference = realMinutes - bookedMinutes;

          if (timeDifference > 0) {
            return {
              text: "Late",
              class: timeDifference < 10 ? "orange" : "red"
            };
          } else if (timeDifference < 0) {
            return { text: "Early", class: "lightblue" };
          } else {
            return { text: "On Time", class: "green" };
          }
        } else {
          return { text: "On Time", class: "green" };
        }
      }
    );

    setTimeout(() => {
      setInterval(() => {
        this.__getData();
      }, this.config.refreshTime * 60000);
      this.__getData();
    }, 1000);
  },

  socketNotificationReceived(id, payload) {
    if (id === "GetTrainsResult") {
      this.payload = payload;

      this.updateDom(300);
    }
  },

  getTemplateData() {
    return {
      data: this.payload,
      config: this.config
    };
  },

  getScripts() {
    return ["moment.js"];
  },

  getTemplate() {
    return "TrainInfo.njk";
  },

  getStyles() {
    return ["trains.css"];
  }
});
