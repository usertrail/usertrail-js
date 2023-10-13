<div align="center">
	<img src="https://usertrail.io/seo.jpg" alt="UserTrail"/>
	<br>
    <h1>UserTrail JS</h1>
</div>


## Installation

```sh
npm install usertrail-js
```

## Usage

### Import UserTrail

```js
import UserTrail from "usertrail-js";
```

### Create a new UserTrail client

```js
const usertrail = new UserTrail({
  key: <Your API key>
    });
```

### Track event

```js
usertrail.track({
  eventName: "User subscribed", 
  userId: "user-123-456"
});
```

### Identify user

You can set the user id on the client level. It will be sent with all events.
```js
// set user id once
usertrail.identify({
  userId: "user-123-456"
});

// send events, user id can be omitted from track()
usertrail.track({
  eventName: "Event 1",
});

usertrail.track({
  eventName: "Event 2",
});
```

or you can set the user id on the event level. It will be sent only with this event.
```js
usertrail.track({
  eventName: "User subscribed", 
  userId: "user-123-456" // will override the client user id if exists
});
```

### Updating user id
You can assign a new user id to an existing user. This will update the user data and events from the old user id to the new user id.
Useful when a user signs up, and you want to keep the events from the anonymous user.

```javascript
await usertrail.updateIdentity({
  userId: "user-id-1",
  newUserId: "user-id-2"
});
```
