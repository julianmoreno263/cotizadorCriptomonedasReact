import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from "../data/monedas"


const InputSubmit = styled.input`
    background-color:#9497FF;
    border:none;
    width:100%;
    padding:10px;
    color: #fff;
    font-weight:700;
    text-transform:uppercase;
    font-size:20px;
    border-radius:5px;
    transition: background-color .3s ease;
    margin-top:30px;
    :hover{
        background-color:#7A7DFE;
        cursor:pointer;
    }

`

const Formulario = ({ setMonedas }) => {

    //state para el select de criptomonedas
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)



    //aqui,moneda es el mismo state del hook, solo que el profe  le da este nombre
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas)

    //aqui usamos de nuevo nuestro hook para crear el segundo select de criptomonedas
    const [criptoMoneda, SelectCriptomoneda] = useSelectMonedas("Elige tu Criptomoneda", criptos)


    //useeffect para consultar la API de criptomonedas,apenas carge la app se consulta la API, por eso se ponen las dependencias como un array vacio
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            //aqui voy llenando el state del select de criptomonedas con el arrayCriptos
            setCriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])

    //funcion para validar el formulario
    const handleSubmit = e => {
        e.preventDefault()

        //validacion
        if ([moneda, criptoMoneda].includes("")) {
            setError(true)
            return
        }

        //si pasa la validacion se pone el state en false de nuevo y se llena el objeto del state de monedas de App.jsx con los valores que se eligieron en el formulario, cuando este objeto este lleno se procede a consultar la API para que nos de la cotizacion, esto se hace en App.jsx con un useEffect.
        setError(false)
        setMonedas({
            moneda,
            criptoMoneda
        })

    }


    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas />
                <SelectCriptomoneda />

                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
