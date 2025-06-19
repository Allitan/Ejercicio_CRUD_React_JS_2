import Campo from "./Campo"
import { useEffect } from "react"
import useCategoria from "../hooks/useCategoria"

const Categorias = () => {
    const {
        categorias,
        setCategorias,
        getCategorias,
    } = useCategoria()
    
    useEffect(() => {
        getCategorias();  
    }, [])

    return(
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProveedor"><i className="fa-solid fa-circle-plus" /> Añadir</button>
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
                                <th>Slug</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                           {
                            categorias.map((categorias, i) => (
                                <tr key={categorias.id}>
                                    <td>{i + 1}</td>
                                    <td>{categorias.name}</td>
                                    <td>{categorias.slug}</td>
                                    <td><img src={categorias.image} style={{width: '100px', height: '100px'}}/> </td>
                                </tr>
                            ))
                           }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="modalProveedor" className="modal fade" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5"> abc </label>
                        </div>
                        <div className="modal-body">
                            <Campo idCampo="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre"  />
                            <Campo idCampo="sglu" iconName="fa-solid fa-user" inputType="text" placeHolder="sglu" />
                            <Campo idCampo="imagen" iconName="fa-solid fa-user-tag" inputType="text" placeHolder="imagen" />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" ><i className="fa-solid fa-floppy-disk"/> Guardar</button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"/> Cerrar</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Categorias;