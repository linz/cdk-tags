import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import assert from 'node:assert';
import { describe, it } from 'node:test';

import { BackupSchedule } from '../backup.js';
import { TagKeys } from '../constants.js';
import { SecurityClassification } from '../security.js';
import { applyTags } from '../tags.js';

describe('applyTags', () => {
  // If this test breaks the README needs to be updated
  it('should apply example from README.md', () => {
    const stack = new Stack(new App(), 'TestStack');
    new Bucket(stack, 'Bucket');
    applyTags(stack, {
      application: 'basemaps',
      component: 'logging',
      environment: 'prod',
      group: 'li',
      classification: SecurityClassification.Unclassified,
      data: { isMaster: true, isPublic: true, role: 'archive' },
      impact: 'moderate',
      responderTeam: 'LI - Basemaps',
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
        enabled: true,
      },
    });

    const expectedTags = [
      { Key: 'linz.app.name', Value: 'basemaps' },
      { Key: 'linz.app.impact', Value: 'moderate' },
      { Key: 'linz.app.component', Value: 'logging' },
      { Key: 'linz.app.version', Value: Match.stringLikeRegexp('^v[0-9]+') },
      { Key: 'linz.environment', Value: 'prod' },
      { Key: 'linz.group', Value: 'li' },
      { Key: 'linz.responder.team', Value: 'LI - Basemaps' },
      { Key: 'linz.git.hash', Value: Match.stringLikeRegexp('^[a-f0-9]+') },
      { Key: 'linz.security.classification', Value: 'unclassified' },
      { Key: 'linz.data.is-public', Value: 'true' },
      { Key: 'linz.data.is-master', Value: 'true' },
      { Key: 'linz.data.role', Value: 'archive' },
      { Key: 'linz.backup.enabled', Value: 'true' },
      { Key: 'linz.backup.retention', Value: '365' },
      { Key: 'linz.backup.schedule', Value: 'weekly' },
      { Key: 'linz.backup.multiRegionCopy', Value: 'true' },
      { Key: 'linz.backup.multiAccountCopy', Value: 'true' },
      { Key: 'linz.logs.streaming-filter-pattern', Value: 'ERROR' },
      { Key: 'linz.dr.enabled', Value: 'true' },
    ].sort((a, b) => a.Key.localeCompare(b.Key));

    const allowedTags = new Set<string>(Object.values(TagKeys));
    for (const tag of expectedTags) {
      assert.ok(allowedTags.has(tag.Key), `Unknown tag key ${tag.Key}`);
    }

    const template = Template.fromStack(stack);
    const [bucket] = Object.values(template.findResources('AWS::S3::Bucket'));
    assert.strictEqual(bucket?.['Properties']?.Tags?.length, expectedTags.length);

    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.arrayEquals(expectedTags),
    });
  });
});
