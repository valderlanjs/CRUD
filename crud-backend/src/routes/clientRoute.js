import express from 'express';

import * as clientController from "../controllers/clientController.js";

const router = express.Router();

router.get('/clients', clientController.getClients);
router.post('/clients', clientController.createClient); // criar cliente
router.put('/clients/:id', clientController.updateClient); // atualizar cliente
router.delete('/clients/:id', clientController.deleteClient); // deletar cliente
router.get('/clients/search', clientController.searchClients); // buscar os clientes

export default router;