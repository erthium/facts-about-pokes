import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get(':name')
    async getImage(@Param() params: any): Promise<string> {
        try{
            const name: string = params.name;
            // TODO: check if the url is valid
            return this.imageService.getImageFromDB(name);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('generate/:name')
    async generateImage(@Param() params: any): Promise<string> {
        try {
            const { name } = params;
            const imageUrl: string = await this.imageService.generateImage(name);
            return imageUrl;
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
