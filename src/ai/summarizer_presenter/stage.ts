import { createAISession, prepare_prompt } from "..";
import { SUMMARIZER_PRESENTER_PROMPT_TEMPLATE } from "./prompt";

export const ROLE = "summarizer_presenter";

class SummarizerPresenter {
  public async summarizeAndPresent(text: string): Promise<string> {
    const _ai = await createAISession(ROLE, { temperature: 0, topK: 1}, false);
    const prompt = prepare_prompt(SUMMARIZER_PRESENTER_PROMPT_TEMPLATE, text);
    const response = await _ai.prompt(prompt);
    await _ai.destroy();
    return response;
  }
}

export default SummarizerPresenter;
