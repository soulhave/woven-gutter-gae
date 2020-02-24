

import * as express from 'express';
import {Application} from "express";
import { getAllCourses } from './server/get-features.route';
import { update } from './server/save-features.route';

// import {saveCourse} from './server/save-course.route';


const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/switch').get(getAllCourses);

app.route('/api/switch/:id').patch(update);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});



