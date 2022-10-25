import styled from "@emotion/styled"

const Texto = styled.div`
    color: #fff;
    background-color: #B7322C;
    padding:15px;
    font-size:22px;
    text-transform: uppercase;
    font-family:"Lato",sans-serif;
    font-weight:700;
    text-align:center;
`

const Error = ({ children }) => {
    return (
        <Texto>
            {children}
        </Texto>
    )
}

export default Error
