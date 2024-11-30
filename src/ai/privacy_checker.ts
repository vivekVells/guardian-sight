import { createAISession, prepare_prompt } from ".";
import { PRIVACY_CHECKER_PROMPT_TEMPLATE } from "./prompts/privacy_checker";

export const ROLE = "privacy_checker";

const initialize = async (reuse_session: boolean = true) => {
  return await createAISession(ROLE, {}, reuse_session);
};

type Config = {
  reuse_session: boolean;
};

// Ensure to always use new session for signup statement checker
export const run_privacy_checker = async (
  statements: string,
  { reuse_session }: Config
) => {
  console.log("Received DOM content: ", statements);
  const privacy_checker_session = await initialize(reuse_session);
  const PROMPT = prepare_prompt(PRIVACY_CHECKER_PROMPT_TEMPLATE, statements);
  console.log("running prompt: ", PROMPT);
  const response = await privacy_checker_session.prompt(PROMPT);
  console.log("AI LLM Response: ", response);
  return response;
};
