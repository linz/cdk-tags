/**
 * Tag key constants used throughout the application
 */
export const TagKeys = {
  // Application tags
  APP_NAME: 'linz.app.name',
  APP_VERSION: 'linz.app.version',
  APP_IMPACT: 'linz.app.impact',

  // Environment tags
  ENVIRONMENT: 'linz.environment',

  // Ownership tags
  GROUP: 'linz.group',
  RESPONDER_TEAM: 'linz.responder.team',

  // Git tags
  GIT_HASH: 'linz.git.hash',
  GIT_REPOSITORY: 'linz.git.repository',

  // Build tags
  BUILD_ID: 'linz.build.id',

  // Security tags
  SECURITY_CLASSIFICATION: 'linz.security.classification',

  // Data tags
  DATA_ROLE: 'linz.data.role',
  DATA_IS_MASTER: 'linz.data.is-master',
  DATA_IS_PUBLIC: 'linz.data.is-public',

  // Backup tags
  BACKUP_ENABLED: 'linz.backup.enabled',
  BACKUP_RETENTION: 'linz.backup.retention',
  BACKUP_SCHEDULE: 'linz.backup.schedule',
  BACKUP_MULTIREGION: 'linz.backup.multiRegionCopy',

  // Logging tags
  LOGS_STREAMING_FILTER_PATTERN: 'linz.logs.streaming-filter-pattern',
} as const;
