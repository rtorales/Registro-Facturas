
const express = require('express');

const ContribuyentesService = require('../services/contribuyentes');
const ContribuyentesDBApi = require('../db/api/contribuyentes');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Contribuyentes:
 *        type: object
 *        properties:

 *          razonSocial:
 *            type: string
 *            default: razonSocial
 *          ruc:
 *            type: string
 *            default: ruc

 */

/**
 *  @swagger
 * tags:
 *   name: Contribuyentes
 *   description: The Contribuyentes managing API
 */

  /**
  *  @swagger
  *  /api/contribuyentes:
  *    post:
  *      security:
  *        - bearerAuth: []
  *      tags: [Contribuyentes]
  *      summary: Add new item
  *      description: Add new item
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              properties:
  *                data:
  *                  description: Data of the updated item
  *                  type: object
  *                  $ref: "#/components/schemas/Contribuyentes"
  *      responses:
  *        200:
  *          description: The item was successfully added
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Contribuyentes"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        405:
  *          description: Invalid input data
  *        500:
  *          description: Some server error
  */

router.post('/', async (req, res) => {
    await ContribuyentesService.create(req.body.data, req.currentUser, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
});

  /**
  *  @swagger
  *  /api/contribuyentes/{id}:
  *    put:
  *      security:
  *        - bearerAuth: []
  *      tags: [Contribuyentes]
  *      summary: Update the data of the selected item
  *      description: Update the data of the selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: Item ID to update
  *          required: true
  *          schema:
  *            type: string
  *      requestBody:
  *        description: Set new item data
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              properties:
  *                id:
  *                  description: ID of the updated item
  *                  type: string
  *                data:
  *                  description: Data of the updated item
  *                  type: object
  *                  $ref: "#/components/schemas/Contribuyentes"
  *              required:
  *                - id
  *      responses:
  *        200:
  *          description: The item data was successfully updated
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Contribuyentes"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.put('/:id', wrapAsync(async (req, res) => {
  await ContribuyentesService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  * @swagger
  *  /api/contribuyentes/{id}:
  *    delete:
  *      security:
  *        - bearerAuth: []
  *      tags: [Contribuyentes]
  *      summary: Delete the selected item
  *      description: Delete the selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: Item ID to delete
  *          required: true
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: The item was successfully deleted
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Contribuyentes"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.delete('/:id', wrapAsync(async (req, res) => {
  await ContribuyentesService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

  /**
  *  @swagger
  *  /api/contribuyentes:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Contribuyentes]
  *      summary: Get all contribuyentes
  *      description: Get all contribuyentes
  *      responses:
  *        200:
  *          description: Contribuyentes list successfully received
  *          content:
  *            application/json:
  *              schema:
  *                type: array
  *                items:
  *                  $ref: "#/components/schemas/Contribuyentes"
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Data not found
  *        500:
  *          description: Some server error
  */

router.get('/', wrapAsync(async (req, res) => {
  const filetype = req.query.filetype
  const payload = await ContribuyentesDBApi.findAll(
    req.query,
  );
  if (filetype && filetype === 'csv') {
    const fields = ['id','razonSocial','ruc',

        ];
    const opts = { fields };
    try {
      const csv = parse(payload.rows, opts);
      res.status(200).attachment(csv);
      res.send(csv)

    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(200).send(payload);
  }

}));

/**
 *  @swagger
 *  /api/contribuyentes/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Contribuyentes]
 *      summary: Count all contribuyentes
 *      description: Count all contribuyentes
 *      responses:
 *        200:
 *          description: Contribuyentes count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Contribuyentes"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/count', wrapAsync(async (req, res) => {
    const payload = await ContribuyentesDBApi.findAll(
        req.query,
        { countOnly: true }
    );

    res.status(200).send(payload);
}));

/**
 *  @swagger
 *  /api/contribuyentes/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Contribuyentes]
 *      summary: Find all contribuyentes that match search criteria
 *      description: Find all contribuyentes that match search criteria
 *      responses:
 *        200:
 *          description: Contribuyentes list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Contribuyentes"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await ContribuyentesDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

  /**
  * @swagger
  *  /api/contribuyentes/{id}:
  *    get:
  *      security:
  *        - bearerAuth: []
  *      tags: [Contribuyentes]
  *      summary: Get selected item
  *      description: Get selected item
  *      parameters:
  *        - in: path
  *          name: id
  *          description: ID of item to get
  *          required: true
  *          schema:
  *            type: string
  *      responses:
  *        200:
  *          description: Selected item successfully received
  *          content:
  *            application/json:
  *              schema:
  *                $ref: "#/components/schemas/Contribuyentes"
  *        400:
  *          description: Invalid ID supplied
  *        401:
  *          $ref: "#/components/responses/UnauthorizedError"
  *        404:
  *          description: Item not found
  *        500:
  *          description: Some server error
  */

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await ContribuyentesDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
