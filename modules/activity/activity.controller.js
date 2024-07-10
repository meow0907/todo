const model = require("./activity.model")
//CRUD

const create = async(payload)=>{
    return await model.create(payload);
};

const list = async()=>{
    return await model.find();
};

const getById =async(id)=>{
    return await model.findOne({_id: id});
};

const updateById =async(id, payload)=>{
    return await model.findOneAndUpdate({_id: id}, payload, {new: true})  // new-> recent document pass garna

};

const removeById = async(id)=>{
    return await model.deleteOne({_id: id});
};

module.exports = {create, list, getById, updateById, removeById};

