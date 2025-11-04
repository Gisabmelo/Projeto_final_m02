Objetivo: Criar uma API Rest para o gerenciar a troca de livros entre leitores


Contexto:
A API deve possuir as seguintes funcionalidades: registro do leitor (nome, senha), registro do livro (título,autor,quantidade), busca de livros e quantidade de livros disponíveis para troca.
Para que um leitor possa consultar um livro, ele precisa fazer login como leitor.
O gerenciamento de troca é feito com base nos livros registrados e na quantidade disponível. 
3. Regras:
A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. 
O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que a API for implementada.
 O Swagger também deve contemplar os status codes de erro que serão implementados na API.
Adicione um endpoint para renderizar o Swagger.
Construa um arquivo README para descrever o projeto
Divida a API em camadas: routes, controllers, service e model
Armazene os dados da API em um banco de dados em memória
Utilize a biblioteca express para construir a API Rest
Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.








