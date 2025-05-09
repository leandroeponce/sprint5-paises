import { getCountryById, getAllCountries, createCountry, updateCountry, deleteCountry } from '../services/countryServices.mjs'
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

        const country = await createCountry({
            name: {
                common: countryName,
                official: countryName,
                nativeName: {
                    spa: {
                        official: countryName,
                        common: countryName
                    }
                }
            },
            capital: countryCapital,
            languages: {
                spa: 'Spanish'
            },
            borders: countryBorders,
            area: Number(countryArea),
            population: Number(countryPopulation),
            gini: {
                2021: countryGini
            },
            timezones: countryTimezones.split(',').map(timezone => timezone.trim()),
            creador:'Leandro'
        })
        res.render('success', { nombre: country.countryName, title: 'Country creadted successfully'})

    } catch (error) {
        res.status(500).render('error', { message: 'Error creating country', error:[], title: 'Crear País' })
    }
}

export async function updateCountryController(req, res) {
    try {
        const { id } = req.params
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.status(400).render('editCountry', { errores: errores.array(), datos: {... req.body, _id: id}, title: 'Edit Country' })
        }
    
        const datos = {
            name: {
                common: req.body.countryName,
                official: req.body.countryName,
                nativeName: {
                    spa: {
                        official: req.body.countryName,
                        common: req.body.countryName
                    }
                }
            },
            capital: [req.body.countryCapital],
            languages: {
                spa: 'Spanish'
            },
            borders: req.body.countryBorders?.split(',').map(border => border.trim()),
            area: Number(req.body.countryArea), 
            population: Number(req.body.countryPopulation),
            gini: {
                2021: Number(req.body.countryGini)
            },
            timezones: req.body.countryTimezones?.split(',').map(timezone => timezone.trim()),
            creador: "Leandro"
        }

        const updatedCountry = await updateCountry(id, datos);

        if (!updatedCountry) {
            return res.status(404).render('error', { mensaje: 'País no encontrado', title: 'Edit Country'});
        }

        res.render('success', { nombre: updatedCountry.name.common, mensaje: 'País actualizado correctamente', title: 'Success'});

    } catch (error) {
        res.status(500).render('error', { message: 'Error editing country', errores:[], title: 'Edit Country' })
    }
}

export async function deleteCountryController(req, res) {
    try {
        const { id } = req.params
        const country = await deleteCountry(id)

        if (!country) {
            return res.status(404).render('error', { mensaje: 'País no encontrado' })
        }
        const countryView = country.toObject()
        res.render('deletedCountry', { nombre: countryView.name?.nativeName?.spa?.official, title: 'Country Deleted' })
    }
    catch (error)  {
        res.status(500).render('error', { mensaje: 'Error al eliminar el país', error: error.message })
    }
}