import express from 'express';
import { buscarUfs, buscarUfPorId, buscarUfsPorNome } from '../servicos/servicos.js';
import colecaoUf from './dados/dados.js';

const buscarUfsPorNome = (nomeUf) => {
  return colecaoUf.filter(Uf => Uf.nome.toLowerCase().includes(nomeUf.toLowerCase()));
};

const app = express();

app.get('/ufs', (req, res) => {
  const nomeUf = req.query.busca;
  const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : colecaoUf;
  if (resultado.length > 0) {
    res.json(resultado);
  } else {
      res.status(404).send({"erro": "Nenhuma Uf encontrada"});
  }
});


app.get('/ufs/:iduf', (req, res) => {
  const idUF = parseInt(req.params.iduf);
  let mensagemErro = '';
  let uf;

  if (!(isNaN(idUF))) {
    uf = colecaoUf.colecaoUf.find(u => u.id === idUF);
    if (!uf){
        mensagemErro = 'UF não encontrada';
    }
  }else {
    mensagemErro = 'requisição invalida'
  }

  if (uf) {
    res.json(uf);
  }else {
    res.status(404).json({"erro": mensagemErro})
  }

});

app.listen(8080, () => {
    console.log('servidor iniciado na porta 8080');
});