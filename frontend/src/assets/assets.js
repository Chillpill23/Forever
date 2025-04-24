import logo from './logo.png'
import aboutImg from './about/about.png'
import contactImg from './contact/contact.png'

import stripeLogo from './stripe_logo.png'

import heroD from './hero/hero-d.png'
import heroM from './hero/hero-m.png'

import p1 from './products/p-1.png'
import p2 from './products/p-2.png'
import p3 from './products/p-3.png'
import p4 from './products/p-4.png'
import p5 from './products/p-5.png'
import p6 from './products/p-6.png'
import p7 from './products/p-7.png'
import p8 from './products/p-8.png'
import p9 from './products/p-9.png'

export const assets = {
  logo,
  aboutImg,
  contactImg,
  stripeLogo,
  heroD,
  heroM,
}

export const products = [
  {
    _id: "p001",
    name: "Women Floral Summer Dress",
    description: "A lightweight floral dress perfect for summer outings and casual events.",
    price: 120,
    image: [p1, p2],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1672531200,
    bestseller: true,
  },
  {
    _id: "p002",
    name: "Men Casual Cotton Shirt",
    description: "A breathable and stylish cotton shirt for everyday wear.",
    price: 90,
    image: [p3, p4],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1672617600,
    bestseller: false,
  },
  {
    _id: "p003",
    name: "Unisex Sports Joggers",
    description: "Comfortable joggers made for fitness and casual wear.",
    price: 80,
    image: [p5, p6],
    category: "Unisex",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1672704000,
    bestseller: true,
  },
  {
    _id: "p004",
    name: "Women Round Neck Cotton T-Shirt",
    description: "Soft and lightweight cotton T-shirt for daily use.",
    price: 50,
    image: [p7, p8],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1672790400,
    bestseller: false,
  },
  {
    _id: "p005",
    name: "Men Slim Fit Denim Jeans",
    description: "Classic denim jeans with a modern slim fit style.",
    price: 150,
    image: [p9, p2],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["M", "L", "XL"],
    date: 1672876800,
    bestseller: true,
  },
  {
    _id: "p006",
    name: "Women High-Waist Leggings",
    description: "Stretchable and comfortable leggings for gym and casual wear.",
    price: 70,
    image: [p4, p5],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: 1672963200,
    bestseller: true,
  },
  {
    _id: "p007",
    name: "Men Hooded Sweatshirt",
    description: "Warm and stylish hoodie for a relaxed look.",
    price: 110,
    image: [p6, p7],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1673049600,
    bestseller: false,
  },
  {
    _id: "p008",
    name: "Women Classic Denim Jacket",
    description: "Trendy denim jacket that pairs well with any outfit.",
    price: 140,
    image: [p8, p9],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1673136000,
    bestseller: true,
  },
  {
    _id: "p009",
    name: "Unisex Cotton Beanie",
    description: "Soft and warm beanie for colder seasons.",
    price: 30,
    image: [p1, p3],
    category: "Unisex",
    subCategory: "Topwear",
    sizes: ["One Size"],
    date: 1673222400,
    bestseller: false,
  },
  {
    _id: "p010",
    name: "Unisex Cotton Beanie",
    description: "Soft and warm beanie for colder seasons.",
    price: 30,
    image: [p1, p3],
    category: "Unisex",
    subCategory: "Accessories",
    sizes: ["One Size"],
    date: 1673222400,
    bestseller: false,
  }
];