const db = require('../config/connection');
const { User, Task, Status } = require('../models');

const userData = require('./user.json');
const taskData = require('./task.json');
const statusData = require('./status.json');

db.once('open', async () => {
    try {
      await User.deleteMany({});
      await User.create(userData);
  
      await Task.deleteMany({});
      await Task.create(taskData);

      await Status.deleteMany({});
      await Status.create(statusData);


      console.log('all done!');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });
  