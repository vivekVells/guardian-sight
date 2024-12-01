import { createAISession, prepare_prompt } from "..";
import { IMPACT_STATEMENT_PROMPT } from "./prompt";

export const ROLE = "impact_statement_generator";

class ImpactStatementGenerator {
  public async generateImpactStatements(text: string): Promise<Array<string>> {
    const _ai = await createAISession(ROLE, {}, false);
    const prompt = prepare_prompt(IMPACT_STATEMENT_PROMPT, text);
    const response = _ai.prompt(prompt);

    // Split the response into individual impact statements
    const impactStatements = response.split("#$$#");
    // trim each impact statement use map
    impactStatements.map((statement: string) => statement.trim());
    return impactStatements;
  }
}

export default ImpactStatementGenerator;
