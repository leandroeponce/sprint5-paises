import { connectDB } from './config/dbConfig.mjs'
import country from './models/Country.mjs'

connectDB()

function cleanCountryProperties(country) {
    if(!country.languages || !Object.values(country.languages).includes('Spanish')) {
        return null
    }

    return {
        name: country.name,
        independent: country.independent,
        status: country.status,
        unMember: country.unMember,
        currencies: country.currencies,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
        languages: country.languages,
        latlng: country.latlng,
        landlocked: country.landlocked,
        borders: country.borders,
        area: country.area,
        flag: country.flag,
        maps: country.maps,
        population: country.population,
        gini: country.gini,
        fifa: country.fifa,
        timezones: country.timezones,
        continents: country.continents,
        flags: country.flags,
        startOfWeek: country.startOfWeek,
        capitalInfo: country.capitalInfo,
        creador: 'Leandro'
    }
}

export async function getCountries() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all")
        const countries = await res.json()

        const spanishCountries = countries.map(country => cleanCountryProperties(country)).filter(country => country !== null)
        //console.log('Paises que hablan español', spanishCountries)

        const result = await country.insertMany(spanishCountries)
        console.log('Paises guardados correctamente')

    } catch (error) {
        console.error("Error al obtener los paises", error)
    }
}

//getCountries()