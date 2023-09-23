import { UseInterceptors, applyDecorators } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

//api-file.decorator.ts
export function ApiFile(fieldName: string = 'file') {
    return applyDecorators(
      UseInterceptors(FileInterceptor(fieldName)),
      ApiConsumes('multipart/form-data'),
      ApiBody({
        schema: {
             type: 'object',
          properties: {
            [fieldName]: { // 👈 this property
              type:'string',
              format: 'binary'
              },
              name: {
                type: 'string'
              },
              price: {
                type: 'number'
              }
          },
        },
      }),
    );
  }