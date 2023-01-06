import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class PagesController {
  @Render('index')
  @Get('/')
  @ApiExcludeEndpoint()
  public async indexPage() {
    return {
      test: true,
    };
  }
}
