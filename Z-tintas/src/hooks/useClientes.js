const url = "http://localhost:5000";

//Importando o hook de useState para controlar as variáveis
import { useState, useEffect } from "react";

export function useListaClientes(){
    const [clientes,setCategorias] = useState([]);

    useEffect(()=>{
        async function fetchClientes() {
            try{
                const req = await fetch(`${url}/funcionarios`);
                const res = await req.json();                
                setCategorias(res);
            }catch(erro){
                console.log(erro.message);
            }
        }
        fetchClientes();
    },[])
    return clientes
}

export function useCadastrarClientes() {
    const cadastrarClientes = async (data) => {
        
        const req = await fetch(`${url}/clientes`,{
            method:"POST",
            headers:{ "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const res = await req.json()
        console.log("Cliente cadastrado", res);
    
        //Retornar o produto inserido
        return res        
    }
    return { cadastrarClientes }
}

export function useListaCategorias() {
  // Variável para armazenar as categorias
  const [categorias, setCategorias] = useState([]);
  //Puxa os dados da API assim que o componente é iniciado
  useEffect(() => {
    async function fetchCategorias() {
      try {
        // Fetch abre conexão com a api, na rota específicada e guarda o resposta em req
        const req = await fetch(`${url}/categorias`);
        // Como a resposta vem em texto, preciso converter para json para utilizar
        const res = await req.json();
        // Assim que tiver convertido, guarda na variável criada para guardar as categorias
        setCategorias(res);
      } catch (erro) {
        // Se tiver erro no tentativa de conexão com a api, mostrar qual foi no console
        console.log(erro.message);
      }
    }
    // Executa a função de buscar as categorias na api
    fetchCategorias();
  }, []);
  // retorna pra quem chamou a função, a lista de categorias já preenchida
  return categorias;
}