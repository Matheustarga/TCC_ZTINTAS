import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import VerTintas from './VerTintas';


// Cor Primária: #081F66 (Azul Escuro)
// Cor Secundária: #fff (Branco)
// Cor de Fundo: rgb(231, 231, 231) (Cinza Claro)

const API_URL = 'http://localhost:5000/produtos';

const EditarEstoque = () => {
  const { id } = useParams(); // Pega o ID do produto da URL
  const navigate = useNavigate();
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
    status: 'Ativo',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduto(id);
    }
  }, [id]);

  const fetchProduto = async (produtoId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/${produtoId}`);
      // Garante que os valores numéricos sejam tratados corretamente
      const data = response.data;
      setFormData({
        ...data,
        tamanho: parseFloat(data.tamanho) || 0,
        precoCusto: parseFloat(data.precoCusto) || 0,
        precoVenda: parseFloat(data.precoVenda) || 0,
        quantidade: parseInt(data.quantidade) || 0,
      });
    } catch (err) {
      setError('Erro ao carregar dados do produto.');
      console.error('Erro ao carregar produto:', err);
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

    try {
      // Envia apenas os dados que podem ser atualizados
      await axios.put(`${API_URL}/${id}`, formData);
      setSuccess('Produto atualizado com sucesso!');
      // Opcional: Redirecionar após a edição
      // setTimeout(() => navigate('/ver-estoque'), 2000); 
    } catch (err) {
      setError('Erro ao atualizar produto.');
      console.error('Erro ao atualizar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" style={{ color: '#081F66' }}>
        Editar Produto em Estoque
      </h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading && <Alert variant="info">Carregando...</Alert>}

      {/* Formulário de Edição */}
      <div className="p-4 border rounded shadow-sm" style={{ backgroundColor: '#fff' }}>
        <h2>Detalhes do Produto (ID: {id})</h2>
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

          
          
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Ativo">Ativo</option>
              <option value="Pausado">Pausado</option>
            </Form.Select>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
            style={{ backgroundColor: '#081F66', borderColor: '#081F66' }}
          >
            {loading ? 'Atualizando...' : 'Salvar Alterações'}
          </Button>
          <Button 
            variant="secondary" 
            className="ms-2"
            onClick={() => navigate('/estoque')} // Assumindo que existe uma rota para ver o estoque
          >
            Cancelar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditarEstoque;

