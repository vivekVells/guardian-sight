// Privacy checker

import { createAISession } from ".";

export const ROLE = "privacy_checker";

const initialize = async (reuse_session: boolean = true) => {
    return await createAISession(ROLE, {}, reuse_session);
}

export type ConfigKeyType = 'reuse_session';

type Config = Record<ConfigKeyType, any>;

export const run_privacy_checker = async (
    domContent: string,
    config: Config,
) => {
    console.log("Received DOM content: ", domContent);
    const privacy_checker_session = await initialize(config.reuse_session);
    const PROMPT = `IDENTIFY IF THERE IS A REFERENCE TO PRIVACY IN THE TEXT : ${domContent} REPLY WITH ONLY A 'yes' OR 'no'. Keep it lowercased.`;
    console.log("running prompt: ", PROMPT);
    const response = await privacy_checker_session.prompt(PROMPT);
    console.log("AI LLM Response: ", response);
    const lowerResponse = response.toLowerCase(); // Convert to lowercase for case-insensitive comparison

    if (lowerResponse.includes('yes')) {
        return true;
    }
    return false;
};
