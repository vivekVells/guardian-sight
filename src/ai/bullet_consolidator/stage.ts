import CAG from "../cag/interface";
import { BULLET_CONSOLIDATOR_PROMPT_TEMPLATE } from "./prompt";

export const ROLE = "bullet_consolidator";

class BulletConsolidator {
  private cag: CAG;

  constructor() {
    this.cag = new CAG(
      {
        chunkSize: 3000,
        chunkOverlap: 100,
        iteration_limit: 10,
        iteration_output_token_limit: 1000,
      },
      BULLET_CONSOLIDATOR_PROMPT_TEMPLATE
    );
  }

  public async consolidateBulletPoints(text: string): Promise<string> {
    const response = this.cag.generate_recursive(text);
    return response;
  }
}

export default BulletConsolidator;