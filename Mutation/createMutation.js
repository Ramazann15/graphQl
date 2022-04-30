const { nanoid } = require('nanoid');
const Data = require('../data');
const pubSub = require("../pubSub")

const createUser = (parent, { data }) => {
    const user = {
      //otomatik id tanımlıyor
      id: nanoid(),
      ...data,
    };
    //Data usera eklendi
    Data.users.push(user);
    pubSub.publish("userCreated",{userCreated:user})
    return user;
}


const createEvent = (parent, { data }) => {
    const event = {
      id: nanoid(),
      ...data,
    };

    Data.events.push(event);
    pubSub.publish("eventCreated",{eventCreated:event})
    return event;
}


const createLocation = (parent, { data }) => {
    const location = {
      id: nanoid(),
      ...data,
    };

    Data.locations.push(location);
    return location;
}

const  createParticipant = (parent, { data }) => {
    const participant = {
      id: nanoid(),
      ...data,
    };

    Data.participants.push(participant);
    pubSub.publish("participantAdded",{participantAdded:participant})
    return participant;
}

module.exports={
    createUser,
    createEvent,
    createParticipant,
    createLocation
}