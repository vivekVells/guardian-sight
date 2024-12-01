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
      },
      BULLET_CONSOLIDATOR_PROMPT_TEMPLATE
    );
  }

  public async consolidateBulletPoints(text: string): Promise<string> {
    const response = this.cag.generate_sequential(text);
    return response;
  }
}

export default BulletConsolidator;
