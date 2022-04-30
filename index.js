const { createServer , createPubSub  } = require('graphql-yoga');
const {withFilter} = require("graphql-subscriptions")
const { nanoid } = require('nanoid');

const Data = require('./data');
const {createUser,createEvent,createParticipant,createLocation}= require("./Mutation/createMutation");
const {updateUser,updateEvent,updateLocation,updateParticipant} = require("./Mutation/UpdateMutation")
const {deleteUser,deleteAllUser,deleteEvent, deleteAllEvent,deleteLocation, deleteAllLocation,deleteParticipant,deleteAllParticipant} = require("./Mutation/deleteMutation")
const pubSub = require("./pubSub")

const typeDefs = `
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

  #Subscription 

  type Subscription {
    userCreated:User!
    eventCreated:Event!
    participantAdded:Participant!
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
  Subscription:{
    userCreated:{
      subscribe:()=>pubSub.asyncIterator("userCreated")
    },
    eventCreated:{
      subscribe:()=>pubSub.asyncIterator("eventCreated")
    },
    participantAdded:{
      subscribe:()=>pubSub.asyncIterator("participantAdded")
    }
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
    createUser:createUser,

    //event
    createEvent: createEvent,

    //Location
    createLocation:createLocation,

    //Participant
    createParticipant:createParticipant,

    //UPDATE

    //user
    updateUser: updateUser,

    //Event
    updateEvent: updateEvent,

    //Location
    updateLocation: updateLocation,

    //Participant 
    updateParticipant: updateParticipant,

    //DELETE
    //user
    deleteUser: deleteUser,
    deleteAllUser: deleteAllUser,

    //event
    deleteEvent: deleteEvent,
    deleteAllEvent:deleteAllEvent,

    //Location
    deleteLocation: deleteLocation,
    deleteAllLocation:deleteAllLocation,

    //Participant
    deleteParticipant: deleteParticipant,
    deleteAllParticipant: deleteAllParticipant
  },
};


const server = createServer({
  schema:{ typeDefs, resolvers , context:{pubSub} },
})

server.start()