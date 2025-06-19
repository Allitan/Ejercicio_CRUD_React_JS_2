import { use, useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import Swal from "sweetalert2";

const useCategoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const url = 'https://api.escuelajs.co/api/v1/categories';

    const getCategorias = async () => {
       const responsive = await axios.get(url)
       setCategorias(responsive.data)
    }

    const openModal = (operation, categoria) => {
        setId('')
        setName('')
        setSlug('')
        setImage('')

        if (operation === 1) {
            setTitleModal('Añadir Categoria')
        } else if (operation === 2) {
            setTitleModal('Editar Categoria')
            setId(categoria.id)
            setName(categoria.name)
            setSlug(categoria.sglu)
        } 

        setOperation(operation);
    }

    const guardarEditarCategoria = () => {
        let payload, metodo, urlAxios

        if (name === ''){
            alertaWarning('El campo nombre es obligatorio', 'name')
        } else if (slug === ''){
            alertaWarning('El campo slug es obligatorio', 'slug')
        } else {
            payload = {
                name: name,
                slug: slug,
                image: ['https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg']
            }

            if (operation === 1) {
                metodo = 'POST';
                urlAxios = url;
            } else if (operation === 2) {
                metodo = 'PUT';
                urlAxios = `${url}/${id}`;
            }

            //enviarSolicitud(urlAxios, metodo, payload)
        }
    }

    return {
        categorias,
        setCategorias,
        getCategorias,
    }
}

export default useCategoria;