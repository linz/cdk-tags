import { Tags } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

import { Backup } from './backup.js';
import { getGitBuildInfo } from './build.js';
import { TagsData } from './data.js';
import { ResponderTeam } from './responder-teams.js';
import { SecurityClassification } from './security.js';

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
  impact: 'significant' | 'moderate' | 'minor';

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

  backup?: Backup;
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
  tag(construct, 'linz.app.name', ctx.application);
  if (buildInfo) tag(construct, 'linz.app.version', buildInfo.version);
  tag(construct, 'linz.environment', ctx.environment);

  // Ownership tags
  tag(construct, 'linz.group', ctx.group);
  tag(construct, 'linz.responder.team', ctx.responderTeam ?? 'NotSet');
  tag(construct, 'linz.app.impact', ctx.impact);

  // Backup tags

  // Git Tags
  if (buildInfo) tag(construct, 'linz.git.hash', buildInfo.hash);
  tag(construct, 'linz.git.repository', process.env['GITHUB_REPOSITORY'] ?? ctx.repository);

  // Github actions build information
  if (buildInfo) tag(construct, 'linz.build.id', buildInfo.buildId);

  // Security
  tag(construct, 'linz.security.classification', ctx.classification);
  if (ctx.data) applyTagsData(construct, ctx.data);
  if (ctx.backup) applyTagsBackup(construct, ctx.backup);
}

export function applyTagsData(construct: IConstruct, tags: TagsData): void {
  tag(construct, 'linz.data.role', tags.role);
  tag(construct, 'linz.data.is-master', String(tags.isMaster ?? false));
  tag(construct, 'linz.data.is-public', String(tags.isPublic ?? false));
}

export function applyTagsBackup(construct: IConstruct, tags: Backup): void {
  tag(construct, 'linz.backup.enabled', String(tags.enable ?? false));
  tag(construct, 'linz.backup.retention', String(tags.retention_days ?? '30'));
  const crossAccountEnabled = tags.replication?.enable ?? false;
  tag(construct, 'linz.backup.replication.cross-account', String(crossAccountEnabled));
  if (crossAccountEnabled) {
    tag(construct, 'linz.backup.replication.cross-region', String(tags.replication?.multiregion ?? false));
  }
}
