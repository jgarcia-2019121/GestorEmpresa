'use strict'

import { Router } from 'express'
import {
    create,
    get,
    update
} from './company.controller.js'

const api = Router()

api.post('/create', create);
api.get('/get', get);
api.put('/update:id', update);

export default api

