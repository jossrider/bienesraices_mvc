import express from 'express'
import { body } from 'express-validator'
import {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
} from '../controllers/propiedadController.js'
import protegerRuta from '../middleware/protegerRuta.js'
import upload from '../middleware/subirImagen.js'

const router = express.Router()

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear', protegerRuta, crear)
router.post(
  '/propiedades/crear',
  protegerRuta,
  body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio!!'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripcion no puede ir vacio!!')
    .isLength({ max: 200 })
    .withMessage('La descripcion es muy larga!!'),
  body('categoria').isNumeric().withMessage('Selecciona una categoria!!'),
  body('precio').isNumeric().withMessage('Selecciona un rango de precios!!'),
  body('habitaciones').isNumeric().withMessage('Selecciona una cantidad de habitaciones!!'),
  body('estacionamiento').isNumeric().withMessage('Selecciona una catidad de estacionamientos!!'),
  body('banio').isNumeric().withMessage('Selecciona una cantidad de baños!!'),
  body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa!!'),
  guardar,
)
router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen)
router.post('/propiedades/agregar-imagen/:id', protegerRuta, upload.single('imagen'), almacenarImagen)
router.get('/propiedades/editar/:id', protegerRuta, editar)
router.post(
  '/propiedades/editar/:id',
  protegerRuta,
  body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio!!'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripcion no puede ir vacio!!')
    .isLength({ max: 200 })
    .withMessage('La descripcion es muy larga!!'),
  body('categoria').isNumeric().withMessage('Selecciona una categoria!!'),
  body('precio').isNumeric().withMessage('Selecciona un rango de precios!!'),
  body('habitaciones').isNumeric().withMessage('Selecciona una cantidad de habitaciones!!'),
  body('estacionamiento').isNumeric().withMessage('Selecciona una catidad de estacionamientos!!'),
  body('banio').isNumeric().withMessage('Selecciona una cantidad de baños!!'),
  body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa!!'),
  guardarCambios,
)

router.post('/propiedades/eliminar/:id', protegerRuta, eliminar)

export default router
