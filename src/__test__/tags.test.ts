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
        retention: 365,
        schedule: BackupSchedule.WEEKLY,
      },
    });
  });
});
