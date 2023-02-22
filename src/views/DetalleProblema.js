import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { getProblemaById } from "../services/Problemas";
import "./detalle.css"

export const DetalleProblema = () => {
    const { problemasId: id } = useParams();
    const [problema, setProblema] = useState();
    
    useEffect(() => {
        const loadData = async () => {
            const { data } = await getProblemaById(id)
            console.log(data);
            setProblema(data)
        }
        loadData()
    }, [id])

    return <div className="Detalle">
        {!problema && <span>No hemos encontrado el problema seleccionado</span>}
        {problema &&
            <>
                <h2>Detalles de {problema.title}</h2>
                <Card
                    className="problema"
                    img={problema.images?.[0]}>

                    <span className="Barrio">
                    {problema.barrio}</span>
                    <span className="Barrio">
                        {problema.ciudad}
                    </span>
                <p>{problema.description}</p>
                <p>{ problema.likes}</p>


                </Card>
            </>
        }
    </div>
}
