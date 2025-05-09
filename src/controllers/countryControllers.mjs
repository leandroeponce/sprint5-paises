import { getCountryById, getAllCountries, createCountry } from '../services/countryServices.mjs'
import { validationResult } from 'express-validator'

export async function indexView(req, res) {
    res.render('index', { error: [], data: {}, title: 'Inicio'})
}

export async function getAllCountriesController(req, res) {
    try {
        const countriesList =  await getAllCountries()
        res.render('dashboard', { countries: countriesList, title: 'DashBoard - Countries' })
    } catch (error) {
        
    }
}

export async function getCountryByIdController(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        const country = await getCountryById(id)
        console.log(country)
        if(!country) {
            return res.status(404).render('error', { message: 'Country not found' })
    }
    res.render('editCountry', { title: 'Edit Country', country, errores: [] })

    } catch(error) {
        res.status(500).render('error', { message: 'error getting country', error: error.message })
    }
}

export async function createCountryView(req, res) {
    res.render('createCountry', { errores: [], country: {}, title:'Crear País'})
}

export async function createCountryController(req, res) {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).render('createCountry', {errores: errores.array(), country: req.body, title: 'Crear País'})
    }

    try {
        console.log('Datos recibidos: ', req.body)
        const { countryName , countryCapital, countryBorders, countryArea, countryPopulation, countryGini, countryTimezones, creador } = req.body
        if(!countryName || !countryCapital || !countryBorders || !countryArea || !countryPopulation || !countryGini || !countryTimezones ) {
            return res.status(400).render('createCountry', { errores: [{msg:'Faltan datos obligatorios'}], country: req.body, title: 'Crear País' })
        }

        const country = await createCountry({
            name: {
                common: countryName,
                official: `${countryName} (Oficial)`
            },
            capital: countryCapital,
            borders: countryBorders.split(',').map(border => border.trim()),
            area: Number(countryArea),
            population: Number(countryPopulation),
            gini: {
                2021: Number(countryGini)
            },
            timezones: countryTimezones.split(',').map(timezone => timezone.trim()),
            creador:'Leandro'
        })
        res.render('success', { nombre: country.countryName, title: 'Country creadted successfully'})

    } catch (error) {
        res.status(500).render('error', { message: 'Error creating country', errores:[], title: 'Crear País' })
    }
}