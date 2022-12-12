export class AboutDto {
  /**
   * Name
   * @example super-duper-service
   */
  public readonly name!: string;

  /**
   * Version
   * @example 1.0.0
   */
  public readonly version!: string;

  /**
   * Env
   * @example prod
   */
  public readonly env!: string;
}
