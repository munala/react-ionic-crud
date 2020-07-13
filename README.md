# ReqRes Consumer

This is a cross-platform mobile app I created to consume `reqres.in` REST API to demonstrate CRUD operations

## Setup

- Run `git clone https://github.com/munala/react-ionic-crud.git && cd react-ionic-crud`.
- Install Ionic CLI globally by running `npm install -g @ionic/cli`
- Run `npm install`.
- Create an `.env` inside the project's root folder and add `SKIP_PREFLIGHT_CHECK=true` to skip eslint package check incase you come across eslint issues.

## Running

- You need Xcode for iOS and Android Studio for android. On android make sure you connect your phone using usb and you have enabled `USB debugging` on your phone. An alternative would be to setup an Android Virtual Device on Android Studio.
- Follow [this](https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile) guide on how to run the app on both platforms. Note: You have to click on the `Run` button on Xcode or Android Studio to build the app on your device/simulator/emulator.
- If you have and android phone you can download the apk from [here](https://drive.google.com/file/d/1k4PKgtYK-Fv-yudqM43yvdwL1GxVbPXL/view?usp=sharing), install it and run the app.

## [reqres.in](req.res) limitations

- [reqres.in](req.res) uses mock data therefore do not expect any `POST`, `PUT` or `DELETE` request to save data. The api returns a fixed response for `GET` requests with the exception to `GET /resources` in which case it will return something different depending on the pagination parameters.

- Due to the above listed limitation you can only register using the email `eve.holt@reqres.in` and `pistol`, and you can login using the same email and any password.

- When creating a new user the api will return the same data that you attached in the request even though it has not saved it. It will however add a fixed id to the data. This user is added to the app's state and you will be able to see in the list of users. However since the api database is fixed, navigating to the user screen by tapping the new user will result in an API error since the user is not found after sending a `GET` request for this user.

## Reporting problems

If you find any problems please raise an issue [here](https://github.com/munala/react-ionic-crud/issues/new).
