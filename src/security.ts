/**
 * NZ Security classification
 * @see https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/
 */
export enum SecurityClassification {
  Unclassified = 'unclassified',
  InConfidence = 'in-confidence',
  Sensitive = 'sensitive',
  Restricted = 'restricted',
  Confidential = 'confidential',
  Secret = 'secret',
  TopSecret = 'top-secret',
}
