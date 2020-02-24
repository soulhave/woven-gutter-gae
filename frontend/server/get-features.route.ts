import {Request, Response} from 'express';
import { FEATURES } from './db-data';



export function getAllCourses(req: Request, res: Response) {
    res.status(200).json(FEATURES);
}

// export function getCourseById(req: Request, res: Response) {

//     const courseId = req.params['id'];

//     const courses: any = Object.values(COURSES);

//     const course = courses.find(course => course.id == courseId);

//     res.status(200).json(course);
// }
