import BulletConsolidator from "../bullet_consolidator/stage";
import BulletGenerator from "../bullet_generator/stage";

export const ROLE = "privacy_summarizer";

class PrivacySummarizer {
  private bulletGenerator: BulletGenerator;
  private bulletConsolidator: BulletConsolidator;

  constructor() {
    this.bulletGenerator = new BulletGenerator();
    this.bulletConsolidator = new BulletConsolidator();
  }

  public async summarizePrivacyPolicy(text: string): Promise<string> {
    const bulletPoints = await this.bulletGenerator.generateBulletPoints(text);
    const bulletPointsConsolidated =
      await this.bulletConsolidator.consolidateBulletPoints(bulletPoints);
    return bulletPointsConsolidated;
  }
}

export default PrivacySummarizer;
