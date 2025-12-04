# Cal State LA Lost & Found

A responsive Digital Lost and Found web application for California State University, Los Angeles. This community-focused platform helps students and staff reunite with lost items through an intuitive interface with tags, images, and interactive comments.

## Features

### Core Functionality
- **Scrollable Gallery**: Browse all lost and found items in a beautiful card-based layout
- **Search & Filter**: Search by keywords or filter by item type (Lost/Found) and tags
- **Item Cards**: Each item displays:
  - Image thumbnail
  - Item name and description
  - Type badge (Lost/Found)
  - Location information
  - Tags for easy categorization
  - Expandable comment section
- **Interactive Comments**: Click "Comment / Ask" to expand a section where users can leave questions or comments
- **Most Searched Items**: Sidebar showing the most searched item types this week
- **Popular Tags**: Display of trending tags with search counts

### Design Highlights
- **Modern UI**: Clean, community-focused design inspired by marketplace and social feed layouts
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Cal State LA Branding**: Uses university colors (blue and gold)
- **Smooth Interactions**: Hover effects, transitions, and animations for better UX

### Placeholder Components
- **Upload Modal**: Placeholder for reporting new lost/found items
- **Comment Modal**: Placeholder for detailed comment viewing
- **Popular Tags Widget**: Interactive tag display with click-to-filter functionality

## File Structure

```
Digital-Lost-Found-Board/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js             # Application logic and interactions
├── data.js            # Mock data (items, popular searches, tags)
└── README.md          # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or build tools required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser

### Usage
- **Search**: Type in the search bar to find items by name, description, or tags
- **Filter**: Click filter chips to show specific item types or tags
- **View Details**: Each card shows all item information
- **Comment**: Click "Comment / Ask" button to expand the comment section
- **Tag Navigation**: Click on any tag (in cards or sidebar) to filter by that tag

## Mock Data

The application comes with 12 sample items including:
- Backpacks and bags
- Keys and keychains
- Electronics (laptops, chargers, earbuds)
- Clothing items (jackets, etc.)
- Personal items (ID cards, wallets, water bottles)

All data is stored in `data.js` and can be easily modified or replaced with real data from an API.

## Customization

### Adding New Items
Edit `data.js` and add objects to the `mockItems` array:
```javascript
{
    id: 13,
    name: "Item Name",
    description: "Description here",
    image: "image-url.jpg",
    type: "lost", // or "found"
    tags: ["tag1", "tag2"],
    date: "2024-01-16",
    location: "Location on campus",
    comments: []
}
```

### Modifying Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #004182;      /* Cal State LA blue */
    --secondary-color: #ffc72c;    /* Cal State LA gold */
    --accent-color: #0066cc;       /* Accent blue */
}
```

## Future Enhancements

Potential features to implement:
- User authentication system
- Image upload functionality
- Backend API integration
- Email notifications
- Item claiming system
- Admin dashboard
- Map integration for location visualization
- Image gallery for multiple photos

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

Built with ❤️ for the Cal State LA community
