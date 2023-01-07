export const removePreviousKeyboardMiddleware = (
  context: any,
  next: any,
): any => {
  if (!context?.removePreviouKeyboard) {
    context.removePreviousKeyboard = async (): Promise<void | never> => {
      try {
        await context.answerCbQuery();
        await context.editMessageReplyMarkup({ inline_keyboard: [] });
      } catch (e) {}
    };
  }
  return next();
};
