const url = "http://localhost:5000";

//Importando o hook de useState para controlar as variáveis
import { useState, useEffect } from "react";

export function useListaClientes(){
    const [clientes,setCategorias] = useState([]);

    useEffect(()=>{
        async function fetchClientes() {
            try{
                const req = await fetch(`${url}/clientes`);
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

export function useListarClientes(){
  //Lista de produtos
  const[cliente,setcliente] = useState([])
  //useEffect pra puxar os dados da API assim que o componente é renderizado
  useEffect(()=>{
    async function fetchData(){
      try{
        const req = await fetch(`${url}/clientes`)
        const res = await req.json()
        setcliente(res)
        
      }
      catch(error){
        console.log(error.message);
        
      }
    }
    fetchData()
  },[])
//Retorna a lista de produtos
return cliente

}


export function useBuscarClientesPorId(){
  //Recebe o id do produto e busca as informações 
  const buscarClientesID = async (idCliente) => {
    const req = await fetch(`${url}/clientes/${idCliente}`)
    const res = await req.json()
    console.log("Cliente encontrado: ", res);
    return res        
  }
  return { buscarClientesID }
}


//Hook para atualizar um produto
export function useAtualizarClientes(){
  //Envia os dados novos, para o produto específico
  const atualizarCliente = async (data, idCliente) => {
    const req = await fetch(`${url}/clientes/${idCliente}`,{
      method:"PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    })
    const res = await req.json()
    return res
  }
  return { atualizarCliente }


}

export function useDeletaClientes(){
  //recebe o id do produto e requisita a api a exclusão
  const deletarCliente = async (idCliente) => {
    const req = await fetch(`${url}/clientes/${idCliente}`, {
      method:"DELETE"
    })
    const res = await req.json()
    //retorna o produto deletado
    return res
  }
  return { deletarCliente }
}

