const Data = require('../data');

const updateUser = (parent, { data, id }) => {
    //kaçıncı indexte olunduguna bakıldı
    const user_index = Data.users.findIndex((user) => user.id == id);

    if (user_index == -1) {
      throw new Error('404 User Not Found');
    }

    const updated_users = (Data.users[user_index] = {
      ...Data.users[user_index],
      ...data,
    });
    return updated_users;
}

const updateEvent = (parent, { data, id }) => {
    const event_index = Data.events.findIndex((event) => event.id == id);

    if (event_index == -1) {
      throw new Error('404 Event Not Found');
    }

    const updated_event = (Data.events[event_index] = {
      ...Data.events[event_index],
      ...data,
    });
    return updated_event;
  }

const updateLocation = (parent, { data, id }) => {
    const location_index = Data.locations.findIndex((locations) => locations.id == id);

    if (location_index == -1) {
      throw new Error('404 locations Not Found');
    }

    const updated_location = (Data.locations[location_index] = {
      ...Data.locations[location_index],
      ...data,
    });
    return updated_location;
  }

const updateParticipant = (parent, { data, id }) => {
    const Participant_index = Data.participants.findIndex((participants) => participants.id == id);

    if (Participant_index == -1) {
      throw new Error('404 participants Not Found');
    }

    const updated_Participant  = (Data.participants[Participant_index] = {
      ...Data.participants[Participant_index],
      ...data,
    });
    return updated_Participant;
}

module.exports={
    updateUser,
    updateEvent,
    updateLocation,
    updateParticipant
}