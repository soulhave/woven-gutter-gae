import { Request, Response } from 'express';
import { FEATURES } from './db-data';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function saveCourse(req: Request, res: Response) {

    const id = req.params["id"],
        changes = req.body;

    console.log("Saving course", id, JSON.stringify(changes));

    res.status(200).json({});

}

export async function update(req: Request, res: Response) {
    const _id = req.params["id"], _changes = req.body;
    const _features: any = Object.values(FEATURES);
    const _idx = _features.findIndex(f => f.id == _id);
    FEATURES[_idx] = { ...FEATURES[_idx], ..._changes }
    await delay(500);
    console.log("Done!", FEATURES[_idx]);
    res.status(200).json(FEATURES[_idx]);

}
