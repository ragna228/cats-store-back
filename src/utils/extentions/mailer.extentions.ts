import { ISendMailOptions } from '@nestjs-modules/mailer';

export const getMailerConfig = (
  email: string,
  code: number,
): ISendMailOptions => {
  return {
    to: email,
    subject: 'Подтверждение почты',
    template: 'verify',
    context: {
      code: code,
    },
  };
};
