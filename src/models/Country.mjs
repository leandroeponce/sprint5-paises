import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    name: { type: Object },
    independent: { type: Boolean },
    status: { type: String },
    unMember: { type: Boolean },
    currencies: { type: Object },
    capital: { type: Array },
    region: { type: String },
    subregion: { type: String },
    languages: { type: Object },
    latlng: { type: Array },
    landlocked: { type: Boolean },
    borders: { type: Array },
    area: { type: Number },
    flag: { type: String },
    maps: { type: Object },
    population: { type: Number },
    gini: { type: Object },
    fifa: { type: String },
    timezones: { type: Array },
    continents: { type: Array },
    flags: { type: Object },
    startOfWeek: { type: String },
    capitalInfo: { type: Object },
    creador: { type: String }
})

const country = mongoose.model('Country', countrySchema, 'Grupo-08');
export default country;