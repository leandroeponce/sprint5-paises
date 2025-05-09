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

    async updateCountry(id, data) {
        const updatedCountry = await country.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        )
        console.log('Country updated: ', updatedCountry)
        return updatedCountry;
    }

    async deleteById(id) {
        console.log("lo que llega", id)
        if (!id) {
            throw new Error('El ID es requerido');
        }

        try {
            const deleteCountry = await country.findByIdAndDelete(id);

            if (!deleteCountry) {
                throw new Error(`No se encontró un país con el ID: ${id}`);
            }

            console.log('País eliminado:', deleteCountry);
            return deleteCountry;

        } catch (error) {
            console.error('Error al eliminar el país:', error.message);
            throw error;
        }
    }
}

export default new countryRepository()