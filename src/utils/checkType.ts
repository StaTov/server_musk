import { CreateBenefit } from '../models/Benefits';


export const toBenefits = (obj: unknown): CreateBenefit => {
    if (!obj) throw new Error('missing data');
    if (typeof obj !== 'object') throw new Error('incorrect data');
    if ('stringOne' in obj && 'stringTwo' in obj && 'number' in obj) {
        if (isString(obj.stringOne) && isString(obj.stringTwo) && isNumber(obj.number)) {
            return {
                stringOne: obj.stringOne,
                stringTwo: obj.stringTwo,
                number: obj.number
            };
        }
    }
    throw new Error('incorrect data');
};


export const isString = (text: unknown): text is string => {
    if (typeof text === 'string') {
        return true;
    }
    return false;
};

export const isNumber = (text: unknown): text is number => {
    if (typeof text === 'number') {
        return true;
    }
    return false;
};