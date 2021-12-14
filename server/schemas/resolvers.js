const { AuthenticationError } = require('apollo-server-express');
const { User, War } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('wars');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('wars');
    },
    wars: async (parent, { username }) => {
      const params = username ? { username } : {};
      return War.find(params).sort({ createdAt: -1 });
    },
    war: async (parent, { warId }) => {
      return War.findOne({ _id: warId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('wars');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addWar: async (parent, { city, date, time }, context) => {
      if (context.user) {
        const war = await War.create({
          city,
          date,
          time,
          warAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { wars: war._id } }
        );

        return war;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeWar: async (parent, { warId }, context) => {
      if (context.user) {
        const war = await War.findOneAndDelete({
          _id: warId,
          warAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { wars: war._id } }
        );

        return war;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addToWar: async (parent, { warId, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl, role }, context) => {
      if(context.user) {
        const username = context.user.username;
        const user = { username, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl }
        switch (role) {
          case 'tanks':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { tanks: user }},
              { new: true }
            );
          case 'mdps':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { mdps: user }},
              { new: true }
            );
          case 'prdps':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { prdps: user }},
              { new: true }
            );
          case 'erdps':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { erdps: user }},
              { new: true }
            );
          case 'healers':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { healers: user }},
              { new: true }
            );
          case 'artillery':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { artillery: user }},
              { new: true }
            );
          default: 
            return;
        }
      }
    },

    updateToWar: async(parent, { warId, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl, role }, context) => {
      if(context.user) {
        const username = context.user.username;
        const user = { username, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl }
        switch (role) {
          case 'tanks':
            await War.findOneAndUpdate(
              { _id: warId },
              { $pull: { tanks: { username: username } }},
            );
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { tanks: user }},
              { new: true }
            );
          case 'mdps':
            await War.findOneAndUpdate(
              { _id: warId },
              { $pull: { mdps: { username: username } }}
            )
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { mdps: user }},
              { new: true }
            );
          case 'prdps':
            await War.findOneAndUpdate(
              { _id: warId },
              { $pull: { prdps: { username: username } }}
            )
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { prdps: user }},
              { new: true }
            );
          case 'erdps':
            await War.findOneAndUpdate(
              { _id: warId },
              { $pull: { erdps: { username: username } }}
            )
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { erdps: user }},
              { new: true }
            );
          case 'healers':
            await War.findOneAndUpdate(
              { _id: warId },
              { $pull: { healers: { username: username } }}
            )
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { healers: user }},
              { new: true }
            );
          case 'artillery':
            await War.findOneAndUpdate(
              { _id: warId },
              { $pull: { artillery: { username: username } }}
            )
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { artillery: user }},
              { new: true }
            );
          default: 
            return;
        }
      }
    },

    changeRole: async (parent, { warId, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl, role }, context) => {
      if(context.user) {
        const username = context.user.username;
        const user = { username, charLvl, primaryWep, primaryWepLvl, secondaryWep, secondaryWepLvl }
        
        await War.findOneAndUpdate(
          { _id: warId },
          { $pull: { tanks: { username: username }, 
                     mdps: { username: username }, 
                     prdps: { username: username },
                     erdps: { username: username }, 
                     healers: { username: username }, 
                     artillery: { username: username } }}
        );

        switch (role) {
          case 'tanks':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { tanks: user }},
              { new: true }
            );
          case 'mdps':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { mdps: user }},
              { new: true }
            );
          case 'prdps':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { prdps: user }},
              { new: true }
            );
          case 'erdps':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { erdps: user }},
              { new: true }
            );
          case 'healers':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { healers: user }},
              { new: true }
            );
          case 'artillery':
            return War.findOneAndUpdate(
              { _id: warId},
              { $addToSet: { artillery: user }},
              { new: true }
            );
          default: 
            return;
        }
      }
    },
  },
};

module.exports = resolvers;
