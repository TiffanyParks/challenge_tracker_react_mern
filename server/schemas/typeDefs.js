const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  name: String
  email: String
  password: String
}
type Task {
  _id: ID
  name: String
}
type Status {
  _id: ID
  active: Boolean
  completed: Boolean
}
type Query {
  users: [User]
  tasks: [Task]
  statuses: [Status]
}
`;

module.exports = typeDefs;
