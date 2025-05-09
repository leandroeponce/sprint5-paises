import countryRepository from '../repositories/countryRepository.mjs'

export async function getCountryById(id) {
    return await countryRepository.getById(id)
}

export async function getAllCountries() {
    return await countryRepository.getAll()
}

export async function createCountry(data) {
    return await countryRepository.createCountry(data)
}