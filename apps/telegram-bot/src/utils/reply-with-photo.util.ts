import { createReadStream } from 'fs';
import { join } from 'path';
import { ContextInterface } from '../interfaces/context.interface';

export const ReplyWithPhotoUtil = async (
  context: ContextInterface,
  title: string,
  ...paths
): Promise<void> => {
  await context.replyWithPhoto(
    {
      source: createReadStream(join(__dirname, ...paths)),
    },
    {
      caption: title,
      parse_mode: 'HTML',
    },
  );
};
