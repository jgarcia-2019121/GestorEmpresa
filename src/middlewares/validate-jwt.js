'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        let secretkey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if (!authorization) return res.status(401).send({ message: 'Unauthorized' })
        let { uid } = jwt.verify(authorization, secretkey)
        let user = await User.findOne({ _id: uid })
        if (!user) return res.status(404).send({ message: 'User not found - unathorized' })
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Invalid toke' })
    }
}