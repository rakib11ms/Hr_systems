const { validationResult } = require('express-validator');
const Designation = require('../models/DesignationModel');

const createDesignation = async (req, res) => {
    const { name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = {
            name: name,
        }

        const role = new Designation(data);
        await role.save();
        return res.json({
            status: 200,
            role: data
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllDesignationName = async (req, res) => {
    const allDesgination = await Designation.find({});
    return res.json({
        status: 200,
        allDesgination: allDesgination
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

module.exports={createDesignation,getAllDesignationName}