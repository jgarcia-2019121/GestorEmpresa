import { Schema, model } from 'mongoose';

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    businessCategory: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false
});

export default model('company', companySchema)