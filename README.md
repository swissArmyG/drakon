# PeaceofMindSpine.com ( React.js )

Built for an out of office spine specialist and for the clients who need a second-opinion spine analysis.

My business partner took care of the deployment, designs and being the point of contact. I offer ideas here and there, then researched and developed the web's fullstack, both backend and frontend frameworks, moving across data management, security features and user interface.

Written in Typescript Node as a backend with lightweight SQLite database and Knex query builder. React for the UX. The rest are dependencies as documented on the README.

The application is currently going through a few additional features- such as secret management with Docker container, and adding a certificate for the secure protocol and third-party OAuth integration.

## Scripts

### - Initial Configuration

  Run scripts `yarn && yarn dev`

### - Start Local Application

  Run scripts `yarn dev`

### - Development Phase

  #### Run `yarn build` when
  - Changes or see changes in tsconfig.json / webpack.config.js
  - Deploy to a production enviro

  #### Run `yarn` when
  - Changes or see changes in Package.json

  #### Run `yarn audit` and|or `yarn outdated` whenREA
  - Whenever you want to check dependency vulnerabilities && integrity respectively

  #### Run `yarn cache clean` when 
  - Whenever you want to clear local packages cache

## Frameworks
1. **React.js** : Flexible and performant web API framework

## Dependencies
For development and production stages

1. **axios** : Promised-based API requests in Node.js and the browser
2. **dotenv** : Environment loading module
2. **http-proxy-middleware** : For Node.js Proxy middleware
3. **sass**, **sass-loader**, **style-loader**, **css-loader** : Sassy CSS (Cascade Style Sheet) along with its loading-processing css in JavaScript
4. **react-router** & **react-router-dom** : On-demand client-side URL routing for faster and more dynamic user experiences
