const { Schema, model } = require('mongoose');

const weaponSchema = new Schema({

main: {
  type: String,
},
mainLvl: {
  type: String,
},
secondary: {
  type: String,
},
secondaryLvl: {
  type: String,
},
});

const WeaponClasses = model('WeaponClasses', weaponSchema)

module.exports = WeaponClasses;