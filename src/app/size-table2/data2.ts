import { ProductVM } from './data2.interface';

export const products: ProductVM[] = [
  {
    id: 1,
    product: { amount: 10, color: 'Red', size: 'M' },
    childsProducts: [2, 3],
  },
  {
    id: 2,
    product: { amount: 15, color: 'Blue', size: 'L' },
    childsProducts: [],
  },
  {
    id: 3,
    product: { amount: 5, color: 'Green', size: 'S' },
    childsProducts: [],
  },
  {
    id: 4,
    product: { amount: 12, color: 'Red', size: 'XL' },
    childsProducts: [5, 6, 7],
  },
  {
    id: 5,
    product: { amount: 8, color: 'Blue', size: 'M' },
    childsProducts: [],
  },
  {
    id: 6,
    product: { amount: 20, color: 'Green', size: 'L' },
    childsProducts: [],
  },
  {
    id: 7,
    product: { amount: 3, color: 'Red', size: 'S' },
    childsProducts: [],
  },
  {
    id: 8,
    product: { amount: 7, color: 'Blue', size: 'XL' },
    childsProducts: [9, 10],
  },
  {
    id: 9,
    product: { amount: 14, color: 'Green', size: 'M' },
    childsProducts: [],
  },
  {
    id: 10,
    product: { amount: 9, color: 'Red', size: 'L' },
    childsProducts: [],
  },
];
