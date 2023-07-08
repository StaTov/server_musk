import { CreateBenefit } from '../models/BenefitsModel';
import { LoginAdmin } from '../models/adminModel';


export const toToken = (token: unknown) => {
    if(!token){
        throw new Error('missing Token');
    }
    if(isString(token)){
        return token;
    } 
    throw new Error('Invalid Token');
};

export const toLoginAdmin = (obj: unknown): LoginAdmin => {
    if (!obj || typeof obj !== 'object') throw new Error('incorrect data');
    if ('email' in obj && 'password' in obj) {
        if (isString(obj.email) && obj.email.includes('@') && isString(obj.password)) {
            return {
                email: obj.email.trim(),
                password: obj.password.trim()
            };
        }
    }
    throw new Error('incorrect data');
};

export const toBenefits = (obj: unknown): CreateBenefit => {
    if (!obj || typeof obj !== 'object') throw new Error('incorrect data');
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