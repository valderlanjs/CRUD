export default function TableList({ handleOpen}) {

    const clients = [
        {
            id: 1,
            name: "Valderlan Silva",
            email: "valderlanjosr15@gmail.com",
            cargo: "Desenvolvedor",
            rate: "100",
            isactive: true
        },
        {
            id: 2,
            name: "Valderlan2 Silva",
            email: "valderlanjosr16@gmail.com",
            cargo: "Desenvolvedor2",
            rate: "103",
            isactive: true
        },
        {
            id: 3,
            name: "Valderlan3 Silva",
            email: "valderlanjosr17@gmail.com",
            cargo: "Desenvolvedor2",
            rate: "102",
            isactive: false
        }
    ]

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cargo</th>
                            <th>Avaliação</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {/* row 1 */}
                        {clients.map((client) => (
                            <tr>
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.cargo}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button className={
                                        `btn rounded-full w-20 
                                        ${client.isactive ? 
                                        `btn-primary` : `btn-outline-primary`}`}
                                    >
                                        {client.isactive ? "Ativo" : "Inativo"}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit')} className="btn btn-secondary">
                                        Atualizar
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-accent">
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