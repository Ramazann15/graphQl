const { nanoid } = require('nanoid');
const Data = require('../data');

const createUser = (parent, { data }) => {
    const user = {
      //otomatik id tanımlıyor
      id: nanoid(),
      ...data,
    };
    //Data usera eklendi
    Data.users.push(user);
    return user;
}


const createEvent = (parent, { data }) => {
    const event = {
      id: nanoid(),
      ...data,
    };

    Data.events.push(event);
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
    return participant;
}

module.exports={
    createUser,
    createEvent,
    createParticipant,
    createLocation
}