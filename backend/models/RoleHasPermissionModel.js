const mongoose = require('mongoose');

const RoleHasPermissionSchema = new mongoose.Schema({
  role_id: {type: mongoose.Schema.Types.ObjectId,ref:'Role'  },
  permission_id:{type: mongoose.Schema.Types.ObjectId,ref:'Permission' }


 
});

const RoleHasPermisssion = mongoose.model('RoleHasPermisssion', RoleHasPermissionSchema);

module.exports = RoleHasPermisssion;
