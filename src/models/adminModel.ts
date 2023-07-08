import { Schema, model } from 'mongoose';

export interface LoginAdmin {
    email: string,
    password: string,
    token?: string, 
}


const adminSchema = new Schema<LoginAdmin>(
    {
        email: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
            select: false,
        },
        token: {
            type: 'string',
            select: false,
        }
    });

const AdminModel = model<LoginAdmin>('Admin', adminSchema);

export const getAdminBySessionToken = (token: string) => AdminModel.findOne({ token });
export const getAdminByEmail = (email: string) => AdminModel.findOne({ email });
export const getAdminByPassword = (password: string) => AdminModel.findOne({ password });
export const createAdmin = (obj: LoginAdmin) => new AdminModel(obj).save().then(admin => admin.toObject());