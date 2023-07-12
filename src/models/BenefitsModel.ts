import { Schema, model } from 'mongoose';

interface Benefits {
    id: string,
    stringOne: string ;
    stringTwo: string ;
    number: string ;
}
export type CreateBenefit = Omit<Benefits, 'id'>;

const benefitsSchema = new Schema<Benefits>({
    stringOne: 'String',
    stringTwo: 'String',
    number: 'String',
});

const BenefitsModel = model<Benefits>('Benefits', benefitsSchema);

//methods

export const getBenefits = () => BenefitsModel.find({});
export const createBenefit = (values: CreateBenefit) => new BenefitsModel(values).save().then((user) => user.toObject());
export const deleteBenefitById = (id: string) => BenefitsModel.findOneAndDelete({ _id: id });