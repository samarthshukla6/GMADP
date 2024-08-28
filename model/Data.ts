import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        donationDate: Date,
        name: String,
        city: String,
        state: String,
        purpose: String,
        donationType: String,
        amount: Number,
        donationNumber: Number,
        remarks: String,
        email: String,
    },
    { timestamps: { createdAt: 'receiptDate' } }
);

const Data = mongoose.models.Data || mongoose.model('Data', DataSchema);
export default Data;
