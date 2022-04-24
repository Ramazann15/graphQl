const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const { nanoid } = require('nanoid');

const Data = require('./data');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    event: [Event!]!
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    participant: [Participant!]!
    user: User!
    location: Location!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    ing: Float!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: [User!]!
  }

  type DeleteAllOutput {
    count: Int!
  }

  #INPUT
  #user
  input createUserInput {
    username: String!
    email: String!
  }

  input updateUserInput {
    username: String
    email: String
  }

  #event
  input createEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  input updateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  # Location
  input createLocationInput {

    name: String!
    desc: String!
    lat: Float!
    ing: Float!
  }

  input updateLocationInput {

    name: String
    desc: String
    lat: Float
    ing: Float
  }

  #Participant
  input createParticipantInput{

    user_id: ID!
    event_id: ID!
  }

  input updateParticipantInput{
  
    user_id: ID
    event_id: ID
  }

  type Query {
    #User
    users: [User!]!
    user(id: ID!): User!

    #Event
    events: [Event!]!
    event(id: ID!): Event!

    #Location
    locations: [Location!]!
    location(id: ID!): Location!

    #Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }

  type Mutation {
    #User
    createUser(data: createUserInput): User!
    updateUser(id: ID!, data: updateUserInput): User!
    deleteUser(id: ID!): User!
    deleteAllUser: DeleteAllOutput!

    #Event
    createEvent(data: createEventInput): Event!
    updateEvent(id: ID!, data: updateEventInput): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvent: DeleteAllOutput!

    #Location
    createLocation(data: createLocationInput): Location!
    updateLocation(id: ID!, data: updateLocationInput): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocation: DeleteAllOutput!

    #Participant
    createParticipant(data: createParticipantInput): Participant!
    updateParticipant(id: ID!, data: updateParticipantInput): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipant: DeleteAllOutput!
  }
`;

const resolvers = {
  Query: {
    //User
    users: () => Data.users,
    user: (parent, args) => Data.users.find((user) => user.id == args.id),

    //Event
    events: () => Data.events,
    event: (parent, args) => Data.events.find((event) => event.id == args.id),

    //Location
    location: () => Data.locations,
    location: (parent, args) =>
      Data.locations.find((location) => location.id == args.id),

    //Participant
    participants: () => Data.participants,
    participant: (parent, args) =>
      Data.participants.find((participant) => participant.id == args.id),
  },
  Event: {
    user: (parent, args) =>
      Data.users.find((user) => user.id === parent.user_id),
    location: (parent, args) =>
      Data.locations.find((location) => location.id === parent.location_id),
    participant: (parent, args) =>
      Data.participants.filter(
        (participant) => participant.event_id === parent.id
      ),
  },
  User: {
    event: (parent, args) =>
      Data.events.filter((event) => event.user_id === parent.id),
  },
  Participant: {
    user: (parent, args) =>
      Data.users.filter((user) => user.id === parent.user_id),
  },

  Mutation: {
    // CREATE
    //user
    createUser: (parent, { data }) => {
      const user = {
        //otomatik id tanımlıyor
        id: nanoid(),
        ...data,
      };
      //Data usera eklendi
      Data.users.push(user);
      return user;
    },

    //event
    createEvent: (parent, { data }) => {
      const event = {
        id: nanoid(),
        ...data,
      };

      Data.events.push(event);
      return event;
    },

    //Location
    createLocation: (parent, { data }) => {
      const location = {
        id: nanoid(),
        ...data,
      };

      Data.locations.push(location);
      return location;
    },
    //Participant
    createParticipant:(parent, { data }) => {
      const participant = {
        id: nanoid(),
        ...data,
      };

      Data.participants.push(participant);
      return participant;
    },

    //UPDATE
    //user
    updateUser: (parent, { data, id }) => {
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
    },


    //Event
    updateEvent: (parent, { data, id }) => {
      const event_index = Data.events.findIndex((event) => event.id == id);

      if (event_index == -1) {
        throw new Error('404 Event Not Found');
      }

      const updated_event = (Data.events[event_index] = {
        ...Data.events[event_index],
        ...data,
      });
      return updated_event;
    },

    //Location
    updateLocation: (parent, { data, id }) => {
      const location_index = Data.locations.findIndex((locations) => locations.id == id);

      if (location_index == -1) {
        throw new Error('404 locations Not Found');
      }

      const updated_location = (Data.locations[location_index] = {
        ...Data.locations[location_index],
        ...data,
      });
      return updated_location;
    },

    //Participant 
    updateParticipant: (parent, { data, id }) => {
      const Participant_index = Data.participants.findIndex((participants) => participants.id == id);

      if (Participant_index == -1) {
        throw new Error('404 participants Not Found');
      }

      const updated_Participant  = (Data.participants[Participant_index] = {
        ...Data.participants[Participant_index],
        ...data,
      });
      return updated_Participant;
    },

    //DELETE
    //user
    deleteUser: (parent, { id }) => {
      const user_index = Data.users.findIndex((user) => user.id == id);

      if (user_index == -1) {
        throw new Error('404 User Not Found');
      }

      const deleted_user = Data.users[user_index];
      Data.users.splice(user_index, 1);
      return deleted_user;
    },
    deleteAllUser: () => {
      const length = Data.users.length;
      Data.users = [];
      return {
        count: length,
      };
    },

    //event
    deleteEvent: (parent, { id }) => {
      const event_index = Data.events.findIndex((events) => events.id == id);

      if (event_index == -1) {
        throw new Error('404 Event Not Found');
      }

      const deleted_event = Data.events[event_index];
      Data.users.splice(event_index, 1);
      return deleted_event;
    },

    deleteAllEvent: () => {
      const length = Data.events.length;
      Data.events.splice(0, length);

      return {
        count: length,
      };
    },

    //Location
    deleteLocation: (parent, { id }) => {
      const location_index = Data.locations.findIndex((locations) => locations.id == id);

      if (location_index == -1) {
        throw new Error('404 locations Not Found');
      }

      const deleted_locations = Data.locations[location_index];
      Data.locations.splice(location_index, 1);
      return deleted_locations;
    },

    deleteAllLocation: () => {
      const length = Data.locations.length;
      Data.locations = [];
      return {
        count: length,
      };
    },

    //Participant
    deleteParticipant: (parent, { id }) => {
      const Participant_index = Data.participants.findIndex((participants) => participants.id == id);

      if (Participant_index == -1) {
        throw new Error('404 participants Not Found');
      }

      const deleted_Participant = Data.participants[Participant_index];
      Data.participants.splice(Participant_index, 1);
      return deleted_Participant;
    },
    deleteAllParticipant: () => {
      const length = Data.participants.length;
      Data.participants = [];
      return {
        count: length,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log('🚀 Server started on ' + url);
});
