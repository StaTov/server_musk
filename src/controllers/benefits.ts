import { createBenefit, deleteBenefitById, getBenefits } from '../models/BenefitsModel';
import { NextFunction, Request, Response } from 'express';
import { toBenefits } from '../utils/checkType';



export const getAll = async (_req: Request, res: Response,  next: NextFunction) => {
    try {
        const benefits = await getBenefits();
        res.status(200).json(benefits);
    } catch (err) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = toBenefits(req.body);
        const newBenefits = await createBenefit(data);
        res.status(201).json(newBenefits);
    } catch (err) {
        next(err);
    }
};

export const deleteBenefit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deleteBenefitById(id);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
};