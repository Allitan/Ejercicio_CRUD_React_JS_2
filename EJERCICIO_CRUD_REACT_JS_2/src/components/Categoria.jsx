import Campo from "./Campo"
import { useEffect } from "react"
import useCategoria from "../hooks/useCategoria"

const Categorias = () => {
    const {
        categorias,
        setCategorias,
        getCategorias,
        openModal,
        id,
        setId,
        name,
        setName,
        titleModal,
        guardarEditarCategoria,
        eliminarCategoria,
    } = useCategoria()
    
    useEffect(() => {
        getCategorias();  
    }, [])

    return(
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCategoria" onClick={() => openModal(1)}><i className="fa-solid fa-circle-plus" /> Añadir</button>
                    </div>    
                </div>
            </div>

            <div className="col-12 col-lg-8 offset-lg-2 mt-3">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                categorias.map((categoria, i) => (
                                    <tr key={categoria.id}>
                                        <td>{i + 1}</td>
                                        <td>{categoria.name}</td>
                                        <td>
                                            <img
                                                src={Array.isArray(categoria.image) ? categoria.image[0] : categoria.image}
                                                style={{ width: '100px', height: '100px' }}
                                                onError={e => e.target.src = "https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg"}
                                                alt="Imagen"
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalCategoria" onClick={() => openModal(2, categoria)}><i className="fa-solid fa-pen-to-square" /></button>
                                            <button className="btn btn-danger" onClick={() => eliminarCategoria(categoria.id)}><i className="fa-solid fa-trash-can" /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="modalCategoria" className="modal fade" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5"> {titleModal} </label>
                        </div>
                        <div className="modal-body">
                            <Campo idCampo="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={guardarEditarCategoria}><i className="fa-solid fa-floppy-disk"/> Guardar</button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"/> Cerrar</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Categorias;