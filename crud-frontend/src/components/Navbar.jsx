export default function NavBar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Clientes</a>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input type="text" placeholder="Pesquisar" className="input input-bordered w-24 md:w-auto" />
                </div>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    )
}