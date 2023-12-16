const mongoose = require('mongoose');

const clientSkillMappingSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetailClient',
    required: true
  },    createdby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
createdon: {
    type: Date,
    default: Date.now
},
updatedby: {
    type: mongoose.Schema.Types.ObjectId,
},
updatedon: {
    type: Date,
    default: Date.now
},
deletedby: {
    type: mongoose.Schema.Types.ObjectId
},
deletedon: {
    type: Date
},
active: {
    type: Boolean,
    default:true,
    required: true
}

});

const ClientSkillMapping = mongoose.model('Client_Skill_Mapping', clientSkillMappingSchema);

module.exports = ClientSkillMapping;
