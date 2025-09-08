import {AlwatrFetchStateMachineBase, type FetchOptions} from './base.js';

export abstract class AlwatrJsonFetchStateMachineBase<
  T extends JsonValue = JsonObject,
  ExtraState extends string = never,
  ExtraEvent extends string = never,
> extends AlwatrFetchStateMachineBase<ExtraState, ExtraEvent> {
  protected jsonResponse_?: T;

  protected override async fetch_(options: FetchOptions): Promise<void> {
    await super.fetch_(options);

    let responseText: string;
    try {
      responseText = await this.rawResponse_!.text();
    }
    catch (err) {
      this.logger_.error('fetch_', 'invalid_response_text', err);
      throw err;
    }

    try {
      // TODO: check 304 Not Modified
      this.jsonResponse_ = JSON.parse(responseText);
    }
    catch (err) {
      this.logger_.error('fetch_', 'invalid_response_json', err, {responseText});
      throw err;
    }
  }

  protected override clean_(): void {
    super.clean_();
    delete this.jsonResponse_;
  }
}
