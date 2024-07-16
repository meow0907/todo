const{ Schema, model } = require("mongoose");
const {ObjectId} = Schema.Types;

const subactivitySchema = new Schema(
    {
        name:{type: String, required: true},
        description: { type: String },
        isCompleted:{type:Boolean, required: true, default:false},
        dueDate: { type: Date },
        activity: {type: ObjectId, ref: "Activity", required: true},
    },
    {
        timestamps: true,
    }
);

// Create indexes for frequently queried fields
subactivitySchema.index({ name: 1 });
subactivitySchema.index({ activity: 1 });

module.exports = new model("Subactivity", subactivitySchema);