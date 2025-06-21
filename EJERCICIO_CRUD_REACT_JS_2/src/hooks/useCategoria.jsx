import { useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import Swal from "sweetalert2";

const useCategoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState('');
    const url = 'https://api.escuelajs.co/api/v1/categories';

    const getCategorias = async () => {
        const responsive = await axios.get(url);
        setCategorias(responsive.data);
    };

    const openModal = (operation, categoria) => {
        setId('');
        setName('');

        if (operation === 1) {
            setTitleModal('Añadir Categoria');
        } else if (operation === 2) {
            setTitleModal('Editar Categoria');
            setId(categoria.id);
            setName(categoria.name);
        }

        setOperation(operation);
    };

    const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: urlApi,
            data: parametros,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        await axios(obj).then((response) => {
            let mensaje = '';
            if (metodo === 'POST') {
                mensaje = 'Categoria añadida correctamente';
            } else if (metodo === 'PUT') {
                mensaje = 'Categoria actualizada correctamente';
            } else if (metodo === 'DELETE') {
                mensaje = 'Categoria eliminada correctamente';
            }
            alertaSuccess(mensaje);
            document.getElementById('btnCerrarModal').click();
            getCategorias();
        }).catch((error) => {
            alertaError(error.response.data.message);
        });
    };

    const guardarEditarCategoria = () => {
        let payload, metodo, urlAxios;

        if (name === '') {
            alertaWarning('El campo nombre es obligatorio', 'name');
        } else {
            payload = {
                name: name,
                image: "https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg"
            };

            if (operation === 1) {
                metodo = 'POST';
                urlAxios = url;
            } else if (operation === 2) {
                metodo = 'PUT';
                urlAxios = `${url}/${id}`;
            }

            enviarSolicitud(urlAxios, metodo, payload);
        }
    };

    const eliminarCategoria = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar la categoria?',
            icon: 'question',
            text: 'Esta acción no se puede deshacer',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud(`${url}/${id}`, 'DELETE');
            }
        }).catch((error) => {
            alertaError(error.response.data.message);
        });
    };

    return {
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
    };
};

export default useCategoria;