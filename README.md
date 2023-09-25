# Interpretador Básico em JavaScript para a Rinha de Compiladores

Esta é uma implementação mínima de um interpretador em JavaScript para testar os exemplos disponíveis em [rinha-de-compiler](https://github.com/aripiprazole/rinha-de-compiler).

Todos os [exemplos da rinha](https://github.com/aripiprazole/rinha-de-compiler/tree/main/files) estão funcionando.

É possível executar o cálculo do máximo da sequência de Fibonacci, aproximadamente 7000, sem otimizações, apenas com um pseudo cache 🫠.

## Gerando a Árvore Sintática Abstrata (AST)

1. Instale o parser:
    ```shell
    cargo install rinha
    ```
2. Execute o comando abaixo, utilizando um dos [exemplos da rinha](https://github.com/aripiprazole/rinha-de-compiler/tree/main/files):
    ```shell
    rinha ./files/source.rinha > ./var/rinha/source.rinha.json
    ```

## Executando Localmente

```shell
node index.js
```

## Executando com Docker

1. Construa a imagem:
    ```shell
    docker build -t nome_da_imagem .
    ```
2. (Opcional) Envie um exemplo de AST para ser executado dentro do container:
    ```shell
    docker cp ./exemplos/source.json id_do_container:/var/rinha/sourcer.rinha.json
    ```
3. Execute a imagem:
    ```shell
    docker run -it nome_da_imagem
    ```
