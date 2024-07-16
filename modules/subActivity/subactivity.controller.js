const SubactivityModel = require("./subactivity.model");
const activityModel = require("../activity/activity.model");

//CRUD

const create = async(payload)=>{
    const {activity} = payload;
    const activityData = await activityModel.findOne({_id: activity});
    if(!activityData) throw new Error ("Activity not found!");
    return await SubactivityModel.create(payload);
};

const list = async()=>{
    return await Model.find();
};



const getById = async(id)=>{
    return await Model.findOne({_id: id});
};


const updateById = async(id, payload)=>{
    const subActivityResult = await SubactivityModel.findOneAndUpdate({_id:id}, payload,{new:true
     });
     if (!subActivityResult.isCompleted){
        await activityModel.updateOne(
            {_id: subActivityResult.activity},
            {isCompleted:false}
        );
     }
     return subActivityResult;
};


//---------------------------------------------

// const removeById = async(id)=>{
//     return await Model.removeOne({_id: id});
// };

const removeById = async(id) => {
    const deletedSubactivity = await SubactivityModel.findOneAndDelete({ _id: id });
    if (!deletedSubactivity) throw new Error("Subactivity not found!");
    return deletedSubactivity;
};


module.exports = {create, list, getById, updateById, removeById};