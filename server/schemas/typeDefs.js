const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    wars: [War]!
  }

  type WarEntry {
    _id: ID
    username: String!
    charLvl: String!
    primaryWep: String!
    primaryWepLvl: String!
    secondaryWep: String!
    secondaryWepLvl: String!
  }

  type War {
    _id: ID!
    city: String!
    date: String!
    time: String!
    warAuthor: String!
    tanks: [WarEntry]
    mdps: [WarEntry]
    prdps: [WarEntry]
    erdps: [WarEntry]
    healers: [WarEntry]
    artillery: [WarEntry]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    wars(username: String): [War]
    war(warId: ID!): War
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWar(city: String!, date: String!, time: String!): War
    removeWar(warId: ID!): War
    addToWar(warId: ID!, charLvl: String!, primaryWep: String!, primaryWepLvl: String!, secondaryWep: String!, secondaryWepLvl: String!, role: String!): War
    updateToWar(warId: ID!, charLvl: String!, primaryWep: String!, primaryWepLvl: String!, secondaryWep: String!, secondaryWepLvl: String!, role: String!): War
    changeRole(warId: ID!, charLvl: String!, primaryWep: String!, primaryWepLvl: String!, secondaryWep: String!, secondaryWepLvl: String!, role: String!): War
  }
`;

module.exports = typeDefs;
