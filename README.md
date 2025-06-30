# @linzjs/cdk-tags

CDK construct to apply common tags to constructs

## Usage

To apply the common set of tags for a s3 bucket:

```typescript
import { applyTags, SecurityClassification, BackupSchedule } from '@linzjs/cdk-tags';

const bucket = new Bucket(this, 'ImageryArchive');

applyTags(bucket, {
  application: 'basemaps',
  environment: 'prod',
  group: 'li',
  classification: SecurityClassification.Unclassified,
  data: { isMaster: true, isPublic: true, role: 'archive' },
  impact: 'moderate',
  backup: {
    retention: 365,
    schedule: BackupSchedule.WEEKLY
  }
});
```

To apply the common set of tags for multiple constructs:

```typescript
import { applyTags, SecurityClassification, TagsBase } from '@linzjs/cdk-tags';

const commonTags: TagsBase = {
  application: 'basemaps',
  environment: 'prod',
  group: 'li',
  classification: SecurityClassification.Unclassified,
  data: { isMaster: true, isPublic: true, role: 'archive' },
  impact: 'moderate',
};

const bucket1 = new Bucket(this, 'ImageryArchive');
const bucket2 = new Bucket(this, 'AnotherImageryArchive');

applyTags(bucket1, commonTags);
applyTags(bucket2, commonTags);
```

## Contributing

### Responder Teams

Responder teams are used to route alerts to the correct team in OpsGenie. The responder team name must match the team name in OpsGenie.
Only prod ops team members can create, rename or remove responder teams in OpsGenie.

#### Adding responder teams.

Contact the prod ops team in slack at [#team-step-prod-ops](https://linz.enterprise.slack.com/archives/C05Q11EGLA0) to create a new team in [OpsGenie](https://toitutewhenua.app.opsgenie.com/teams/list).
Once this team is created, add a new responder team to `src/responder-teams.ts` file with the new team name. These two names
must match to ensure New Relic alerts are sent to the correct team.

#### Renaming responder teams.

**Warning** Consult the prodOps team regarding renaming a responder team. It is strongly recommended to never rename responder team names as this results in the teams having to apply the new responderTeam value to all their cdk stacks.
When renaming a responder team, contact the prod ops team in slack at [#team-step-prod-ops](https://linz.enterprise.slack.com/archives/C05Q11EGLA0)
once the name as been updated, update `src/responder-teams.ts` to match the new name. And ensure you update the `responderTeam` in your `applyTags()` function across all stack the team owns.

#### Removing responder teams.

When removing a responder team, contact the prod ops team in slack at [#team-step-prod-ops](https://linz.enterprise.slack.com/archives/C05Q11EGLA0)
once the team has been removed, remove the team from `src/responder-teams.ts` file.
And ensure you remove the `responderTeam` from your `applyTags()` function.
