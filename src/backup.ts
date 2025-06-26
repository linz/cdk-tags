export enum BackupSchedule {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
}

export interface Backup {
  /**
   * How many days should the data be kept.
   * @defaultValue 30
   */
  retention?: number;
  /**
   * How often should this backup run. hourly, daily, weekly
   * @defaultValue daily
   */
  schedule?: BackupSchedule;
}
