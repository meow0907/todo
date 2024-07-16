const { Model } = require("mongoose");
const model = require("./activity.model");
const subactivityModel = require("../subActivity/subactivity.model");
//CRUD

const create = async(payload)=>{
    // payload.createdAt = new Date();
    // payload.updatedAt = new Date();

    return await model.create(payload);
};

const getAll = async(payload)=>{
    //aggregration pipeline
    // return await model.aggregate(
    //     [
    //         {
    //           '$lookup': {
    //             'from': 'subactivities', 
    //             'localField': '_id', 
    //             'foreignField': 'activity', 
    //             'as': 'subactivities'
    //           }
    //         }
    //       ]
    // );
    const { status} = payload;
    const query = [];

    if (status){
        query.push({
            $match: {
                'isCompleted': status ==="pending"? false: status === "completed"?true:null,
              },
        });
    }
        query.push({
            $lookup: {
                from: 'subactivities', 
                localField: '_id', 
                foreignField: 'activity', 
                as: 'subactivities',
        },
 } );
           return await model.aggregate(query);
}

const list = async()=>{
    return await model.find();
};

const getById =async(id)=>{
    return await model.findOne({_id: id});
};

const updateById =async(id, payload)=>{
    const activityResult = await model.findOneAndUpdate({_id: id}, payload, {
        new:true,    // new-> recent document pass garna
    });
    if(!activityResult) throw new Error("Activity Update Failed");
    if (activityResult.isCompleted){
        await subactivityModel.updateMany(
           { activity: activityResult._id},
        { isCompleted:true}
    );
    }
    return activityResult;
};
//if updatebyid ma status true aacha vane iscompleted lai true garne
// if false aacha vane --------------


//----------------------------------------------------------------------------
const removeById = async(id)=>{
    return await model.deleteOne({_id: id});
};

module.exports = {create, getAll, list, getById, updateById, removeById} ;
