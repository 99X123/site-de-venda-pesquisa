# 🛍️ STORE ONLINE

Uma loja virtual moderna e funcional com sistema de carrinho de compras e integração com Discord para finalização de pedidos.

## ✨ Funcionalidades

### 🛒 Sistema de Produtos
- **Listagem de produtos** com design responsivo
- **Busca em tempo real** por nome e descrição
- **Filtros dinâmicos** para facilitar a navegação
- **Modal de detalhes** para visualização completa
- **Sistema de estoque** com indicadores visuais

### 🛍️ Carrinho de Compras
- **Adicionar produtos** com um clique
- **Gerenciar quantidades** (+/-) no carrinho
- **Remover itens** individualmente
- **Cálculo automático** do total
- **Persistência de dados** no localStorage
- **Contador visual** de itens no header

### 🎫 Sistema de Tickets
- **Integração com Discord** para finalização
- **Mensagem formatada** automaticamente
- **Direcionamento específico** para canal de tickets
- **Cópia para área de transferência** da mensagem
- **Abertura automática** do Discord no canal correto

### ⚙️ Painel Administrativo
- **Login seguro** (admin / 123456)
- **CRUD completo** de produtos
- **Upload de imagens** via URL
- **Gerenciamento de estoque**
- **Estatísticas em tempo real**
- **Sincronização automática** com a loja

## 🚀 Como Usar

### 📱 Para Clientes

1. **Navegar pelos produtos**
   - Use a barra de busca para encontrar produtos
   - Clique em "Ver Detalhes" para mais informações

2. **Adicionar ao carrinho**
   - Clique em "Adicionar" nos cards de produtos
   - Veja o contador aumentar no ícone do carrinho

3. **Gerenciar carrinho**
   - Clique no ícone do carrinho no header
   - Ajuste quantidades com +/- 
   - Remova itens com o ícone de lixeira

4. **Finalizar compra**
   - Clique em "Finalizar Compra"
   - Discord abrirá automaticamente
   - Copie a mensagem formatada
   - Cole no canal de tickets de pagamento

### ⚙️ Para Administradores

1. **Acessar painel admin**
   - Vá para `/admin.html`
   - Login: `admin` / Senha: `123456`

2. **Gerenciar produtos**
   - Adicionar novos produtos
   - Editar produtos existentes
   - Excluir produtos
   - Ajustar estoque

3. **Monitorar vendas**
   - Ver estatísticas em tempo real
   - Acompanhar estoque baixo
   - Resetar dados se necessário

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e animações
- **JavaScript ES6+** - Funcionalidades dinâmicas
- **LocalStorage** - Persistência de dados
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia

## 📁 Estrutura do Projeto

```
site pesquisa/
├── index.html          # Página principal da loja
├── admin.html          # Painel administrativo
├── styles.css          # Estilos da loja
├── admin-styles.css    # Estilos do painel admin
├── script.js           # Funcionalidades da loja
├── admin.js            # Funcionalidades do admin
├── README.md           # Documentação
└── GUIA_SIMPLES.md    # Guia de instalação
```

## 🎨 Design

### 🎯 Características
- **Tema dark** moderno e elegante
- **Gradientes** e efeitos visuais
- **Animações suaves** e transições
- **Design responsivo** para todos os dispositivos
- **Interface intuitiva** e fácil de usar

### 🎨 Paleta de Cores
- **Primária:** Roxo (#6366f1)
- **Secundária:** Violeta (#8b5cf6)
- **Acento:** Laranja (#f59e0b)
- **Sucesso:** Verde (#10b981)
- **Erro:** Vermelho (#ef4444)
- **Fundo:** Azul escuro (#0f0f23)

## 🔧 Configuração

### 📦 Instalação Simples

1. **Baixe os arquivos**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd "site pesquisa"
   ```

2. **Abra no navegador**
   ```bash
   # Abra index.html no navegador
   # Ou use um servidor local
   python -m http.server 8000
   ```

3. **Acesse a loja**
   ```
   http://localhost:8000
   ```

### ⚙️ Configuração do Discord

O sistema está configurado para:
- **Canal de tickets:** ID `1399038252857692181`
- **Servidor Discord:** Link de convite automático
- **Formato de mensagem:** Markdown otimizado

## 📊 Funcionalidades Técnicas

### 🔄 Sincronização
- **Tempo real** entre admin e loja
- **Verificação automática** a cada 2 segundos
- **Persistência** no localStorage
- **Atualização manual** disponível

### 🛡️ Segurança
- **Login protegido** no painel admin
- **Validação de dados** nos formulários
- **Sanitização** de inputs
- **Tratamento de erros** robusto

### 📱 Responsividade
- **Mobile-first** design
- **Breakpoints** otimizados
- **Touch-friendly** interface
- **Performance** otimizada

## 🎯 Casos de Uso

### 🏪 Loja Física
- **Catálogo digital** de produtos
- **Pedidos online** via Discord
- **Controle de estoque** em tempo real

### 🎨 Artista/Criador
- **Portfólio** de produtos
- **Vendas diretas** via Discord
- **Gestão simples** de produtos

### 🚀 Startup
- **MVP** rápido para e-commerce
- **Integração** com Discord
- **Custo zero** de hospedagem

## 🔮 Roadmap

### 🚀 Próximas Funcionalidades
- [ ] **Sistema de usuários** com perfis
- [ ] **Histórico de pedidos** personalizado
- [ ] **Cupons de desconto** automáticos
- [ ] **Notificações** em tempo real
- [ ] **Relatórios** de vendas avançados
- [ ] **Integração** com APIs de pagamento

### 🎨 Melhorias de Design
- [ ] **Modo claro/escuro** alternável
- [ ] **Temas personalizáveis** 
- [ ] **Animações** mais elaboradas
- [ ] **Micro-interações** aprimoradas

## 🤝 Contribuição

### 📝 Como Contribuir
1. **Fork** o projeto
2. **Crie uma branch** para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra um Pull Request**

### 🐛 Reportar Bugs
- Use as **Issues** do GitHub
- Descreva o **passo a passo** do bug
- Inclua **screenshots** se possível
- Especifique **navegador** e **sistema**

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Carlos** - [@99X123](https://github.com/99X123)

- 🎮 Desenvolvedor apaixonado por tecnologia
- 🧠 Especialista em soluções criativas
- 🤖 Curioso por IA e automações
- 🛠️ Trabalha com Python, Lua, JavaScript

## 🙏 Agradecimentos

- **Font Awesome** pelos ícones
- **Google Fonts** pela tipografia
- **Comunidade Discord** pelo suporte
- **Usuários** pelos feedbacks valiosos

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!**

🛍️ **STORE ONLINE** - Transformando ideias em realidade digital! 