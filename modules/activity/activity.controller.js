const model = require("./activity.model")
//CRUD

const create = async(payload)=>{
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
    return await model.findOneAndUpdate({_id: id}, payload, {new: true})  // new-> recent document pass garna

};
//if updatebyid ma status true aacha vane iscompleted lai true garne
// if false aacha vane 

const removeById = async(id)=>{
    return await model.deleteOne({_id: id});
};

module.exports = {create, getAll, list, getById, updateById, removeById} ;
