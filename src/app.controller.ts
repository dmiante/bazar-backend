import { Controller, Get, Param, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { Product } from './interfaces/product.interface'

@Controller('items')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findById(@Param('id') id: number): Product {
    const findProduct = this.appService.getProductsById(+id)
    return findProduct
  }

  @Get()
  findProducts(@Query('q') query: string): Product[] {
    const data = this.appService.getSearch(query)
    return data
  }
}
