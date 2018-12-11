# Heart Rate Mediation Project Source Code

A collection of utilities and tools to publish a heartrate as sound with two participants along with an application to guide the user through the experience.

## Screenshots

![Connection Setup Screen](/screenshots/connectionsetup.png?raw=true "Connection Setup Screen")

![User Info Screen](/screenshots/userinfo.png?raw=true "User Information Screen")

## Folder Guide

* `arduino/` - arduino server code to upload heart rate (todo: rewrite)
* `audio/` - pure data patch (branched from lovelyheart) to synthesize heart beat sound
* `lighting/` - nodejs lighting utilities and midi-based cue server (todo: write interface code)
* `pulse/` - socket.io server to store data between the web client and the arduino client over serial (todo: use bluetooth?)
* `puppet/` - the vue.js client gui application meant to run on a landscape ipad to guide the experience (static, interfaces with the pulse server)
