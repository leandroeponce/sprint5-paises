import country from "../models/Country.mjs";
import IRepository from "./IRepository.mjs"

class countryRepository extends IRepository {
    async getById(id) {
        return await country.findById(id)
    }

    async getAll(){
        return await country.find( { creador: 'Leandro', languages: { $exists: true } })
    }

    async createCountry(data){
        try {
            const newCountry = new country(data)
            const result = await newCountry.save()
            return result
        } catch (error) {
            console.error('Error saving country', error.message)
            throw error
        }
    }
}

export default new countryRepository()