import { describe, it } from 'node:test';

import { App, Stack } from 'aws-cdk-lib';

import { BackupSchedule } from '../backup.js';
import { SecurityClassification } from '../security.js';
import { applyTags } from '../tags.js';

describe('applyTags', () => {
  // If this test breaks the README needs to be updated
  it('should apply example from README.md', () => {
    const stack = new Stack(new App(), 'TestStack');
    applyTags(stack, {
      application: 'basemaps',
      environment: 'prod',
      group: 'li',
      classification: SecurityClassification.Unclassified,
      data: { isMaster: true, isPublic: true, role: 'archive' },
      impact: 'moderate',
      backup: {
        retention: 365,
        schedule: BackupSchedule.WEEKLY,
        multiRegionCopy: true,
        multiAccountCopy: true,
      },
      log_streaming: {
        filter_pattern: 'ERROR',
      },
      dr: {
        drEnabled: true,
      },
    });
  });
});
