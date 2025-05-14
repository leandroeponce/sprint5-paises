import express from 'express';
import { countryValidations, countrySanitizer } from '../validations/validateCountry.mjs'
import { indexView, getCountryByIdController, getAllCountriesController, createCountryController, createCountryView, updateCountryController, deleteCountryController} from '../controllers/countryControllers.mjs'


const router = express.Router();

router.get('/', indexView)
router.get('/countries', getAllCountriesController)
router.get('/countries/edit/:id', getCountryByIdController)
router.put('/countries/edit/:id', countryValidations, updateCountryController)
router.get('/countries/create', createCountryView)
router.post('/countries/create', countrySanitizer, countryValidations, createCountryController)
router.delete('/countries/:id', deleteCountryController)


export default router;