import BulletConsolidator from "../bullet_consolidator/stage";
import BulletGenerator from "../bullet_generator/stage";
import SummarizerPresenter from "../summarizer_presenter/bullet_generator/stage";

export const ROLE = "privacy_summarizer";

class PrivacySummarizer {
  private bulletGenerator: BulletGenerator;
  private bulletConsolidator: BulletConsolidator;
  private summarizerPresenter: SummarizerPresenter;

  constructor() {
    this.bulletGenerator = new BulletGenerator();
    this.bulletConsolidator = new BulletConsolidator();
    this.summarizerPresenter = new SummarizerPresenter();
  }

  public async summarizePrivacyPolicy(text: string): Promise<string> {
    const bulletPoints = await this.bulletGenerator.generateBulletPoints(text);
    const bulletPointsConsolidated =
      await this.bulletConsolidator.consolidateBulletPoints(bulletPoints);
    const summary = await this.summarizerPresenter.summarizeAndPresent(
      bulletPointsConsolidated
    );
    return summary;
  }
}

export default PrivacySummarizer;
