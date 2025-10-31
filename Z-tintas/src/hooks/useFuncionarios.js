const url = "http://localhost:5000";

//Importando o hook de useState para controlar as variáveis
import { useState, useEffect } from "react";

export function useListaFuncionarios(){
    const [funcionarios, setCategorias] = useState([]);

    useEffect(() =>{
        async function fetchFuncionarios() {
            try{
                const req = await fetch(`${url}/funcionarios`);
                const res = await req.json();                
                setCategorias(res);

            }catch(erro){
                 console.log(erro.message);
            }
        }
        fetchFuncionarios();
    },[]);
    return funcionarios
}

export function useCadastrarFuncionario() {
    const cadastrarFuncionario = async (data) => {
        console.log("To aqui")
        const req = await fetch(`${url}/funcionarios`,{
            method:"POST",
            headers:{ "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const res = await req.json()
        console.log("Funcionario cadastrado", res);
    
        //Retornar o produto inserido
        return res        
    }
    return { cadastrarFuncionario }
}