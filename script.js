// Carregar produtos do localStorage ou usar dados padrão
let products = [];

function loadProductsFromStorage() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        console.log('Produtos carregados do localStorage:', products);
    } else {
        // Se não há produtos salvos, começar com array vazio
        products = [];
        console.log('Nenhum produto encontrado - começando com lista vazia');
    }
}

// Elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');

// Estado da aplicação
let currentProducts = [...products];
let currentFilters = {
    search: ''
};

// Função para mostrar loading
function showLoading() {
    loading.style.display = 'block';
    productsGrid.innerHTML = '';
    noResults.style.display = 'none';
}

// Função para esconder loading
function hideLoading() {
    loading.style.display = 'none';
}

// Função para filtrar produtos
function filterProducts() {
    showLoading();
    
    setTimeout(() => {
        let filtered = [...products];
        
        // Filtro por texto de pesquisa
        if (currentFilters.search) {
            const searchTerm = currentFilters.search.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }
        

        
        currentProducts = filtered;
        displayProducts();
        hideLoading();
    }, 500);
}

// Função para exibir produtos
function displayProducts() {
    if (currentProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products-message">
                <i class="fas fa-box-open"></i>
                <h3>Nenhum produto cadastrado</h3>
                <p>Adicione produtos no painel administrativo para vê-los aqui</p>
                <a href="admin.html" class="btn-primary">
                    <i class="fas fa-cog"></i>
                    Ir para o Painel Admin
                </a>
            </div>
        `;
        noResults.style.display = 'none';
        resultsCount.textContent = '0';
        return;
    }
    
    noResults.style.display = 'none';
    resultsCount.textContent = currentProducts.length;
    
    productsGrid.innerHTML = currentProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="image-placeholder" style="display: none;">
                    <i class="fas fa-tshirt"></i>
                    <span>${product.name}</span>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="price">${product.price}</span>
                </div>
                <div class="stock-status">
                    <span class="status-badge ${getStockBadgeClass(product.stockQuantity)}">${product.stockQuantity} em estoque</span>
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="openProductModal(${product.id})">
                        <i class="fas fa-eye"></i>
                        Ver Detalhes
                    </button>
                    <button class="btn-secondary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}



// Função para obter classe do badge baseada na quantidade
function getStockBadgeClass(quantity) {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= 5) return 'low-stock';
    return 'in-stock';
}

// Função para abrir modal do produto
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Preencher modal com dados do produto
    const modalImage = document.getElementById('modalProductImage');
    modalImage.src = product.image;
    modalImage.onerror = function() {
        this.style.display = 'none';
        const placeholder = this.nextElementSibling;
        if (placeholder) {
            placeholder.style.display = 'flex';
            placeholder.querySelector('span').textContent = product.name;
        }
    };
    
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price;
    
    const statusBadge = document.querySelector('#modalStockStatus .status-badge');
    statusBadge.textContent = `${product.stockQuantity} em estoque`;
    statusBadge.className = `status-badge ${getStockBadgeClass(product.stockQuantity)}`;
    
    // Modal apenas para visualização
    modal.style.display = 'block';
}

// Função para fechar modal
function closeProductModal() {
    modal.style.display = 'none';
}

// Funções de compra removidas - apenas visualização

// Event listeners
searchInput.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    filterProducts();
});

searchBtn.addEventListener('click', () => {
    filterProducts();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        filterProducts();
    }
});



// Fechar modal
closeModal.addEventListener('click', closeProductModal);

// Fechar modal clicando fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProductModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProductModal();
    }
});

// Função para simular busca em tempo real
function simulateRealTimeSearch() {
    // Simular delay de rede
    const searchDelay = 300;
    let searchTimeout;
    
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterProducts();
        }, searchDelay);
    });
}

// Função para adicionar animações suaves
function addSmoothAnimations() {
    // Adicionar animação de entrada aos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards de produtos
    function observeProductCards() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Chamar após exibir produtos
    const originalDisplayProducts = displayProducts;
    displayProducts = function() {
        originalDisplayProducts();
        setTimeout(observeProductCards, 100);
    };
}

// Função para adicionar funcionalidades extras
function addExtraFeatures() {
    // Adicionar tooltip aos botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.title) return;
        
        const text = button.textContent.trim();
        if (text.includes('Ver Detalhes')) {
            button.title = 'Clique para ver mais detalhes do produto';
        } else if (text.includes('Favoritar')) {
            button.title = 'Adicionar à lista de desejos';
        } else if (text.includes('Comprar')) {
            button.title = 'Adicionar ao carrinho de compras';
        }
    });
    
    // Adicionar contador de caracteres no campo de busca
    const searchWrapper = document.querySelector('.search-input-wrapper');
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = `
        position: absolute;
        right: 4rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8rem;
        color: var(--text-muted);
    `;
    searchWrapper.appendChild(charCounter);
    
    searchInput.addEventListener('input', () => {
        const length = searchInput.value.length;
        charCounter.textContent = length > 0 ? `${length}/100` : '';
    });
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

// Função para mostrar mensagem do pedido
function showOrderMessage(message) {
    // Criar modal do pedido
    const orderModal = document.createElement('div');
    orderModal.className = 'modal';
    orderModal.id = 'orderModal';
    orderModal.style.display = 'block';
    
    orderModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-ticket-alt"></i> Criar Ticket de Pagamento</h3>
                <span class="close-modal" onclick="closeOrderModal()">&times;</span>
            </div>
            
            <div class="modal-body">
                <div class="order-message">
                    <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                        <i class="fas fa-info-circle"></i>
                        O Discord foi aberto no canal de tickets de pagamento. Copie a mensagem abaixo e cole no canal:
                    </p>
                    
                    <div class="message-box">
                        <textarea id="orderMessage" readonly>${message}</textarea>
                        <button onclick="copyOrderMessage()" class="btn-primary">
                            <i class="fas fa-copy"></i>
                            Copiar Mensagem
                        </button>
                    </div>
                    
                    <div class="order-actions">
                        <a href="https://discord.com/channels/1399038252857692181" target="_blank" class="btn-secondary">
                            <i class="fab fa-discord"></i>
                            Abrir Canal de Tickets
                        </a>
                        <button onclick="closeOrderModal()" class="btn-primary">
                            <i class="fas fa-check"></i>
                            Ticket Criado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(orderModal);
}

// Fechar modal do pedido
function closeOrderModal() {
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.remove();
    }
}

// Copiar mensagem do pedido
function copyOrderMessage() {
    const textarea = document.getElementById('orderMessage');
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Para dispositivos móveis
    
    try {
        document.execCommand('copy');
        showSuccessMessage('Mensagem copiada para a área de transferência!');
    } catch (err) {
        // Fallback para navegadores modernos
        navigator.clipboard.writeText(textarea.value).then(() => {
            showSuccessMessage('Mensagem copiada para a área de transferência!');
        }).catch(() => {
            alert('Copie manualmente a mensagem do campo acima.');
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Limpar produtos padrão se necessário
    clearDefaultProducts();
    
    // Carregar produtos do localStorage
    loadProductsFromStorage();
    
    // Carregar carrinho do localStorage
    loadCart();
    
    // Atualizar produtos filtrados
    currentProducts = [...products];
    
    // Exibir todos os produtos inicialmente
    displayProducts();
    
    // Adicionar funcionalidades extras
    addExtraFeatures();
    addSmoothAnimations();
    simulateRealTimeSearch();
    
    // Focar no campo de busca
    searchInput.focus();
    
    console.log('STORE ONLINE inicializado com sucesso!');
    console.log(`Total de produtos: ${products.length}`);
});

// Função para exportar dados (para desenvolvimento)
function exportProductData() {
    console.log('Dados dos produtos:', products);
    console.log('Produtos filtrados:', currentProducts);
    console.log('Filtros ativos:', currentFilters);
}

// Função para verificar atualizações no localStorage
function checkForUpdates() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        const newProducts = JSON.parse(savedProducts);
        if (JSON.stringify(products) !== JSON.stringify(newProducts)) {
            console.log('Detectada mudança nos produtos - atualizando...');
            products = newProducts;
            currentProducts = [...products];
            filterProducts(); // Re-aplicar filtros atuais
        }
    }
}

// Verificar atualizações a cada 2 segundos
setInterval(checkForUpdates, 2000);

// Sistema do Carrinho
let cart = [];

// Carregar carrinho do localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Atualizar contador do carrinho
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    showSuccessMessage('Produto adicionado ao carrinho!');
}

// Abrir modal do carrinho
function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        cartSummary.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="image-placeholder" style="display: none;">
                        <i class="fas fa-tshirt"></i>
                    </div>
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        updateCartTotal();
    }
    
    cartModal.style.display = 'block';
}

// Fechar modal do carrinho
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Atualizar quantidade
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            openCart(); // Recarregar modal
        }
    }
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    openCart(); // Recarregar modal
}

// Limpar carrinho
function clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        saveCart();
        closeCart();
        showSuccessMessage('Carrinho limpo!');
    }
}

// Atualizar total do carrinho
function updateCartTotal() {
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        return sum + (price * item.quantity);
    }, 0);
    
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Carrinho vazio!');
        return;
    }
    
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        return sum + (price * item.quantity);
    }, 0);
    
    // Criar mensagem para o Discord
    let message = `🛒 **PEDIDO - STORE ONLINE**\n\n`;
    message += `**Itens do pedido:**\n`;
    
    cart.forEach(item => {
        message += `• ${item.name} - ${item.price} x${item.quantity}\n`;
    });
    
    message += `\n**Total: R$ ${total.toFixed(2).replace('.', ',')}**\n\n`;
    message += `📝 **Informações do cliente:**\n`;
    message += `Nome: [Digite seu nome]\n`;
    message += `Endereço: [Digite seu endereço]\n`;
    message += `Telefone: [Digite seu telefone]\n\n`;
    message += `⏰ **Data:** ${new Date().toLocaleDateString('pt-BR')}\n`;
    message += `🕐 **Hora:** ${new Date().toLocaleTimeString('pt-BR')}\n\n`;
    message += `🎫 **CANAL:** <#1399038252857692181>\n`;
    message += `_Envie esta mensagem no canal de tickets de pagamento!_`;
    
    // Abrir Discord no canal específico de tickets
    const discordUrl = 'https://discord.com/channels/1399038252857692181';
    
    // Tentar abrir Discord no canal específico
    window.open(discordUrl, '_blank');
    
    // Mostrar mensagem para o usuário copiar
    const messageToShow = `📋 **COPIE A MENSAGEM ABAIXO E COLE NO DISCORD:**\n\n${message}`;
    
    // Criar modal com a mensagem
    showOrderMessage(messageToShow);
    
    // Limpar carrinho após mostrar a mensagem
    cart = [];
    saveCart();
    closeCart();
}

// Função para atualizar produtos manualmente
function refreshProducts() {
    console.log('Atualizando produtos manualmente...');
    loadProductsFromStorage();
    currentProducts = [...products];
    filterProducts();
    
    // Feedback visual
    const refreshBtn = document.getElementById('refreshBtn');
    const originalText = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-check"></i> Atualizado!';
    refreshBtn.style.background = 'var(--success)';
    
    setTimeout(() => {
        refreshBtn.innerHTML = originalText;
        refreshBtn.style.background = '';
    }, 2000);
}

// Função para limpar produtos padrão (executar uma vez)
function clearDefaultProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        const products = JSON.parse(savedProducts);
        // Se há produtos salvos, não fazer nada
        console.log('Produtos já existem no localStorage');
    } else {
        // Se não há produtos, limpar qualquer dado antigo
        localStorage.removeItem('products');
        console.log('localStorage limpo - pronto para novos produtos');
    }
} 