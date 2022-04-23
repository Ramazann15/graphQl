const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const Data = require('./data');

const typeDefs = gql`

    type User{
        id:ID!
        username:String!
        email:String!
        event:[Event!]!
    }

    type Event{
        id:ID!
        title:String!
        desc:String!
        date : String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
        participant:[Participant!]!
        user:User!
        location:Location!
    }

    type Location{
        id:ID!
        name:String!
        desc:String!
        lat:Float!
        ing:Float!
    }

    type Participant {
        id:ID!
        user_id:ID!
        event_id:ID!
        user:[User!]!
    }

    type  Query{
        #User
        users:[User!]!
        user(id:ID!):User!


        #Event
        events:[Event!]!
        event(id:ID!):Event!
        
       


        #Location
        locations:[Location!]!
        location(id:ID!):Location!

        #Participant
        participants:[Participant!]!
        participant(id:ID!):Participant!

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
  Event:{
    user: (parent, args) => Data.users.find((user) => user.id === parent.user_id),
    location: (parent, args) =>Data.locations.find((location) => location.id === parent.location_id),
    participant: (parent, args) =>Data.participants.filter((participant) => participant.event_id === parent.id),
  },
  User: {
    event: (parent, args) =>Data.events.filter((event) => event.user_id === parent.id),
  },
  Participant: {
    user: (parent, args) => Data.users.filter((user) => user.id === parent.user_id),
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
  console.log('Server started on ' + url);
});
