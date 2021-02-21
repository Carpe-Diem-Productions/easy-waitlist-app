# Easy Waitlist App

## See a demo here: https://easy-waitlist.web.app/

## Why Did I Create This

COVID-19 vaccines have a short shelf life once it's taken out of refrigerators. When
someone who is scheduled to receive the vaccine misses their appointment, that dose
might go into the waste bin if it's not injected before it expires. This app connects
people who want to receive the vaccine with clinics who have extra doses.

## How Does It Work

- Users can sign up on the waitlist and put in their name, age, zip code and phone number.
- Clinics (with verified accounts) can set a zip code search list, and with 1 click, let the
  web app call users.
  - The automated call will require users to pick up the phone and press a key to confirm
    that they can show up at the clinic right away.
  - Once the system has found enough users, it will display the contact information of all
    users who have picked up the call and confirmed. The clinic can then follow up with users
    directly.

## How Is It Built

### Stacks Used

- Firebase Authentication
- Firebase Real-time Database
- Firebase Cloud Functions
  - Including Twilio Programmable Voice API
- Create-React-App + Bootstrap

### Web App Portion

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**This project has NOT been ejected using `yarn eject`**

Your normal Create React App commands should work:

- `yarn start`
- `yarn test`
- `yarn build`
- `yarn eject`

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### Cloud Functions Portion

See `easy-waitlist-cloud-functions` repo.
