import { useState } from "react";

export default function ModalForm({ isOpen, onClose, mode, OnSubmit }) {
    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState(false);

    //handle the change of status
    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Ativo'); //set status as boolean
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Editar Cliente' : 'Detalhes do Cliente'}</h3>
                    <form method="dialog" onSubmit={handleSubmit}>

                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Nome
                            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Email
                            <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Cargo
                            <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)}/>
                        </label>

                        <div className="flex mb-4 justify-between my-4">
                            <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
                                Avaliação
                                <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)}/>
                            </label>
                            <select value={status ? 'Ativo' : 'Inativo'} className="select select-bordered mt-4  w-full max-w-xs" onChange={handleStatusChange}>
                                <option>Inativo</option>
                                <option>Ativo</option>
                            </select>
                        </div>

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                        <button className="btn btn-success">{mode === 'edit' ? 'Salvar alterações' : 'Adicionar Cliente'}</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}