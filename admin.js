// Credenciais de login (em produção, isso seria no backend)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '123456'
};

// Estado da aplicação
let isLoggedIn = false;
let currentUser = '';
let products = [];
let editingProductId = null;
let deletingProductId = null;

// Elementos do DOM
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const currentUserSpan = document.getElementById('currentUser');

// Stats elements
const totalProductsEl = document.getElementById('totalProducts');
const inStockProductsEl = document.getElementById('inStockProducts');
const lowStockProductsEl = document.getElementById('lowStockProducts');
const outOfStockProductsEl = document.getElementById('outOfStockProducts');

// Table elements
const productsTableBody = document.getElementById('productsTableBody');

// Modal elements
const productModal = document.getElementById('productModal');
const deleteModal = document.getElementById('deleteModal');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.getElementById('productForm');
const deleteProductName = document.getElementById('deleteProductName');

// Form elements
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productDescriptionInput = document.getElementById('productDescription');
const productImageInput = document.getElementById('productImage');
const productStockInput = document.getElementById('productStock');

// Inicializar produtos (carregar do localStorage ou usar dados padrão)
function initializeProducts() {
    const savedProducts = localStorage.getItem('products');
    console.log('Produtos salvos encontrados:', savedProducts);
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        console.log('Produtos carregados do localStorage:', products);
    } else {
        // Dados padrão
        products = [
            {
                id: 1,
                name: "tum tum sahur",
                description: "TUM SAHUR",
                price: "R$ 1",
                image: "https://media.discordapp.net/attachments/1398784980238209114/1399564618719821884/download_2.jpg?ex=6889759f&is=6888241f&hm=ecc9f9e4c27d22963b6b3db52d2e8548d14311223f5c7931532366e5e154d628&=&format=webp",
                stockQuantity: 10
            }
        ];
        saveProducts();
    }
}

// Salvar produtos no localStorage
function saveProducts() {
    console.log('Salvando produtos no localStorage:', products);
    localStorage.setItem('products', JSON.stringify(products));
}

// Função de login
function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isLoggedIn = true;
        currentUser = username;
        showDashboard();
        return true;
    }
    return false;
}

// Função de logout
function logout() {
    isLoggedIn = false;
    currentUser = '';
    showLoginScreen();
}

// Mostrar tela de login
function showLoginScreen() {
    loginScreen.style.display = 'flex';
    dashboard.style.display = 'none';
    loginForm.reset();
}

// Mostrar dashboard
function showDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    currentUserSpan.textContent = currentUser;
    loadDashboard();
}

// Carregar dashboard
function loadDashboard() {
    updateStats();
    loadProductsTable();
}

// Atualizar estatísticas
function updateStats() {
    if (!products) {
        products = [];
    }
    
    const total = products.length;
    const inStock = products.filter(p => (p.stockQuantity || 0) > 5).length;
    const lowStock = products.filter(p => (p.stockQuantity || 0) > 0 && (p.stockQuantity || 0) <= 5).length;
    const outOfStock = products.filter(p => (p.stockQuantity || 0) === 0).length;

    totalProductsEl.textContent = total;
    inStockProductsEl.textContent = inStock;
    lowStockProductsEl.textContent = lowStock;
    outOfStockProductsEl.textContent = outOfStock;
}

