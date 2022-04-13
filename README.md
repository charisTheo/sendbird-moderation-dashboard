# Sendbird Moderation Dashboard

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

> This is a sample app that acts as a moderation dashboard for all **reported items, like users, messages and channels**, within a Sendbird Application and any **profanity filtered messages** within both **Group and Open channels**.

_Built with the **Sendbird Platform API**. For more information about the API and its usage head to the [Report content and subject](https://sendbird.com/docs/chat/v3/platform-api/guides/report-content-and-subject) section of the Sendbird Platorm API Docs._

<p style="text-align: center">
  <img src="./demo-reports.png" alt="Dashboard reports page screenshot">
<p>
<p style="text-align: center">
  <img src="./demo-profanity.png" alt="Dashboard profanities page screenshot">
<p>

## Features

* List all reported items divided by users, messages and channels
* Filter reported items by date and type (_suspicious_, _harassing_, _inappropriate_, or _spam_)
* View profanity filtered messages in a channel
* Mute / Unmute reported users
* Ban / Unban reported users
* Delete reported messages
* Freeze / Unfreeze channels

## User authentication

> ⚠️ This dashboard can be used by Sendbird users and provides successfull authentication _only_ for Sendbird users that have `{moderator: "true"}` inside their metadata.

Head to [this part of the docs](https://sendbird.com/docs/chat/v3/platform-api/user/managing-metadata/user-create-metadata) on how to create and update user metadata.

## Development

### Download

```sh
git clone https://github.com/charisTheo/sendbird-moderation-dashboard.git
cd sendbird-moderation-dashboard
git checkout node-server-auth
```

### Install

```sh
npm i
cd web && npm i
```

### Run

#### From the root of the project

```sh
npm run dev
```

#### Within the `web/` directory

> Run this command inside an additional terminal to the above.

```sh
npm start
```

### Build

```sh
npm run build
```

> The output of the build command above will be under the `./web/build` directory.
