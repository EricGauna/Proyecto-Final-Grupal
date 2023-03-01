import { useEffect, useState } from 'react';
import { Buscador } from '../components/Buscador';
import { Card } from '../components/Card';
import { getProblemas } from "../services/Problemas"
import { useNavigate } from 'react-router';
import { createSearchParams } from "react-router-dom"
import { useQuery } from "../hooks/useQuery"

export const Problemass =() => {
    const [problemas, setProblemas] = useState([])
    const query = useQuery();
    const [filter, setFilter] = useState((query.get("/search") || "").toLocaleLowerCase())
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const data = await getProblemas()
            console.log(data);
            setProblemas(data.filter(problema => problema.title.toLocaleLowerCase().includes(filter)))
        }
        getData()
    }, [filter])

    useEffect(() => {
        setFilter((query.get("search") || "").toLocaleLowerCase())
    }, [query])


    return (
        <div className="App container">
            <header>
              
            </header>
            <Buscador initialValue={filter} onSearch={({ value }) => navigate({ pathname: "/search", search: createSearchParams({ search: value }).toString() })}></Buscador>
            <div className="container overflow-hidden text-center">
                <div className="row gy-5">
                    <h1>Problemas de mi ciudad</h1>
                    {problemas.map((problema, index) =>
                        <Card
                            key={index}
                            img={problema.images?.[0]}
                            title={problema.title}>
                            
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