// Carregar tabela de produtos
function loadProductsTable() {
    if (!products || products.length === 0) {
        productsTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    Nenhum produto encontrado. Adicione seu primeiro produto!
                </td>
            </tr>
        `;
        return;
    }
    
    productsTableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id || 'N/A'}</td>
            <td>
                <div class="product-image-cell">
                    <img src="${product.image || ''}" alt="${product.name || 'Produto'}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <i class="fas fa-image" style="display: none;"></i>
                </div>
            </td>
            <td>
                <strong>${product.name || 'Nome não definido'}</strong>
                <br>
                <small style="color: var(--text-secondary);">${product.description ? product.description.substring(0, 50) + '...' : 'Sem descrição'}</small>
            </td>
            <td>${product.price || 'R$ 0,00'}</td>
            <td>
                <span class="stock-badge ${getStockBadgeClass(product.stockQuantity || 0)}">
                    ${product.stockQuantity || 0} em estoque
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct(${product.id || 0})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id || 0})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Função para obter classe do badge baseada na quantidade
function getStockBadgeClass(quantity) {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= 5) return 'low-stock';
    return 'in-stock';
}

// Função para formatar preço
function formatPrice(price) {
    if (typeof price === 'string') {
        // Se já está formatado como "R$ X,XX", retorna como está
        if (price.startsWith('R$ ')) {
            return price;
        }
        // Se é uma string numérica, converte
        const numPrice = parseFloat(price.replace(',', '.'));
        if (!isNaN(numPrice)) {
            return `R$ ${numPrice.toFixed(2).replace('.', ',')}`;
        }
        return 'R$ 0,00';
    }
    
    if (typeof price === 'number') {
        if (isNaN(price) || price < 0) {
            return 'R$ 0,00';
        }
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
    
    return 'R$ 0,00';
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(message) {
    // Criar elemento de mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adicionar ao body
    document.body.appendChild(messageDiv);
    
    // Remover automaticamente após 3 segundos
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 3000);
}

// Abrir modal para adicionar produto
function openAddProductModal() {
    editingProductId = null;
    modalTitle.textContent = 'Adicionar Produto';
    productForm.reset();
    productModal.style.display = 'block';
}

// Abrir modal para editar produto
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    editingProductId = productId;
    modalTitle.textContent = 'Editar Produto';
    
    // Preencher formulário
    productNameInput.value = product.name || '';
    
    // Converter preço de volta para formato numérico
    let priceValue = product.price || '';
    if (priceValue.startsWith('R$ ')) {
        priceValue = priceValue.replace('R$ ', '').replace(',', '.');
    }
    const numericPrice = parseFloat(priceValue) || 0;
    productPriceInput.value = numericPrice.toFixed(2).replace('.', ',');
    
    productDescriptionInput.value = product.description || '';
    productImageInput.value = product.image || '';
    productStockInput.value = product.stockQuantity || 0;
    
    productModal.style.display = 'block';
}

// Fechar modal de produto
function closeProductModal() {
    productModal.style.display = 'none';
    editingProductId = null;
}

// Resetar produtos para dados padrão
function resetProducts() {
    if (confirm('Tem certeza que deseja resetar todos os produtos para os dados padrão? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('products');
        initializeProducts();
        loadDashboard();
        alert('Produtos resetados com sucesso!');
    }
}

// Salvar produto (adicionar ou editar)
function saveProduct(formData) {
    // Formatar preço - aceita vírgula e ponto
    let priceInput = formData.get('price') || '0';
    
    // Substituir vírgula por ponto para conversão
    priceInput = priceInput.replace(',', '.');
    const rawPrice = parseFloat(priceInput) || 0;
    const formattedPrice = formatPrice(rawPrice);
    
    const productData = {
        name: formData.get('name') || '',
        price: formattedPrice,
        description: formData.get('description') || '',
        image: formData.get('image') || '',
        stockQuantity: parseInt(formData.get('stock')) || 0
    };
    
    console.log('Dados do produto a serem salvos:', productData);
    
    if (editingProductId) {
        // Editar produto existente
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            console.log('Produto editado:', products[index]);
        }
    } else {
        // Adicionar novo produto
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        const newProduct = {
            id: newId,
            ...productData
        };
        products.push(newProduct);
        console.log('Novo produto adicionado:', newProduct);
    }

    console.log('Array de produtos atualizado:', products);
    saveProducts();
    loadDashboard();
    closeProductModal();
    
    // Mostrar mensagem de sucesso
    showSuccessMessage('Produto salvo com sucesso!');
}

// Abrir modal de confirmação de exclusão
function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    deletingProductId = productId;
    deleteProductName.textContent = product.name || 'Produto sem nome';
    deleteModal.style.display = 'block';
}

// Fechar modal de exclusão
function closeDeleteModal() {
    deleteModal.style.display = 'none';
    deletingProductId = null;
}

// Confirmar exclusão
function confirmDelete() {
    if (deletingProductId) {
        products = products.filter(p => p.id !== deletingProductId);
        saveProducts();
        loadDashboard();
        closeDeleteModal();
    }
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (login(username, password)) {
        showDashboard();
    } else {
        alert('Credenciais inválidas! Tente novamente.');
    }
});

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    let priceInput = formData.get('price') || '0';
    
    // Substituir vírgula por ponto para validação
    priceInput = priceInput.replace(',', '.');
    const price = parseFloat(priceInput);
    
    // Validar preço
    if (isNaN(price) || price < 0) {
        alert('Por favor, digite um preço válido (ex: 0,50 ou 0.50)');
        return;
    }
    
    saveProduct(formData);
});

// Fechar modais clicando fora
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
    if (e.target === deleteModal) {
        closeDeleteModal();
    }
});

// Fechar modais com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (productModal.style.display === 'block') {
            closeProductModal();
        }
        if (deleteModal.style.display === 'block') {
            closeDeleteModal();
        }
    }
});

// Função para formatar input de preço em tempo real
function formatPriceInput(input) {
    let value = input.value.replace(/[^\d,]/g, ''); // Remove tudo exceto números e vírgula
    value = value.replace(/,/g, (match, index, string) => {
        // Permite apenas uma vírgula
        return string.indexOf(',') === index ? ',' : '';
    });
    input.value = value;
}



// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Limpar dados antigos se necessário
    if (localStorage.getItem('sprunkiProducts')) {
        localStorage.removeItem('sprunkiProducts');
        console.log('Dados antigos removidos');
    }
    
    initializeProducts();
    showLoginScreen();
    
    // Adicionar listener para formatação de preço
    const priceInput = document.getElementById('productPrice');
    if (priceInput) {
        priceInput.addEventListener('input', (e) => {
            formatPriceInput(e.target);
        });
    }
    
    console.log('STORE ONLINE Admin Dashboard inicializado!');
    console.log('Credenciais: admin / 123456');
}); 