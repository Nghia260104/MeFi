# Welcome to MeFi

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
Link UI: [Mefi](<https://www.figma.com/design/INpo5899LHXfMBEpHP5Mm5/MEMO-(Copy)?node-id=105-1053&t=PX8zWoGqXYfEWmvn-1>) - Password: Mefi-123456

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### Step 1

When first pull the project to your personal workspace, please make sure that you have done the set up and then run

```bash
# using npm
npm install
```

Then link the custom font to your app using

```bash
npx react-native-asset
```

Then install the dependencies for the app

#### React Native reanimated

```bash
# install react-native-reanimated
npm install react-native-reanimated
```

Documentation: <https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started>

#### React Navigation

```bash
# install react-navigation
npm install @react-navigation/native
# install dependencies
npm install react-native-screens react-native-safe-area-context
```

Documentation: <https://reactnavigation.org/docs/getting-started/>

#### React font awesome - icon

```bash
# install fontawesome
npm i --save @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg
# install styles
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
```

Documentation: <https://docs.fontawesome.com/web/use-with/react-native>

#### DateTimePicker

```bash
# install datetimepicker
npm install @react-native-community/datetimepicker --save
```

Documentation: <https://www.npmjs.com/package/@react-native-community/datetimepicker#expo-users-notice>

#### React-native-calendar

```bash
# install react-native-calender
npm install --save react-native-calendars
```

Documentation: <https://www.npmjs.com/package/react-native-calendars/v/1.1286.0>

### date-fns

```bash
#install react-native date-fns
npm install date-fns --save
```

Documentation: <https://www.npmjs.com/package/date-fns>

### react-native-swiper

```bash
#install @react-native-swiper
npm i react-native-swiper --save
```

Documentation: <https://github.com/leecade/react-native-swiper>

### react-native/bottom-tabs

```bash
#install @react-native/bottom-tabs
npm install @react-navigation/bottom-tabs
```

Documentation: <https://reactnavigation.org/docs/bottom-tab-navigator/>

### lottie-react-native

```bash
#install lottie-react-native
npm install lottie-react-native
```

### @react-native-picker/picker

```bash
#install @react-native-picker/picker
npm install @react-native-picker/picker
```

#### MongoDB

```bash
# install driver for mongodb
npm install mongodb --save
```

#### Dependencies for MongoDB, Backend and api between front-end and back-end

```bash
npm install mongoose express cors axios react-native-dotenv jsonwebtoken bcrypt @react-native-google-signin/google-signin jwt-decode --save
```

#### Redux for global state management

```bash
npm install redux react-redux redux-thunk @reduxjs/toolkit --save
```

#### Async Storage for keeps user logged in

```bash
npm install @react-native-async-storage/async-storage --save
```

#### redux-persist

```bash
npm install redux-persist
```

#### Nodemailer for verification register code

```bash
npm install nodemailer googleapis @googleapis/docs --save
```

If you want code suggestions for nodejs modules, you can install @types/<modules_name> (Remember to check their installation first)

```bash
npm install --save @types/express # For express
# Do not install @types/mongoose because it has already included its own types in the package
```

If there are any other needed dependencies, I will add later!

### Step 2

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
npx react-native run-android
```

If that doesn't work try

```bash
npx react-native start --reset-cache
```

#### For iOS (try not to do this!!)

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
