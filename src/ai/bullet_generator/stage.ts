import CAG from "../cag/interface";
import { BULLET_GENERATOR_PROMPT_TEMPLATE } from "./prompt";

export const ROLE = "bullet_generator";

class BulletGenerator {
  private cag: CAG;

  constructor() {
    this.cag = new CAG(
      {
        chunkSize: 3000,
        chunkOverlap: 100,
      },
      BULLET_GENERATOR_PROMPT_TEMPLATE
    );
  }

  public async generateBulletPoints(text: string): Promise<string> {
    const response = this.cag.generate_sequential(text);
    return response;
  }
}

export default BulletGenerator;
