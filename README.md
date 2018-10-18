# AppPlaceholder
![react](https://img.shields.io/badge/React-16.4.2-blue.svg) ![TeamName](https://img.shields.io/badge/TeamName-%40%20OfficeDepot-red.svg)
 ![searchNav](https://img.shields.io/badge/SQS-%40.svg)![SQS](https://api.officedepot.io/badge-proxy/ecdev/buildStatus/icon?job=AppIdPlaceholder_react/sqs&.png) ![searchNav](https://img.shields.io/badge/SQM-%40.svg)![SQM](https://api.officedepot.io/badge-proxy/ecdev/buildStatus/icon?job=AppIdPlaceholder_react/sqm&.png) ![searchNav](https://img.shields.io/badge/PROD-%40.svg)![PROD](https://api.officedepot.io/badge-proxy/ecdev/buildStatus/icon?job=AppIdPlaceholder_react/master&.png)

Small description that gives a high level overview that should include: What does it do? Where is it used?

## Table of Contents

- [Project Info](#project-info)
- [Installation](#installation)
- [Performance](#performance)
- [Usage](#usage)
- [Custom Settings](#custom-settings)
- [Server Side Rendering](#server-side-rendering)
- [Questions? Ideas?](#questions-ideas)

## Project Info
---
### CSR
SQS: https://microappssq.officedepot.com/sqs/AppIdPlaceholder/index.html

SQM: https://microappssq.officedepot.com/sqm/AppIdPlaceholder/index.html

PROD: https://microapps.officedepot.com/AppIdPlaceholder/index.html

---

### SSR
SQS: https://dev.odplabs.com/services/sqs-AppIdPlaceholder

SQM: https://dev.odplabs.com/services/sqm-AppIdPlaceholder

PROD: https://api.officedepot.io/services/AppIdPlaceholder

---
### Jenkins
jenkins pipeline: https://deployment.odplabs.com/ecdev/job/AppIdPlaceholder_react

---

## Installation

Make a local copy of the repo and start the project:

```sh
git clone https://github.com/officedepot/AppIdPlaceholder.git && cd AppIdPlaceholder && git checkout sqm && git checkout sqs && git config core.hooksPath .githooks && npm install
```

```sh
git checkout -b [FEATURE_BRANCH_NAME]
npm start
```

## Performance

To test your apps performance install the chrome extension below, run the app from your local and in dev tools you should see a tab React Performance which will give you lots of good info about your app.
[Chrome Extension](https://chrome.google.com/webstore/detail/react-performance-devtool/fcombecpigkkfcbfaeikoeegkmkjfbfm)

For more info:
[React Perf Devtool](https://github.com/nitin42/react-perf-devtool)

Bundle analysis will be stored in build/test-reports/bundle-report.html folder after each build, you can use this to analyze your project.

## Usage

Input required and an example of the way to inject the properties into the app.
The following app requires the following `data-` attributes in the container `div#AppPlaceholder`.

- `[data-sku='314414']` | SkuId
- `[data-setting='OptionB']` | String

Feel free to add / remove any sections that aren't applicable to your project.

## Custom Settings

[Dev Environment only for security purposes] - To access the application externally, create an .env file at the root of your project and add line:

`DANGEROUSLY_DISABLE_HOST_CHECK=true`

You can then access your app at `https://[PC_NAME]:3000/` (eg: `https://c02vk13ghtdd:3000/`)

## Server Side Rendering

### Updating head / injecting scripts

To update things like script tags, css or change meta tags in the head of the page you can utilize React Helmet.

for full reference see: [React Helmet](https://github.com/nfl/react-helmet)

example:

```js
import { Helmet } from 'react-helmet';
```
```js
<Helmet
  title="My React AppPlaceholder"
  meta={[
    { property: 'description', content: 'Page Description Here' },
    { property: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    { property: 'theme-color', content: '#008f68' }
  ]}
  bodyAttributes={{
    class: 'foo bar'
  }}
/>
```

## Questions? Ideas?

Get in touch with %user-name% ([%user-email%](mailto:%user-email%))
