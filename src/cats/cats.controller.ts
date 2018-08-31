import { Controller } from '@nestjs/common';
import { Get, Delete, Put, Post, Query, Body, Param } from '@nestjs/common';
import { HttpCode, Header, HttpException, HttpStatus } from '@nestjs/common';
import { UseFilters } from '@nestjs/common';

import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

import { ForbiddenException } from '../common/exception/forbidden.exception';
import { HttpExceptionFilter } from '../common/exception/HTTP-exception.filter';

@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) { }

  // @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  // async create(@Body() createCatDto: CreateCatDto) {
  //     return 'This action adds a new cat';
  // }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException();
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, 403);
  }

  // @Get()
  // findAll(@Query() query) {
  //     return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
