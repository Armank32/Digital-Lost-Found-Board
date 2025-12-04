// Application State
let allItems = [];
let filteredItems = [];
let currentFilter = 'all';
let searchQuery = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load mock data
    allItems = [...mockItems];
    filteredItems = [...allItems];
    
    // Initialize date input max attribute to today
    const itemDateInput = document.getElementById('itemDate');
    if (itemDateInput) {
        const today = new Date().toISOString().split('T')[0];
        itemDateInput.max = today;
    }
    
    // Render initial UI
    renderItems();
    renderPopularItems();
    renderPopularTags();
    
    // Setup event listeners
    setupEventListeners();
}

// Setup all event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => handleFilter(chip.dataset.filter));
    });
    
    // Upload modal
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeUploadModal = document.getElementById('closeUploadModal');
    
    uploadBtn.addEventListener('click', () => {
        // Set default date to today
        const itemDateInput = document.getElementById('itemDate');
        if (itemDateInput) {
            const today = new Date().toISOString().split('T')[0];
            itemDateInput.value = today;
            itemDateInput.max = today; // Prevent selecting future dates
        }
        uploadModal.classList.add('active');
    });
    
    closeUploadModal.addEventListener('click', () => {
        resetUploadForm();
        uploadModal.classList.remove('active');
    });
    
    uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            resetUploadForm();
            uploadModal.classList.remove('active');
        }
    });
    
    // Cancel button
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    if (cancelUploadBtn) {
        cancelUploadBtn.addEventListener('click', () => {
            resetUploadForm();
            uploadModal.classList.remove('active');
        });
    }
    
    // Form submission
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Image upload and preview
    const itemImageInput = document.getElementById('itemImage');
    if (itemImageInput) {
        itemImageInput.addEventListener('change', handleImageUpload);
        
        // Drag and drop functionality
        const fileUploadLabel = document.querySelector('.file-upload-label');
        if (fileUploadLabel) {
            fileUploadLabel.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadLabel.classList.add('drag-over');
            });
            
            fileUploadLabel.addEventListener('dragleave', () => {
                fileUploadLabel.classList.remove('drag-over');
            });
            
            fileUploadLabel.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadLabel.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    itemImageInput.files = files;
                    handleImageUpload({ target: itemImageInput });
                }
            });
        }
    }
    
    // Remove image button
    const removeImageBtn = document.getElementById('removeImageBtn');
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', removeImage);
    }
    
    // Tags preview
    const itemTagsInput = document.getElementById('itemTags');
    if (itemTagsInput) {
        itemTagsInput.addEventListener('input', handleTagsPreview);
    }
    
    // Comment modal
    const commentModal = document.getElementById('commentModal');
    const closeCommentModal = document.getElementById('closeCommentModal');
    
    closeCommentModal.addEventListener('click', () => {
        commentModal.classList.remove('active');
    });
    
    commentModal.addEventListener('click', (e) => {
        if (e.target === commentModal) {
            commentModal.classList.remove('active');
        }
    });
}

// Handle search input
function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
}

// Handle filter selection
function handleFilter(filter) {
    currentFilter = filter;
    
    // Update active state of filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.filter === filter) {
            chip.classList.add('active');
        }
    });
    
    applyFilters();
}

// Apply search and filter logic
function applyFilters() {
    filteredItems = allItems.filter(item => {
        // Search filter
        const matchesSearch = searchQuery === '' || 
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
            item.location.toLowerCase().includes(searchQuery);
        
        // Type filter
        let matchesFilter = true;
        if (currentFilter === 'lost') {
            matchesFilter = item.type === 'lost';
        } else if (currentFilter === 'found') {
            matchesFilter = item.type === 'found';
        } else if (currentFilter !== 'all') {
            matchesFilter = item.tags.includes(currentFilter.toLowerCase());
        }
        
        return matchesSearch && matchesFilter;
    });
    
    renderItems();
}

