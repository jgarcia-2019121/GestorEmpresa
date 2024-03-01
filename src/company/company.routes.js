'use strict'

import { Router } from 'express'
import {
    create,
    update,
    getCompany,
    getExperiences,
    getAZ,
    getZA,
    excelReport
} from './company.controller.js'

const api = Router()

api.post('/create', create);
api.put('/update:id', update);
api.get('/getCompany', getCompany);
api.get('/getExperiences', getExperiences);
api.get('/getExperiences', getExperiences);
api.get('/getAZ', getAZ);
api.get('/getZA', getZA);
api.get('/excelReport', excelReport)

export default api

