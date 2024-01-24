import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from './app.service'
import { NotFoundException } from '@nestjs/common'

describe('AppService', () => {
  let appService: AppService
  console.log(appService)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService]
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  describe('getProductsById', () => {
    it('should return a product by ID', () => {
      const productId = 1
      const result = appService.getProductsById(productId)
      expect(result.id).toBe(productId)
    })

    it('should throw NotFoundException if product not found', () => {
      const nonExistentId = 999
      expect(() => appService.getProductsById(nonExistentId)).toThrowError(
        NotFoundException
      )
    })
  })

  describe('getSearch', () => {
    it('should return a list of products based on category', () => {
      const query = 'Electronics'
      const result = appService.getSearch(query)
      expect(result.every((p) => p.category === query)).toBeTruthy()
    })

    it('should return an empty list if no products found for the category', () => {
      const nonExistentQuery = 'NonExistentCategory'
      const result = appService.getSearch(nonExistentQuery)
      expect(result).toEqual([])
    })
  })
})
