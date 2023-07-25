const { validationResult } = require('express-validator');
const Role = require('../models/RoleModel');
const Permission = require('../models/PermissionModel');

const createRole = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const role = new Role(data);
        await role.save();
        return res.json({
            status: 200,
            role: data
        })
    }
    catch (err) {
        console.log(err)
    }

}

const getAllRoleName = async (req, res) => {
    const allRoles = await Role.find({});
    return res.json({
        status: 200,
        allRoles: allRoles
    })
}
const editRoleName = async (req, res) => {
    const editData = req.params.id;
    const role = await Role.find({ _id: editData });
    return res.json({
        status: 200,
        role: role
    })
}
const updateRole = async (req, res) => {
    const updateData = req.body
    const role = await Role.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    return res.json({
        status: 200,
        role: role
    })
}

const deleteRole = async (req, res) => {
    const role = await Role.findOneAndDelete({ _id: req.params.id }, { new: true });
    const allRoles = await Role.find({});

    return res.json({
        status: 200,
        allRoles: allRoles
    })
}



//permission functionality 

const createPermission = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const permission = new Permission(data);
        await permission.save();
        return res.json({
            status: 200,
            permission: data
        })
    }
    catch (err) {
        console.log(err)
    }

}

const getAllPermissionName = async (req, res) => {
    const allPermissions = await Permission.find({});
    return res.json({
        status: 200,
        allPermissions: allPermissions
    })
}
const editPermissionName = async (req, res) => {
    const editData = req.params.id;
    const permission = await Permission.find({ _id: editData });
    return res.json({
        status: 200,
        permission: permission
    })
}
const updatePermission = async (req, res) => {
    const updateData = req.body
    const permission = await Permission.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    return res.json({
        status: 200,
        permission: permission
    })
}

const deletePermission = async (req, res) => {
    const permission = await pPrmission.findOneAndDelete({ _id: req.params.id }, { new: true });
    const allPermissions = await Role.find({});

    return res.json({
        status: 200,
        allPermissions: allPermissions
    })
}




module.exports = { createRole, getAllRoleName, editRoleName, updateRole, deleteRole, createPermission, getAllPermissionName, editPermissionName, updatePermission, deletePermission }