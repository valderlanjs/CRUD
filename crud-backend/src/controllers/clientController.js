import * as clientService from "../services/clientServices.js";

// Listar os clientes existentes
export const getClients = async (req, res) => {
    try {
        const client = await clientService.getClients();
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({message: 'Erro ao buscar clientes', err});
    }
}

// criação de um novo cliente
export const createClient = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.createClient(clientData);
        res.status(201).json(newClient);
    } catch (err) {
        res.status(500).json({message: 'Este email já está cadastrado no sistema', err});
    }
}


// Atualização dos clientes
export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await clientService.updateClient(clientData, clientId);
        if (!updatedClient) {
            res.status(404).json({message: 'Cliente não encontrado'});
        }
        res.status(200).json(updatedClient)
    } catch (err) {
        res.status(500).json({message: 'Erro ao cadastrar cliente verifique os campos', err});
    }
}

// Exclusão de clientes 
export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClient(clientId);
        if (!deleted) {
            return res.status(404).json({ message: 'Cliente não encontrado'})
        }
        res.status(200).send();
    } catch (err) {
        res.status(500).json({message: 'Erro ao deletar cliente', err});
    }
}


//Busca do cliente

export const searchClients = async (req, res) => {
    try {
        const searchTerm = req.query.q; // 
        const clients = await clientService.searchClients(searchTerm);
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes" })
    }
};

