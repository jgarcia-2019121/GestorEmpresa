'use strict'

import Company from "./company.model.js"
import ExcelJS from 'exceljs'

//Agregar
export const create = async (req, res) => {
    try {
        let data = req.body
        let company = new Company(data)
        await company.save()
        return res.send({ message: `Company created succesfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'The company could not be added' })
    }
}

//Actualizar
export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedCompany = await Company.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedCompany) return res.status(404).send({ message: 'Company not updated' })
        return res.send({ message: `Company ${updatedCompany.nameCompany}  updated` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating company' })
    }
}

//Obtener 
export const get = async (req, res) => {
    try {
        let companies = await Company.find()
        return res.send({ companies })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'company not found' })
    }
}

//Experiencia
export const getExperiences = async (req, res) => {
    try {
        let data = req.body
        let companyYears = await Company.find({ experienceYears: data.experienceYears })
        return res.send({ companyYears })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Companies not found' })
    }
}

//Busca empresas por categoria
export const getCategory = async (req, res) => {
    try {
        let { id } = req.body
        let company = await Company.find({ _category: id }).populate('category', ['name'])
        if (!company) return res.status(404).send({ message: 'Companies not exist' });
        return res.send({ company });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Companies not found' });
    }
}

//Ordena en orden de A a Z
export const getAZ = async (req, res) => {
    try {
        let az = await Company.find().sort({ nameCompany: +1 })
        return res.send({ az });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Not found companies' });
    }
}

//Ordena en orden de Z a A
export const getZA = async (req, res) => {
    try {
        let za = await Company.find().sort({ nameCompany: -1 })
        return res.send({ za })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: ' Not found companies' })
    }
}

export const excelReport = async (req, res) => {
    try {
        let companies = await Company.find().populate('category', ['nameCategory', 'description']);
        //crea el exel y agrega la hoja 
        let book = new ExcelJS.Workbook();
        let worksheet = book.addWorksheet('Companies');
        worksheet.columns = [
            { header: 'name', key: 'nameCompany', width: 20 },
            { header: 'category', key: 'nameCategory', width: 20 },
            { header: 'Description', key: 'description', width: 40 }
        ];
        companies.forEach(company => {
            worksheet.addRow({
                nameCompany: company.nameCompany,
                nameCategory: company.category.nameCategory,
                description: company.category.description
            });
        });
        let filePath = 'CompanyExcel.xlsx';
        await book.xlsx.writeFile(filePath);
        // establece la cabecera de la respuesta HTTP para que el navegador descargue el archivo Excel
        res.attachment(filePath);
        res.send();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error generating Excel', error: error });
    }
}
