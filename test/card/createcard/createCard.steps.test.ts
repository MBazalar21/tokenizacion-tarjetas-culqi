import { defineFeature, loadFeature } from 'jest-cucumber';
import { IncomingMessage, ServerResponse } from 'http';
import { Readable } from 'stream';
import { createCardController } from '../../../src/modules/card/controllers/card.controller';
import input from './input/createCard.input.json';
import output from './output/createCard.output.json';
import { CardService } from '../../../src/modules/card/services/card.service';
import { ICard } from '../../../src/core/interfaces/card/ICard';

const feature = loadFeature(__dirname+'/features/createCard.feature');

defineFeature(feature, test => {
  let req: IncomingMessage;
  let res: ServerResponse;
  let responseData: any = '';
  let statusCode: number = 0;

  test('Crear tarjeta con datos válidos', ({ given, when, then }) => {
    given('los datos de la tarjeta son válidos', () => {
      const body = JSON.stringify(input);

      req = Object.assign(new Readable(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        on: function (event: string, callback: (chunk: any) => void) {
          if (event === 'data') callback(body);
          if (event === 'end') callback('');
        }
      }) as unknown as IncomingMessage;

      res = {
        writeHead: (code: number) => {
          statusCode = code;
        },
        end: (chunk?: any) => {
          responseData = JSON.parse(chunk!.toString());
        }
      } as unknown as ServerResponse;

      jest.spyOn(CardService.prototype, 'createCard').mockResolvedValue(output as ICard);
    });

    when('realizo una petición POST a /card', async () => {
      await createCardController(req, res);
    });

    then('el sistema debe responder con los datos de la tarjeta creada y un código 201', () => {
      console.log(responseData)
      expect(statusCode).toBe(201);
      expect(responseData).toEqual(output);
    });
  });
});