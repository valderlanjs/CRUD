import { useEffect, useState } from 'react'
import ModalForm from './components/Modalform'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import axios from 'axios';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clients')
      setTableData(response.data)
    } catch (error) {
      setErrorMessage('Erro ao carregar a lista de clientes. Tente novamente.');
      setTimeout(() => {
        setErrorMessage('')
      }, 2000);
    }
  }

  useEffect(() => {
    fetchClients();
  }, [])

  const handleOpen = (mode, client) => {
    setClientData(client)
    setModalMode(mode);
    setIsOpen(true);

  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        setSuccessMessage('Funcionário adicionado com sucesso!');
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        setErrorMessage('Erro ao adicionar funcionário. Verifique se o Email já existe no sistema.');
        setTimeout(() => {
          setErrorMessage('')
        }, 2000);
      }

    } else {
      console.log('Atualizando funcionário pelo ID:', clientData.id)
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData)
        console.log('Funcionário atualizado:', response.data);
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        )
      } catch (error) {
        setErrorMessage('Erro ao atualizar funcionário. Tente novamente.');
        setTimeout(() => {
          setErrorMessage('')
        }, 2000);
      }
    }
  }

  return (
    <>
      {/* Exibição da mensagem de sucesso personalizada */}
      {successMessage && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Funcionário cadastrado com sucesso!</span>
        </div>
      )}

      {/* Exibição da mensagem de erro personalizada */}
      {errorMessage && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
      <NavBar
        onOpen={() => handleOpen('add')}
        onSearch={setSearchTerm}
      />
      <TableList
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
      />
      <ModalForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  )
}

export default App
