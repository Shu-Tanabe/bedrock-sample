export function summarization(transcript: string) {
  const prompt = `
  Human: 以下に会議で議論された内容を記載します。
    <transcription>${transcript}</transcription>
  <transcription></transcription> XMLタグで囲まれた文字起こし結果を読んだ上で、それを簡潔に要約してください。`;

  return prompt;
}
