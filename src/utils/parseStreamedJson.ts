function parseStreamedJSON(streamedData: string) {
  let parsedData = null;
  let extraData = '';
  try {
    // Try to parse the JSON data as a whole
    parsedData = JSON.parse(streamedData);
  } catch (error) {
    // If the JSON parsing fails, handle partial parsing. This occurs when the JSON is streamed in chunks. also return the extra data that was not parsed
    const lastBracketIndex = streamedData.lastIndexOf("]");
    if (lastBracketIndex !== -1) {
      const partialJSON = streamedData.slice(0, lastBracketIndex + 1);
      parsedData = JSON.parse(partialJSON);

      extraData = streamedData.slice(lastBracketIndex + 1);
    }
  }
  return [parsedData, extraData];
}

export default parseStreamedJSON;