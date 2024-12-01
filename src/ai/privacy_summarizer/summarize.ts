import BulletGenerator from "../bullet_generator/stage";

export const ROLE = "privacy_summarizer";

class PrivacySummarizer {
  private bulletGenerator: BulletGenerator;

  constructor() {
    this.bulletGenerator = new BulletGenerator();
  }

  public async summarizePrivacyPolicy(text: string): Promise<string> {
    const bulletPoints = await this.bulletGenerator.generateBulletPoints(text);
    return bulletPoints;
  }
}

export default PrivacySummarizer;
