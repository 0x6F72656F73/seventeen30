function waitFor(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function retry(promise: () => Promise<Response>, onRetry: (retryNumber: number, timeToWait: number) => void, maxRetries: number, setOnError: (value: boolean) => void) {
  async function retryWithBackoff(retries: number): Promise<any> {
    // wait 15 seconds, 30 seconds, 60 seconds
    const timeToWait = retries * 15000;
    try {
      // Make sure we don't wait on the first attempt
      if (retries > 0) {
        console.log(`waiting for ${timeToWait}ms...`);
        await waitFor(timeToWait);
      }
      const x = await promise();
      const reader = x.body!.pipeThrough(new TextDecoderStream()).getReader();

      const { value } = await reader.read();
      if (value) {
        // console.log(value);
        return [reader, value];
      } else {
        throw new Error('done');
      }

    } catch (e) {
      if (retries < maxRetries) {
        onRetry(retries + 1, timeToWait);
        setOnError(true);
        return retryWithBackoff(retries + 1);
      } else {
        console.warn("Max retries reached. Bubbling the error up");
        throw e;
      }
    }
  }

  return retryWithBackoff(0);
}

export default retry;