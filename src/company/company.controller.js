'use strict'

import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'
import Company from './company.model.js'

export const test = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'test function is running' })
}

export const create = async (req, res) => {
    try {
        let data = req.body
        let user = await User.findOne({ _id: data.user })
        if (!user) return res.status(404).send({ message: 'User not found' })
        let company = new Company(data)
        await company.save()
        return res.send({ message: 'Company saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving company' })
    }
}

export const get = async (req, res) => {
    try {
        let companies = await Company.find()
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting companies' })
    }
}

export const update = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        let updatedCompany = await Company.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeper', ['name', 'phone'])
        if (!updatedCompany) return res.status(404).send({ message: 'Company not found and not updated' })
        return res.send({ message: 'Company updated successfully', updatedCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating company' })
    }
}

export const deleteC = async (req, res) => {
    try {
        let { id } = req.params
        let deletedCompany = await Company.deleteOne({ _id: id })
        if (deletedCompany.deletedCount === 0) return res.status(404).send({ message: 'Company not found and not deleted' })
        return res.send({ message: 'Deleted company successfully' })
    } catch (err) {
        console.error(err)
        return res.status(404).send({ message: 'Error deleting company' })
    }
}