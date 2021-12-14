const db = require('../config/connection');
const { User, War } = require('../models');
const userSeeds = require('./userSeeds.json');
const warSeeds = require('./warSeeds.json');

db.once('open', async () => {
  try {
    await War.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < warSeeds.length; i++) {
      const { _id, warAuthor } = await War.create(warSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: warAuthor },
        {
          $addToSet: {
            wars: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
