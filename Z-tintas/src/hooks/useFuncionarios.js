const url = "http://localhost:5000";

//Importando o hook de useState para controlar as variáveis
import { useState, useEffect } from "react";

export function useListaFuncionarios(){
    const [funcionarios, setCategorias] = useState([]);

    useEffect(() =>{
        async function fetchFuncionarios() {
            try{
                const req = await fetch(`${url}/usuarios`);
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
        const req = await fetch(`${url}/usuarios`,{
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

// R          -----        10/11/2025
export function useListarFuncionarios(){
  //Lista de produtos
  const[funcionarios,setfuncionarios] = useState([])
  //useEffect pra puxar os dados da API assim que o componente é renderizado
  useEffect(()=>{
    async function fetchData(){
      try{
        const req = await fetch(`${url}/usuarios`)
        const res = await req.json()
        setfuncionarios(res)
        
      }
      catch(error){
        console.log(error.message);
        
      }
    }
    fetchData()
  },[])
//Retorna a lista de produtos
return funcionarios

}

//U       -----         11/11/2025
//Hook para buscar informações de um produto específico
export function useBuscarFuncionarioPorId(){
  //Recebe o id do produto e busca as informações 
  const buscarFuncionarioPorID = async (idFuncionario) => {
    const req = await fetch(`${url}/usuarios/${idFuncionario}`)
    const res = await req.json()
    console.log("Funcionario encontrado: ", res);
    return res        
  }
  return { buscarFuncionarioPorID }
}

//Hook para atualizar um produto
export function useAtualizarFuncionarios(){
  //Envia os dados novos, para o produto específico
  const atualizarFuncionario = async (data, idFuncionario) => {
    const req = await fetch(`${url}/usuario/${idFuncionario}`,{
      method:"PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    })
    const res = await req.json()
    return res
  }
  return { atualizarFuncionario }


}

//D       -----         11/11/2025
export function useDeletaFuncionario(){
  //recebe o id do produto e requisita a api a exclusão
  const deletarFuncionario = async (idFuncionario) => {
    const req = await fetch(`${url}/usuario/${idFuncionario}`, {
      method:"DELETE"
    })
    const res = await req.json()
    //retorna o produto deletado
    return res
  }
  return { deletarFuncionario }
}


