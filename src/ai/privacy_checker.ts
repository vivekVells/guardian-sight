// Privacy checker

import { createAISession, prepare_prompt } from ".";
import { PRIVACY_CHECKER_PROMPT_TEMPLATE } from "./prompts/privacy_checker";

export const ROLE = "privacy_checker";

const initialize = async (reuse_session: boolean = true) => {
    return await createAISession(ROLE, {}, reuse_session);
}

export type ConfigKeyType = 'reuse_session';

type Config = Record<ConfigKeyType, boolean>;

export const run_privacy_checker = async (
    domContent: string,
    config: Config,
) => {
    console.log("Received DOM content: ", domContent);
    const privacy_checker_session = await initialize(config.reuse_session);
    const PROMPT = prepare_prompt(PRIVACY_CHECKER_PROMPT_TEMPLATE, domContent);
    console.log("running prompt: ", PROMPT);
    const response = await privacy_checker_session.prompt(PROMPT);
    console.log("AI LLM Response: ", response);
    const lowerResponse = response.toLowerCase(); // Convert to lowercase for case-insensitive comparison

    if (lowerResponse.includes('yes')) {
        return true;
    }
    return false;
};
