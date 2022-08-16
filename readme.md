# A live train departure module making use of the RTT api

# To use this module you must make an account at https://api.rtt.io/ to get the required credentials for the api

## Install

- Change into your modules directory (Example):

  - `cd ~/MagicMirror/Modules`

- Clone the module into that folder:

  - `git clone https://github.com/tticehurst/TomTrains.git`

- Change into the new module directory:

  - `cd TomTrains`

- Install the required dependencies for the module:
  - `npm install`

## Config

| Option   | Description                                     | Example            |
| -------- | ----------------------------------------------- | ------------------ |
| origin   | The station to get departures and arrivals from | `origin: "lds"`    |
| username | Your username for the RTT api                   | `username: "abcd"` |
| password | Your password for the RTT api                   | `password: "abcd"` |
| amount   | The amount of trains to display                 | `amount: "5"`      |

## Example

![example image](https://i.imgur.com/IlyZEvT.png)
