import { Tags } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

import { Backup } from './backup.js';
import { getGitBuildInfo } from './build.js';
import { TagKeys } from './constants.js';
import { TagsData } from './data.js';
import { LogStreaming } from './log-streaming.js';
import { ResponderTeam } from './responder-teams.js';
import { SecurityClassification } from './security.js';

export const Impacts = ['significant', 'moderate', 'minor'] as const;
export type Impact = (typeof Impacts)[number];

export interface TagsBase {
  /**
   * Environment of the resource
   *
   * @example 'prod'
   *
   * @see AwsEnv in @linz/accounts
   */
  environment: 'nonprod' | 'preprod' | 'prod' | 'postprod';

  /**
   * Application name
   *
   * @example "basemaps"
   */
  application: string;

  /**
   * LINZ group that the resources belong to
   */
  group: 'step' | 'li';

  /**
   * Git repository that this construct belongs to
   *
   * @example
   * ```typescript
   * "linz/basemaps"
   * "linz/lds-cache"
   * ```
   *
   * Uses the $GITHUB_REPOSITORY env var by default
   *
   * @default "$GITHUB_REPOSITORY"
   */
  repository?: string;

  /**
   * Security classification of the construct
   *
   * @see https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/
   */
  classification: SecurityClassification;

  /**
   * Operational impact of the resources on runtime overall system
   * @see https://toitutewhenua.atlassian.net/wiki/spaces/STEP/pages/524059414/OpsGenie+Incident+Priority+Matrix
   */
  impact: Impact;

  /**
   * THe responder team listed in OpsGenie.
   * @see https://toitutewhenua.app.opsgenie.com/teams/list
   */
  responderTeam?: ResponderTeam;
  /**
   * skip collection of git info, commit, version etc
   * @default false
   */
  skipGitInfo?: boolean;

  /** Data classification tags */
  data?: TagsData;

  /** Backup requirements */
  backup?: Backup;
  /** Log streaming tags */
  log_streaming?: LogStreaming;
}

// Apply a tag but skip application of tag if the value is undefined or empty
function tag(construct: IConstruct, key: string, value: string | undefined | null): void {
  if (value == null) return;
  if (value === '') return;

  Tags.of(construct).add(key, value);
}

export function applyTags(construct: IConstruct, ctx: TagsBase): void {
  // TODO is this check valid here?
  if (ctx.data?.isPublic && ctx.classification !== SecurityClassification.Unclassified) {
    throw new Error('Only unclassified constructs can be made public');
  }
  if (!ctx.application.match(RegExp(/^[a-zA-Z0-9 -]+$/))) {
    throw new Error('linz.app.name has to match /^[a-zA-Z0-9 -]+$/');
  }

  const buildInfo = ctx.skipGitInfo ? undefined : getGitBuildInfo();

  // applications tags
  tag(construct, TagKeys.APP_NAME, ctx.application);
  if (buildInfo) tag(construct, TagKeys.APP_VERSION, buildInfo.version);
  tag(construct, TagKeys.ENVIRONMENT, ctx.environment);

  // Ownership tags
  tag(construct, TagKeys.GROUP, ctx.group);
  tag(construct, TagKeys.RESPONDER_TEAM, ctx.responderTeam ?? 'NotSet');
  tag(construct, TagKeys.APP_IMPACT, ctx.impact);

  // Git Tags
  if (buildInfo) tag(construct, TagKeys.GIT_HASH, buildInfo.hash);
  tag(construct, TagKeys.GIT_REPOSITORY, process.env['GITHUB_REPOSITORY'] ?? ctx.repository);

  // Github actions build information
  if (buildInfo) tag(construct, TagKeys.BUILD_ID, buildInfo.buildId);

  // Security
  tag(construct, TagKeys.SECURITY_CLASSIFICATION, ctx.classification);
  if (ctx.data) applyTagsData(construct, ctx.data);

  // Backup
  if (ctx.backup) applyTagsBackup(construct, ctx.backup);
  // Streaming logs
  if (ctx.log_streaming) applyTagsLogStreaming(construct, ctx.log_streaming);
}

export function applyTagsData(construct: IConstruct, tags: TagsData): void {
  tag(construct, TagKeys.DATA_ROLE, tags.role);
  tag(construct, TagKeys.DATA_IS_MASTER, String(tags.isMaster ?? false));
  tag(construct, TagKeys.DATA_IS_PUBLIC, String(tags.isPublic ?? false));
}

// Backup tags
export function applyTagsBackup(construct: IConstruct, tags: Backup): void {
  tag(construct, TagKeys.BACKUP_ENABLED, String(true));
  tag(construct, TagKeys.BACKUP_RETENTION, String(tags.retention ?? '30'));
  tag(construct, TagKeys.BACKUP_SCHEDULE, String(tags.schedule ?? 'daily'));
}

// Streaming logs
export function applyTagsLogStreaming(construct: IConstruct, tags: LogStreaming): void {
  tag(construct, TagKeys.LOGS_STREAMING_FILTER_PATTERN, String(tags.filter_pattern ?? ''));
}
