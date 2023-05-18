const { User, Task, Status } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
    return await User.find({});
  },
  tasks: async () => {
    return await Task.find({});
  },
  statuses: async () => {
    return await Status.find({});
  }
  }
};
module.exports = resolvers;