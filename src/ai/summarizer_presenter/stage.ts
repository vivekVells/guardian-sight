import { createAISession, prepare_prompt } from "..";
import { SUMMARIZER_PRESENTER_PROMPT_TEMPLATE } from "./prompt";

export const ROLE = "summarizer_presenter";

class SummarizerPresenter {
  public async summarizeAndPresent(text: string): Promise<string> {
    const _ai = await createAISession(ROLE, {}, false);
    const prompt = prepare_prompt(SUMMARIZER_PRESENTER_PROMPT_TEMPLATE, text);
    const response = _ai.prompt(prompt);
    return response;
  }
}

export default SummarizerPresenter;
