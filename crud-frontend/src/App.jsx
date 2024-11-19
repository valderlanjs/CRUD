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


  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clients')
      setTableData(response.data)
    } catch (error) {
      setError(error.message)
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
        alert('Cliente cadastrado com sucesso!') // personalizar mensagem de cadastrado com sucesso
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.error('Erro ao adicionar cliente', error)
      }
      console.log('modal mode Add')

    } else {
      console.log('Atualizando cliente pelo ID:', clientData.id)
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData)
        console.log('Cliente atualizado:', response.data);
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        )
      } catch (error) {
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error ao atualizar cliente!!.</span>
        </div>
      }
    }
  }

  return (
    <>
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
