// CAG Interface

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { prepare_prompt } from "..";

type CAGConfig = {
  chunkSize: number;
  chunkOverlap: number;
  iteration_limit?: number;
  iteration_output_token_limit?: number;
};

class CAG {
  _ai: any;
  _role: any;
  splitter: RecursiveCharacterTextSplitter;
  prompt_template: string;

  constructor(config: CAGConfig, prompt_template: string) {
    this._ai = null;
    this._role = null;
    this.splitter = this.setupSplitter(config);
    this.prompt_template = prompt_template;
    this.validateConfig(config);
  }

  validateConfig = (config: CAGConfig) => {
    if (config.chunkSize < 1) {
      throw new Error("chunkSize must be greater than 0");
    }
    if (config.chunkOverlap < 0) {
      throw new Error("chunkOverlap must be greater than or equal to 0");
    }
    if (config.iteration_limit) {
      if (config.iteration_limit < 2) {
        throw new Error("iteration_limit must be greater than 1");
      }
      if (config.iteration_limit > 100) {
        throw new Error("iteration_limit must be less than or equal to 100");
      }
    }
    if (
      config.iteration_output_token_limit &&
      config.iteration_output_token_limit < 1
    ) {
      throw new Error("iteration_output_token_limit must be greater than 0");
    }
  };

  setupSplitter = (config: CAGConfig) => {
    return new RecursiveCharacterTextSplitter({
      chunkSize: config.chunkSize,
      chunkOverlap: config.chunkOverlap,
    });
  };

  initialize = async () => {
    // @ts-ignore
    return await window.ai.languageModel.create();
  };

  generate_sequential = async (longInput: string): Promise<string> => {
    this._ai = await this.initialize();
    const chunks = await this.splitter.splitText(longInput);
    console.log("Chunks: ", chunks);
    console.log("Number of chunks: ", chunks.length);
    let output: string[] = [];
    for (const chunk of chunks) {
      console.log("Running chunk number: ", chunk);
      const prompt = prepare_prompt(this.prompt_template, chunk);
      const response = await this._ai.prompt(prompt);
      console.log("Response for chunk", response);
      output.push(response);
    }
    console.log("Output: ", output);
    return output.join("<br>");
  };
}

export default CAG;
