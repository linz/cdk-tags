interface Replication {
  enable: boolean;
  multiregion?: boolean;
}

export interface Backup {
  enable: boolean;
  retention_days?: number;
  replication?: Replication;
}