// Render items gallery
function renderItems() {
    const gallery = document.getElementById('itemsGallery');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredItems.length === 0) {
        gallery.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    gallery.style.display = 'grid';
    emptyState.style.display = 'none';
    
    gallery.innerHTML = filteredItems.map(item => createItemCard(item)).join('');
    
    // Add event listeners for comment buttons
    filteredItems.forEach(item => {
        const commentBtn = document.getElementById(`commentBtn-${item.id}`);
        const commentSection = document.getElementById(`commentSection-${item.id}`);
        const commentInput = document.getElementById(`commentInput-${item.id}`);
        const commentSubmitBtn = document.getElementById(`commentSubmitBtn-${item.id}`);
        
        if (commentBtn) {
            commentBtn.addEventListener('click', () => {
                toggleCommentSection(item.id);
            });
        }
        
        if (commentSubmitBtn) {
            commentSubmitBtn.addEventListener('click', () => {
                submitComment(item.id);
            });
        }
        
        if (commentInput) {
            commentInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                    submitComment(item.id);
                }
            });
        }
    });
    
    // Add click listeners for tags to filter
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            const tagText = e.target.textContent.replace('#', '').toLowerCase();
            handleFilter(tagText);
            // Scroll to top of gallery
            document.querySelector('.search-filter-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Create item card HTML
function createItemCard(item) {
    const commentsHTML = item.comments && item.comments.length > 0
        ? item.comments.map(comment => `
            <div class="comment-item">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
            </div>
        `).join('')
        : '<p style="color: var(--text-secondary); font-size: 0.85rem;">No comments yet. Be the first to ask a question!</p>';
    
    return `
        <div class="item-card">
            <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="item-content">
                <div class="item-header">
                    <div>
                        <div class="item-name">${escapeHtml(item.name)}</div>
                        <span class="item-type ${item.type}">${item.type}</span>
                    </div>
                </div>
                <p class="item-description">${escapeHtml(item.description)}</p>
                <div class="item-location">
                    📍 ${escapeHtml(item.location)}
                </div>
                <div class="item-tags">
                    ${item.tags.map(tag => `<span class="tag">#${escapeHtml(tag)}</span>`).join('')}
                </div>
                <div class="item-footer">
                    <span class="item-date">${formatDate(item.date)}</span>
                    <button class="btn-secondary" id="commentBtn-${item.id}">
                        💬 Comment / Ask
                    </button>
                </div>
                <div class="comment-section" id="commentSection-${item.id}">
                    <div class="comments-list" id="commentsList-${item.id}">
                        ${commentsHTML}
                    </div>
                    <div class="comment-input-container">
                        <textarea 
                            id="commentInput-${item.id}" 
                            class="comment-input" 
                            placeholder="Ask a question or leave a comment... (Ctrl+Enter to submit)"
                        ></textarea>
                        <button class="comment-submit-btn" id="commentSubmitBtn-${item.id}">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Toggle comment section
function toggleCommentSection(itemId) {
    const commentSection = document.getElementById(`commentSection-${itemId}`);
    if (commentSection) {
        commentSection.classList.toggle('expanded');
        if (commentSection.classList.contains('expanded')) {
            const commentInput = document.getElementById(`commentInput-${itemId}`);
            if (commentInput) {
                setTimeout(() => commentInput.focus(), 100);
            }
        }
    }
}

// Submit comment
function submitComment(itemId) {
    const commentInput = document.getElementById(`commentInput-${itemId}`);
    const commentsList = document.getElementById(`commentsList-${itemId}`);
    
    if (!commentInput || !commentInput.value.trim()) {
        return;
    }
    
    const commentText = commentInput.value.trim();
    const item = allItems.find(i => i.id === itemId);
    
    if (item) {
        if (!item.comments) {
            item.comments = [];
        }
        
        const newComment = {
            author: 'Anonymous User', // In real app, this would be from auth system
            text: commentText,
            date: new Date().toISOString()
        };
        
        item.comments.push(newComment);
        
        // Update UI
        const commentHTML = `
            <div class="comment-item">
                <div class="comment-author">${newComment.author}</div>
                <div class="comment-text">${escapeHtml(newComment.text)}</div>
            </div>
        `;
        
        if (commentsList) {
            // Remove "no comments" message if it exists
            const noCommentsMsg = commentsList.querySelector('p');
            if (noCommentsMsg) {
                noCommentsMsg.remove();
            }
            
            commentsList.insertAdjacentHTML('beforeend', commentHTML);
        }
        
        commentInput.value = '';
    }
}

// Render popular items chart
function renderPopularItems() {
    const popularItemsContainer = document.getElementById('popularItems');
    
    popularItemsContainer.innerHTML = mostSearchedItems.map((item, index) => {
        const maxCount = mostSearchedItems[0].count;
        const percentage = (item.count / maxCount) * 100;
        
        return `
            <div class="popular-item" style="cursor: pointer;" onclick="handleFilter('${item.name.toLowerCase()}')">
                <span class="popular-item-name">${index + 1}. ${item.name}</span>
                <span class="popular-item-count">${item.count}</span>
            </div>
        `;
    }).join('');
}

// Render popular tags
function renderPopularTags() {
    const popularTagsContainer = document.getElementById('popularTags');
    
    popularTagsContainer.innerHTML = popularTagsData.map(tagData => {
        return `
            <span class="popular-tag" onclick="handleFilter('${tagData.tag}')">
                #${tagData.tag}
                <span class="popular-tag-count">${tagData.count}</span>
            </span>
        `;
    }).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today
    
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 365) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make handleFilter globally available for onclick handlers
window.handleFilter = handleFilter;

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const itemType = formData.get('itemType');
    const itemName = formData.get('itemName').trim();
    const itemDescription = formData.get('itemDescription').trim();
    const itemLocation = formData.get('itemLocation').trim();
    const itemDate = formData.get('itemDate');
    const itemImageFile = formData.get('itemImage'); // This is a File object
    const itemTags = formData.get('itemTags').trim();
    
    // Validate required fields
    if (!itemType || !itemName || !itemDescription || !itemLocation || !itemDate || !itemTags) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate date - should not be in the future
    const selectedDate = new Date(itemDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    
    if (selectedDate > today) {
        alert('The date cannot be in the future. Please select a valid date.');
        return;
    }
    
    // Parse tags
    const tags = itemTags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);
    
    if (tags.length === 0) {
        alert('Please add at least one tag.');
        return;
    }
    
    // Handle image upload - convert to data URL
    const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';
    
    if (itemImageFile && itemImageFile.size > 0) {
        // Convert file to base64 data URL
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            createAndAddItem(itemType, itemName, itemDescription, itemLocation, itemDate, imageDataUrl, tags);
        };
        reader.onerror = () => {
            alert('Error reading the image file. The item will be added without an image.');
            createAndAddItem(itemType, itemName, itemDescription, itemLocation, itemDate, defaultImage, tags);
        };
        reader.readAsDataURL(itemImageFile);
    } else {
        // No image provided, proceed without waiting
        createAndAddItem(itemType, itemName, itemDescription, itemLocation, itemDate, defaultImage, tags);
    }
}

