import assert from 'node:assert';
import { describe, it } from 'node:test';

import { IConstruct } from 'constructs';

import { BackupSchedule } from '../backup.js';
import { SecurityClassification } from '../security.js';
import { applyTags } from '../tags.js';

describe('applyTags', () => {
  // If this test breaks the README needs to be updated
  it('should apply example from README.md', () => {
    applyTags({} as unknown as IConstruct, {
      application: 'basemaps',
      environment: 'prod',
      group: 'li',
      classification: SecurityClassification.Unclassified,
      data: { isMaster: true, isPublic: true, role: 'archive' },
      impact: 'moderate',
      backup: {
        retention: 30,
        schedule: BackupSchedule.WEEKLY,
        multiRegionCopy: true,
        multiAccountCopy: true,
      },
      log_streaming: {
        filter_pattern: 'ERROR',
      },
    });
  });

  it('should throw error if retention period is negative', () => {
    assert.throws(
      () => {
        applyTags({} as unknown as IConstruct, {
          application: 'basemaps',
          environment: 'prod',
          group: 'li',
          classification: SecurityClassification.Unclassified,
          impact: 'moderate',
          backup: {
            retention: -1,
            schedule: BackupSchedule.WEEKLY,
          },
        });
      },
      (error: Error) => {
        return error.message.includes('Backup retention must be a positive number');
      },
    );
  });

  it('should throw error if retention period is 365 days when multi-account copy is enabled', () => {
    assert.throws(
      () => {
        applyTags({} as unknown as IConstruct, {
          application: 'basemaps',
          environment: 'prod',
          group: 'li',
          classification: SecurityClassification.Unclassified,
          impact: 'moderate',
          backup: {
            retention: 365,
            schedule: BackupSchedule.WEEKLY,
            multiAccountCopy: true,
          },
        });
      },
      (error: Error) => {
        return error.message.includes('Backup retention must be 30 days or less when using multi-account copy');
      },
    );
  });

  it('should throw error if backup schedule is hourly when multi-account copy is enabled', () => {
    assert.throws(
      () => {
        applyTags({} as unknown as IConstruct, {
          application: 'basemaps',
          environment: 'prod',
          group: 'li',
          classification: SecurityClassification.Unclassified,
          impact: 'moderate',
          backup: {
            retention: 30,
            schedule: BackupSchedule.HOURLY,
            multiAccountCopy: true,
          },
        });
      },
      (error: Error) => {
        return error.message.includes('Backup schedule must be one of');
      },
    );
  });

  it('should apply tags if tagging hourly backup for 365 days, when multi-account copy is not enabled', () => {
    applyTags({} as unknown as IConstruct, {
      application: 'basemaps',
      environment: 'prod',
      group: 'li',
      classification: SecurityClassification.Unclassified,
      impact: 'moderate',
      backup: {
        retention: 365,
        schedule: BackupSchedule.HOURLY,
      },
    });
  });
});
