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
  /**
   * Should this resource be copied to a backup vault in other regions
   * @defaultValue false
   */
  multiRegionCopy?: boolean;
  /**
   * Should this resource be copied to a central backup vault shared by other accounts
   *
   * Note that the central backup vault is logically air-gapped, so the backup copies cannot be deleted prior to the completion of the retention period.
   * @defaultValue false
   */
  multiAccountCopy?: boolean;
}