// Create and add item (separated to handle async image reading)
function createAndAddItem(itemType, itemName, itemDescription, itemLocation, itemDate, imageDataUrl, tags) {
    // Generate new item ID (use max ID + 1 or 1 if no items)
    const newId = allItems.length > 0 ? Math.max(...allItems.map(item => item.id)) + 1 : 1;
    
    // Create new item object
    const newItem = {
        id: newId,
        name: itemName,
        description: itemDescription,
        image: imageDataUrl,
        type: itemType,
        tags: tags,
        date: itemDate, // User-provided date in YYYY-MM-DD format
        location: itemLocation,
        comments: []
    };
    
    // Add to allItems array
    allItems.unshift(newItem); // Add to beginning
    
    // Reset form
    resetUploadForm();
    
    // Close modal
    const uploadModal = document.getElementById('uploadModal');
    if (uploadModal) {
        uploadModal.classList.remove('active');
    }
    
    // Reset filters and search to show new item
    currentFilter = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.filter === 'all') {
            chip.classList.add('active');
        }
    });
    
    // Re-render items
    applyFilters();
    
    // Show success message
    showNotification(`✅ Item "${itemName}" has been added successfully!`);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset upload form
function resetUploadForm() {
    const form = document.getElementById('uploadForm');
    if (form) {
        form.reset();
        const imagePreview = document.getElementById('imagePreview');
        const tagsPreview = document.getElementById('tagsPreview');
        const fileUploadLabel = document.querySelector('.file-upload-label');
        
        if (imagePreview) {
            imagePreview.style.display = 'none';
        }
        if (tagsPreview) {
            tagsPreview.innerHTML = '';
        }
        if (fileUploadLabel) {
            fileUploadLabel.style.display = 'flex';
        }
    }
}

// Handle image upload
function handleImageUpload(e) {
    const fileInput = e.target;
    const file = fileInput.files[0];
    const previewContainer = document.getElementById('imagePreview');
    const previewImg = document.getElementById('imagePreviewImg');
    const fileUploadLabel = document.querySelector('.file-upload-label');
    
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            fileInput.value = '';
            return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB.');
            fileInput.value = '';
            return;
        }
        
        // Read file and show preview
        const reader = new FileReader();
        reader.onload = (event) => {
            previewImg.src = event.target.result;
            previewContainer.style.display = 'block';
            if (fileUploadLabel) {
                fileUploadLabel.style.display = 'none';
            }
        };
        reader.onerror = () => {
            alert('Error reading the image file.');
            fileInput.value = '';
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.style.display = 'none';
        if (fileUploadLabel) {
            fileUploadLabel.style.display = 'flex';
        }
    }
}

// Remove uploaded image
function removeImage() {
    const fileInput = document.getElementById('itemImage');
    const previewContainer = document.getElementById('imagePreview');
    const fileUploadLabel = document.querySelector('.file-upload-label');
    
    if (fileInput) {
        fileInput.value = '';
    }
    if (previewContainer) {
        previewContainer.style.display = 'none';
    }
    if (fileUploadLabel) {
        fileUploadLabel.style.display = 'flex';
    }
}

// Handle tags preview
function handleTagsPreview(e) {
    const tagsInput = e.target.value.trim();
    const tagsPreview = document.getElementById('tagsPreview');
    
    if (tagsInput) {
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        if (tags.length > 0) {
            tagsPreview.innerHTML = tags.map(tag => 
                `<span class="tag-preview">#${escapeHtml(tag)}</span>`
            ).join('');
        } else {
            tagsPreview.innerHTML = '';
        }
    } else {
        tagsPreview.innerHTML = '';
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

