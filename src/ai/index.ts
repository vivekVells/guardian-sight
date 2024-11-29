// AI Interface

export type AIRoleType = 'privacy_checker';

const sessionMap: Record<AIRoleType, unknown> = {
    privacy_checker: undefined,
};

const defaultModelArgs = {
  temperature: 1,
  topK: 3,
};

const initializeAISession = async (modelArgs: object) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return await window.ai.languageModel.create({
    ...defaultModelArgs,
    ...modelArgs,
  });
};

export const createAISession = async (
  role: AIRoleType,
  modelArgs: object = {},
  reuse_session: boolean = true,
) => {
  console.log('Before try catch: ', { sessionMap });
  try {
    return (
      (reuse_session && sessionMap[role]) ||
      (sessionMap[role] = await initializeAISession(modelArgs))
    );
  } catch (error) {
    console.error('Error creating AI session:', error);
    return null;
  }
};
