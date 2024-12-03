import { createAISession } from "..";
import { IMPACT_STATEMENT_PROMPT } from "./prompt";

export const ROLE = "impact_statement_generator";

class ImpactStatementGenerator {
  public async generateImpactStatements(): Promise<Array<string>> {
    const _ai = await createAISession(ROLE, {}, false);
    const response = await _ai.prompt(IMPACT_STATEMENT_PROMPT);
    await _ai.destroy();

    // Split the response into individual impact statements
    const impactStatements = response.split("#$$#");
    // trim each impact statement use map
    impactStatements.map((statement: string) => statement.trim());
    return impactStatements;
  }
}

export default ImpactStatementGenerator;
