import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import ImagenCripto from "./img/imagen-criptos.png"
import Formulario from "./components/Formulario"
import Resultado from "./components/Resultado"
import Spinner from "./components/Spinner"


//primer styled component
const Contenedor = styled.div`
  max-width:900px;
  margin:0 auto;
  width:90%;

  @media(min-width: 992px){
    display:grid;
    grid-template-columns:repeat(2,1fr);
    column-gap:2rem;
  }

`

const Imagen = styled.img`
  max-width:400px;
  width:80%;
  margin:100px auto 0 auto;
  display:block;
`


const Heading = styled.h1`
  font-family:"Lato",sans-serif;
  color:#FFF;
  text-align:center;
  font-weight:700;
  margin-top:80px;
  margin-bottom:50px;
  font-size:34px;

  //sub-elemento para la linea azul del titulo
  ::after{
    content:"";
    width:100px;
    height:6px;
    background-color:#66A2FE;
    display:block;
    margin:10px auto 0 auto;
  }
`


function App() {

  //state de las monedas y criptomonedas para realizar la consulta a la API para las cotizaciones, este state sera un objeto que se llenara con los datos que se ingresen en el formulario
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)//state para el spinner de carga



  //useEffect que escuchara los cambios que sucedan en el state de monedas
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {

      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})//RESETEAMOS EL RESULTADO ANTERIOR ARA QUE NO APAREZCA CUANDO ESTE CARGANDO
        const { moneda, criptoMoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        //con los [] le estamos diciendo que busque las propiedades del objeto monedas y asi las tomara dinamicamente y podemos acceder a la información que nos muestra la API desde la propiedad DISPLAY que ella tiene al dar una respuesta
        setResultado(resultado.DISPLAY[criptoMoneda][moneda])

        setCargando(false)

      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}

      </div>

    </Contenedor>
  )
}

export default App
