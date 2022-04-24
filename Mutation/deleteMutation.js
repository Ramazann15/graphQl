const Data = require('../data');


const  deleteUser = (parent, { id }) => {
    const user_index = Data.users.findIndex((user) => user.id == id);

    if (user_index == -1) {
      throw new Error('404 User Not Found');
    }

    const deleted_user = Data.users[user_index];
    Data.users.splice(user_index, 1);
    return deleted_user;
  }

const deleteAllUser = () => {
    const length = Data.users.length;
    Data.users = [];
    return {
      count: length,
    };
  }


const deleteEvent = (parent, { id }) => {
    const event_index = Data.events.findIndex((events) => events.id == id);

    if (event_index == -1) {
      throw new Error('404 Event Not Found');
    }

    const deleted_event = Data.events[event_index];
    Data.users.splice(event_index, 1);
    return deleted_event;
  }

const deleteAllEvent =  () => {
    const length = Data.events.length;
    Data.events.splice(0, length);

    return {
      count: length,
    };
  }

const deleteLocation = (parent, { id }) => {
    const location_index = Data.locations.findIndex((locations) => locations.id == id);

    if (location_index == -1) {
      throw new Error('404 locations Not Found');
    }

    const deleted_locations = Data.locations[location_index];
    Data.locations.splice(location_index, 1);
    return deleted_locations;
  }

 
const deleteAllLocation =  () => {
    const length = Data.locations.length;
    Data.locations = [];
    return {
      count: length,
    };
  }

const deleteParticipant = (parent, { id }) => {
    const Participant_index = Data.participants.findIndex((participants) => participants.id == id);

    if (Participant_index == -1) {
      throw new Error('404 participants Not Found');
    }

    const deleted_Participant = Data.participants[Participant_index];
    Data.participants.splice(Participant_index, 1);
    return deleted_Participant;
  }
  
const deleteAllParticipant = () => {
    const length = Data.participants.length;
    Data.participants = [];
    return {
      count: length,
    };
  }

module.exports={
    deleteUser,
    deleteAllUser,
    deleteEvent,
    deleteAllEvent,
    deleteLocation,
    deleteAllLocation,
    deleteParticipant,
    deleteAllParticipant
} 

