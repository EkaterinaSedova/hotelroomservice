import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createImage(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve('./resources')
            fs.writeFile(path.join(filePath, fileName), file.buffer, (err) => {
                if (err) throw new HttpException("Ошибка при сохранении файла", HttpStatus.INTERNAL_SERVER_ERROR);
            })
            return fileName;
        } catch (e) {
            throw new HttpException("Ошибка при сохранении файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
