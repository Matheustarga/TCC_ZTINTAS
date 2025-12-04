import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/produtos';

const CadastrarEstoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    SKU: '',
    nome: '',
    descricao: '',
    categoria: '',
    marca: '',
    medida: '',
    tamanho: 0,
    precoCusto: 0,
    precoVenda: 0,
    quantidade: 0,
    fornecedor: '',
    imagemUrl: '',
    status: 'Ativo', // Adicionando o campo status para a funcionalidade de "pausar"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setProdutos(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos.');
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Gerar um ID simples (json-server pode gerar, mas é bom ter um fallback)
    const newProduct = { ...formData, id: Date.now().toString() };

    try {
      await axios.post(API_URL, newProduct);
      setSuccess('Produto cadastrado com sucesso!');
      setFormData({
        SKU: '',
        nome: '',
        descricao: '',
        categoria: '',
        marca: '',
        medida: '',
        tamanho: 0,
        precoCusto: 0,
        precoVenda: 0,
        quantidade: 0,
        fornecedor: '',
        imagemUrl: '',
        status: 'Ativo',
      });
      fetchProdutos(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao cadastrar produto.');
      console.error('Erro ao cadastrar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`${API_URL}/${id}`);
      setSuccess('Produto deletado com sucesso!');
      fetchProdutos(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao deletar produto.');
      console.error('Erro ao deletar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (produto) => {
    const newStatus = produto.status === 'Ativo' ? 'Pausado' : 'Ativo';
    const action = newStatus === 'Pausado' ? 'pausar' : 'ativar';

    if (!window.confirm(`Tem certeza que deseja ${action} este produto?`)) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.put(`${API_URL}/${produto.id}`, { status: newStatus });
      setSuccess(`Produto ${action} com sucesso!`);
      fetchProdutos(); // Recarrega a lista
    } catch (err) {
      setError(`Erro ao ${action} produto.`);
      console.error(`Erro ao ${action} produto:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Cadastro e Gestão de Produtos</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading && <Alert variant="info">Processando...</Alert>}

      {/* Formulário de Cadastro */}
      <div className="mb-5 p-4 border rounded shadow-sm bg-white">
        <h2>Cadastrar Novo Produto</h2>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-md-6" controlId="formNome">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6" controlId="formSKU">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                name="SKU"
                value={formData.SKU}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-4" controlId="formCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4" controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4" controlId="formFornecedor">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control
                type="text"
                name="fornecedor"
                value={formData.fornecedor}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-md-3" controlId="formMedida">
              <Form.Label>Unidade de Medida (ex: mL, kg)</Form.Label>
              <Form.Control
                type="text"
                name="medida"
                value={formData.medida}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="formTamanho">
              <Form.Label>Tamanho/Volume</Form.Label>
              <Form.Control
                type="number"
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="formPrecoCusto">
              <Form.Label>Preço de Custo</Form.Label>
              <Form.Control
                type="number"
                name="precoCusto"
                value={formData.precoCusto}
                onChange={handleChange}
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-3" controlId="formPrecoVenda">
              <Form.Label>Preço de Venda</Form.Label>
              <Form.Control
                type="number"
                name="precoVenda"
                value={formData.precoVenda}
                onChange={handleChange}
                step="0.01"
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formQuantidade">
            <Form.Label>Quantidade em Estoque</Form.Label>
            <Form.Control
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagemUrl">
            <Form.Label>URL da Imagem</Form.Label>
            <Form.Control
              type="text"
              name="imagemUrl"
              value={formData.imagemUrl}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </Button>
        </Form>
      </div>

      {/* Listagem de Produtos */}
      <div className="p-4 border rounded shadow-sm bg-white">
        <h2>Produtos Cadastrados</h2>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>SKU</th>
              <th>Preço Venda</th>
              <th>Qtd.</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.SKU}</td>
                  <td>R$ {produto.precoVenda}</td>
                  <td>{produto.quantidade}</td>
                  <td>
                    <span className={`badge ${produto.status === 'Ativo' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {produto.status || 'Ativo'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant={produto.status === 'Ativo' ? 'warning' : 'success'}
                      size="sm"
                      className="me-2"
                      onClick={() => handleToggleStatus(produto)}
                      disabled={loading}
                    >
                      {produto.status === 'Ativo' ? 'Pausar' : 'Ativar'}
                    </Button>
                    {/* <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(produto.id)}
                      disabled={loading}
                    >
                      Deletar
                    </Button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Nenhum produto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default CadastrarEstoque;
