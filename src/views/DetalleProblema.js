import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { getProblemaById } from "../services/Problemas";

export const DetalleProblema = () => {
    const { problemasId: id } = useParams();
    const [problema, setProblema] = useState();
    const loadData = async () => {
        const { data } = await getProblemaById(id)
        console.log(data);
        setProblema(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    return <div className="container text-center">
        {!problema && <span>No hemos encontrado el problema seleccionado</span>}
        {problema &&
            <>
                <h2>Detalles de {problema.title}</h2>
                <Card
                    className="problema"
                    img={problema.images?.[0]}>

                    <span className="Barrio">
                        {problema.category?.name}
                    </span>
                    <p>{problema.description}</p>


                </Card>
            </>
        }
    </div>
}
