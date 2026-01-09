export interface NewRelicLogStreaming {
  /**
   * Subscription filter pattern
   * @defaultValue '' (all logs)
   * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html
   */
  filter_pattern?: string;
}
