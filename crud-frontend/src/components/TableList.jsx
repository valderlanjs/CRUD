import axios from 'axios';
import { useState } from 'react';

export default function TableList({ handleOpen, searchTerm, tableData, setTableData }) {
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedClientId, setSelectedClientId ] = useState(null); // Armazena o ID cliente selecionado para exclusão

    // Filtrar os dados de tableData com base em searchTerm
    const filteredData = tableData.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
            try {
                await axios.delete(`http://localhost:3000/api/clients/${selectedClientId}`);
                setTableData((prevData) => prevData.filter(client => client.id !== selectedClientId))
                setConfirmDelete(false) // Fechar o alerta de confirmação
                setSelectedClientId(null) // Limpa o cliente selecionado
            } catch (error) {
                setError(error.message)
            }
    };

    const openDeleteConfirmation = (id) => {
        setSelectedClientId(id); // define o ID do cliente a ser deletado
        setConfirmDelete(true); // mostra a mensagem de confirmação
    };

    const closeDeleteConfirmation = () => {
        setConfirmDelete(false); // Fecha a mensagem de confirmação
        setSelectedClientId(null); // Limpa o cliente selecionado
    }

    return (
        <>
            {confirmDelete && (<div role="alert" className="alert bg-red-700">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info h-6 w-6 shrink-0">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Tem certeza que deseja deletar este funcionário?</span>
                <div>
                    <button className="btn btn-sm mr-2" onClick={closeDeleteConfirmation}>Não</button>
                    <button className="btn btn-sm btn-primary" onClick={handleDelete}>Sim</button>
                </div>
            </div>)}
            
            {error && <div className='alert alert-error'>{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table w-full"> 
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>ID</th>
                            <th className='px-4 py-2 text-left text-sm font-medium'>Nome</th>
                            <th className='px-4 py-2 text-left text-sm font-medium'>Email</th>
                            <th className='px-4 py-2 text-left text-sm font-medium'>Cargo</th>
                            <th className='px-4 py-2 text-left text-sm font-medium'>Salário</th>
                            <th className='px-4 py-2 text-left text-sm font-medium'>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {/* row 1 */}
                        {filteredData.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-700 transition-all">
                                <th className="px-4 py-2 text-sm">{client.id}</th>
                                <td className="px-4 py-2 text-sm truncate">{client.name}</td>
                                <td className="px-4 py-2 text-sm truncate">{client.email}</td>
                                <td className="">{client.job}</td>
                                <td  className="">R$ {client.rate}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className={
                                        `btn rounded-full w-20 
                                        ${client.isactive ?
                                            `btn-primary` : `btn-outline-primary`}`}
                                    >
                                        {client.isactive ? "Ativo" : "Inativo"}
                                    </button>
                                </td>
                                <td  className="px-4 py-2 text-center space-x-2">
                                    <button 
                                        className="btn btn-secondary px-4 py-2 sm:px-3 sm:py-1 text-sm sm:text-xs lg:text-base"
                                        onClick={() => handleOpen('edit', client)} 
                                    >
                                        Atualizar
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-accent px-4 py-2 sm:px-3 sm:py-1 text-sm sm:text-xs lg:text-base" 
                                        onClick={() => openDeleteConfirmation(client.id)}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>
        </>
    )
}