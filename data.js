// Mock data for Lost and Found items
const mockItems = [
    {
        id: 1,
        name: "Black Backpack",
        description: "Found in the library, contains textbooks and a laptop. Navy blue with Nike logo.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        type: "found",
        tags: ["bag", "electronics", "clothing"],
        date: "2024-01-15",
        location: "Library - 2nd Floor",
        comments: []
    },
    {
        id: 2,
        name: "Car Keys with Keychain",
        description: "Lost my car keys with a yellow/green keychain and multiple keys attached.",
        image: "https://images.unsplash.com/photo-1576411666423-53e284986604?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "lost",
        tags: ["keys", "car"],
        date: "2024-01-14",
        location: "Student Union",
        comments: []
    },
    {
        id: 3,
        name: "Black Denim Jacket",
        description: "Found a denim jacket left in the cafeteria. Black with some patches.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        type: "found",
        tags: ["clothing", "jacket"],
        date: "2024-01-13",
        location: "Cafeteria",
        comments: []
    },
    {
        id: 4,
        name: "Wireless Earbuds",
        description: "Lost my white wireless earbuds case somewhere on campus. Has initials 'J.D.' on it.",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
        type: "lost",
        tags: ["electronics", "earbuds"],
        date: "2024-01-12",
        location: "Unknown",
        comments: []
    },
    {
        id: 5,
        name: "Student ID Card",
        description: "Found a student ID card. Please contact if it's yours with your full name.",
        image: "https://images.unsplash.com/photo-1637070155805-e6fbee6ec2cf?q=80&w=1796&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "found",
        tags: ["id", "card"],
        date: "2024-01-11",
        location: "Parking Lot A",
        comments: []
    },
    {
        id: 6,
        name: "Water Bottle",
        description: "Lost my Hydro Flask water bottle - green with stickers on the cap.",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
        type: "lost",
        tags: ["bottle", "water"],
        date: "2024-01-10",
        location: "Gym",
        comments: []
    },
    {
        id: 7,
        name: "Laptop Charger",
        description: "Found a MacBook charger left in a classroom.",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "found",
        tags: ["electronics", "charger", "laptop"],
        date: "2024-01-09",
        location: "Salazar Hall - Room 204",
        comments: []
    },
    {
        id: 8,
        name: "Umbrella",
        description: "Lost my black umbrella with wooden handle during the rain.",
        image: "https://images.unsplash.com/photo-1632973541997-971a2eb8331d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "lost",
        tags: ["umbrella", "other"],
        date: "2024-01-08",
        location: "Between Buildings 3 and 4",
        comments: []
    },
    {
        id: 9,
        name: "Glasses",
        description: "Found a pair of glasses in the library reading area.",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
        type: "found",
        tags: ["glasses", "case"],
        date: "2024-01-07",
        location: "Library - Reading Area",
        comments: []
    },
    {
        id: 10,
        name: "Wallet",
        description: "Lost my brown leather wallet. Contains driver's license and cards. My name is Arman Kani",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
        type: "lost",
        tags: ["wallet", "other"],
        date: "2024-01-06",
        location: "Campus Center",
        comments: []
    },
    {
        id: 11,
        name: "Camera",
        description: "Found a camera left near the bike rack.",
        image: "https://images.unsplash.com/photo-1521499892833-773a6c6fd0b8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "found",
        tags: ["camera", "electronics"],
        date: "2024-01-05",
        location: "In the hallways near Building 5",
        comments: []
    },
    {
        id: 12,
        name: "Textbook",
        description: "Lost my textbook. Has my name written inside first page. My name is Sarah Lee.",
        image: "https://images.unsplash.com/photo-1576797371181-97b48d7f6550?q=80&w=1670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "lost",
        tags: ["book", "textbook"],
        date: "2024-01-04",
        location: "Mathematics Building",
        comments: []
    }
];

// Most searched items this week (mock analytics data)
const mostSearchedItems = [
    { name: "Keys", count: 45 },
    { name: "Backpack", count: 38 },
    { name: "Electronics", count: 32 },
    { name: "ID Card", count: 28 },
    { name: "Jacket", count: 22 }
];

// Popular tags (mock analytics data)
const popularTagsData = [
    { tag: "keys", count: 52 },
    { tag: "electronics", count: 48 },
    { tag: "bag", count: 41 },
    { tag: "clothing", count: 35 },
    { tag: "jacket", count: 29 },
    { tag: "charger", count: 24 }
];

