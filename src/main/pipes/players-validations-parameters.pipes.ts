import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'

export class PlayersValidationsParametersPipes implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(`the parameter value ${metadata.data} must be informed`)
        }
        return value
    }
}