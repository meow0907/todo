const Model = require("./subactivity.model");
const activityModel = require("../activity/activity.model");

//CRUD

const create = async(payload)=>{
    const {activity} = payload;
    const activityData = await activityModel.findOne({_id: activity});
    if(!activityData) throw new Error ("Activity not found!");
    return await Model.create(payload);
};

const list = async()=>{
    return await Model.find();
};

const getById = async(id)=>{
    return await Model.findOne({_id: id});
};

const updateById = async(id, payload)=>{
    return await Model.findOneAndUpdate({_id:id}, payload);
};

const removeById = async(id)=>{
    return await Model.removeOne({_id: id});
};

module.exports = {create, list, getById, updateById, removeById};