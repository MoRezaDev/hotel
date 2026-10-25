import { CreatePersonDto } from './create-person.dto.js';

export class UpdatePersonDto implements Partial<Omit<CreatePersonDto, 'password'>> {}
