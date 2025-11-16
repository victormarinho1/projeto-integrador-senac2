# Plataforma Web para Denúncias de Trabalho Infantil

![Badge do Java](https://img.shields.io/badge/Java-Spring%20Boot-orange)
![Badge do Angular](https://img.shields.io/badge/Frontend-Angular-red)
![Badge do PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)

---

## 📖 Sobre o Projeto

Este repositório contém o Trabalho de Conclusão de Curso (Projeto Integrador) do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas** do **Centro Universitário Senac**.

O software tem como objetivo principal oferecer uma **plataforma digital acessível e segura para a denúncia de casos de trabalho infantil**, buscando fortalecer a comunicação entre a população e os órgãos responsáveis (como o Conselho Tutelar e o Ministério Público do Trabalho).

A aplicação permite que qualquer cidadão registre uma denúncia de forma anônima, informando a localização, descrição do caso e, opcionalmente, anexando fotos, agilizando o processo e garantindo o sigilo do denunciante.

---

## ✨ Funcionalidades Principais

O sistema é projetado com três níveis de acesso distintos:

### Portal do Cidadão (Denunciante)
* **Registro de Denúncia Anônima:** Formulário simplificado para envio de denúncias sem a necessidade de identificação.
* **Geolocalização:** Permite informar a localização exata da ocorrência.
* **Upload de Evidências:** Capacidade de anexar imagens para comprovar a d[db](db)enúncia.
* **Geração de Protocolo:** Emissão de um número de protocolo para acompanhamento (disponível para denúncias identificadas).
* **Seção Educativa:** Informações sobre o que caracteriza o trabalho infantil e as leis vigentes.

### 2. Painel do Conselheiro
Interface privada destinada ao profissional da rede de proteção (o **Conselheiro Tutelar**), que gerencia o fluxo operacional das denúncias.

* **Atendimento e Encaminhamento:** A função principal é **atender** as denúncias recebidas (analisando, priorizando) e **enviar alguém para a resolução** (encaminhar uma equipe de campo ou um responsável).
* **Análise de Informações:** Acesso seguro aos detalhes, mapa e evidências de cada caso para embasar a tomada de decisão.
* **Gestão de Status:** Ferramentas para atualizar o andamento do caso (Ex: "Nova", "Em Andamento", "Concluída")..
* **Registro de Histórico:** Inclusão de observações internas e relatórios da visita de campo.

### 3. Painel do Administrador (Admin)
Interface privada com permissões elevadas, focada na administração do sistema e não na operação diária dos casos.
* **Dashboard Administrativo:** Acesso a um painel com **estatísticas gerais** do sistema (ex: total de denúncias, casos resolvidos, tempo médio de atendimento) e logs de auditoria.
* **Gerenciamento de Usuários:** Responsável por criar, editar e desativar as contas de acesso dos "Conselheiros".
* **Auditoria e Relatórios:** (Se aplicável) Acesso a logs do sistema e geração de relatórios estatísticos gerais.
---

## 🛠️ Tecnologias Utilizadas

A arquitetura do projeto segue o modelo cliente-servidor, utilizando as seguintes tecnologias:

* **Backend:** **Java 17+** com **Spring Boot**
    * **Spring Security:** Para autenticação e autorização no painel administrativo.
    * **Spring Data JPA:** Para persistência de dados e comunicação com o banco.
* **Frontend:** **Angular 16+**
    * **TypeScript:** Para um desenvolvimento frontend robusto e tipado.
    * **Arquitetura de Componentes:** Para uma interface reutilizável e de fácil manutenção.
* **Banco de Dados:** **PostgreSQL**
    * Utilizado por sua robustez, confiabilidade (ACID) e capacidade de futuras análises geoespaciais (PostGIS).
* **Contêinerização:** **Docker**
    * Utilizado para garantir a consistência dos ambientes e facilitar a implantação (deploy) da aplicação e do banco de dados.

---

## 🚀 Instalação e Execução

Para executar o projeto localmente, você precisará ter o [Git](https://git-scm.com/), [Java (JDK 17+)](https://www.oracle.com/java/technologies/downloads/), [Node.js](https://nodejs.org/) e [Docker](https://www.docker.com/) instalados.

### 1. Clonar o Repositório
```bash
git clone https://github.com/victormarinho1/projeto-integrador-senac.git
cd projeto-integrador
./iniciar-sistema.sh