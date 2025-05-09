import express from 'express';
import { indexView, getCountryByIdController, getAllCountriesController, createCountryController, createCountryView } from '../controllers/countryControllers.mjs'

const router = express.Router();

router.get('/', indexView)
router.get('/countries', getAllCountriesController)
router.get('/countries/edit/:id', getCountryByIdController)
router.get('/countries/create', createCountryView)
router.post('/countries/create', createCountryController)


export default router;