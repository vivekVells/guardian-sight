class HeaderSummarizer {
  public async summarize(text: string): Promise<string> {
    const defaultArg = {
      type: "tl;dr",
      format: "plain-text",
      length: "medium",
    };
    // @ts-ignore
    const _ai = await window.ai.summarizer.create(defaultArg);

    const summarized = await _ai.summarize(text);
    await _ai.destroy();

    console.log("[ai-summarizer] for text: ", text);

    console.info("[ai-summarizer] Summarized Header Content: ", summarized);
    return summarized;
  }
}

export default HeaderSummarizer;
