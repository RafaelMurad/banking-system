# BankEasy

### Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/RafaelMurad/banking-system.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd banking-system

# Instale as dependencias
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# Docker para rodar o servidor
$ docker-compose up -d

# O servidor inciará na porta:3000 - acesse no navegador: http://localhost:3000
```

### endpoints

<h3>Criar conta</h3>
<p>POST: <code>http://localhost:3000/accounts</code></p>
<p>Body: <code>{ "name": "Rafael Murad", "cpf": "12345678900"}</code></p>
<p> Apenas uma conta podera ser criada por CPF. Toda conta sera criada com balance 0 e um numero de conta gerado automaticamente.</p>

<h3>Depositar</h3>
<p>PATCH: <code>http://localhost:3000/deposits</code></p>
<p>Body: <code>{ "accountNumber": "1", "value": "100" }</code></p>
<p>Informe o numero da conta que deseja depositar e o valor que deseja depositar.</p>

<h3>Transferir</h3>
<p>PATCH: <code>http://localhost:3000/transfers</code></p>
<p>Body: <code>{ "accountNumber": "1", "accountNumberReceipt": "2", "value": "100" }</code></p>
<p>Informe o numero da conta transferindo, numero da conta que deseja transferir e o valor que deseja transferir.</p>
