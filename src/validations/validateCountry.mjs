import { body, validationResult } from 'express-validator'

export const countrySanitizer = [
    body('countryCapital')
    .customSanitizer((value)=>{
        if(value.includes(',')) {
            const array = value.split(',')
            return array
        }
        const array = [value]
        return array
    }),

    body('countryBorders')
        //se eliminan 1 o varios espeacios en blanco y se convierte a mayuscula
        .customSanitizer((value) => {
        const valueUppercase = value.replace(/\s+/g, '').toUpperCase()
        if(valueUppercase.includes(',')) {
            const array = valueUppercase.split(',')
            return array
        }
        const array = [valueUppercase]
        return array
    }),
]

export const countryValidations = [
    body('countryName')
        .trim()
        .notEmpty().withMessage('El nombre oficial del país es obligatorio')
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial del país debe tener entre 3 y 90 caracteres'),

    body('countryCapital')
        .trim()
        .notEmpty().withMessage('La capital del país es obligatoria')
        .isArray(),

    body('countryCapital.*')
        .isLength({ min: 3, max: 90 }),

    body('countryBorders')
        .optional({ nullable: true })
        .isArray(),

    body('countryBorders')
        .isLength({ min: 3, max: 3 }).withMessage('Cada frontera debe ser un código de 3 letras'),

    body('countryArea')
        .isFloat({ min: 0 }).withMessage('Área debe ser un número positivo'),

    body('countryPopulation')
        .isInt({ min: 0 }).withMessage('Población debe ser un número entero positivo'),

// Middleware para manejar los errores de validación
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
}
]
