export function expectThrows(fn, msgPart) {
  let threw = false;
  try {
    fn();
  } catch (err) {
    threw = true;
    if (msgPart && !String(err.message).includes(msgPart)) {
      throw new Error(`Expected error containing '${msgPart}', got '${err.message}'`);
    }
  }

  if (!threw) {
    throw new Error('Expected function to throw');
  }
}
