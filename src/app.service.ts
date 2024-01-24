import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './interfaces/product.interface'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class AppService {
  private readonly products: Product[]

  constructor() {
    try {
      const isDev = process.env.NODE_ENV !== 'production'
      // En modo de desarrollo, no usamos 'dist'
      const folderPath = isDev ? '' : 'dist'
      const filePath = path.join(
        __dirname,
        '..',
        folderPath,
        'src',
        'data',
        'products.json'
      )
      const rawData = fs.readFileSync(filePath, 'utf-8')
      const parseData = JSON.parse(rawData)
      this.products = Object.values(parseData.products)
      if (!Array.isArray(this.products)) {
        throw new Error('JSON file is not an array.')
      }
    } catch (error) {
      console.error('Error to load the file', error.message)
      this.products = []
    }
  }

  getProductsById(id: number): Product {
    const product = this.products.find((p) => p.id === id)

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return product
  }

  getSearch(query: string): Product[] {
    const list = this.products.filter((p) => p.category === query)
    console.log(list)
    return list
  }
}
