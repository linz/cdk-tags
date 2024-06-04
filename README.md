# @linzjs/cdk-tags

CDK construct to apply common tags to constructs

## Usage

To apply the common set of tags for a s3 bucket:

```typescript
import { applyTags, SecurityClassification } from '@linzjs/cdk-tags';

const bucket = new Bucket(this, 'ImageryArchive');

applyTags(bucket, {
  application: 'basemaps',
  group: 'li',
  classification: SecurityClassification.Unclassified,
  data: { isMaster: true, isPublic: true, role: TagDataRole.Archive },
  criticality: 'low',
});
```

To apply the common set of tags for multiple constructs:

```typescript
import { applyTags, SecurityClassification, TagsBase } from '@linzjs/cdk-tags';

const commonTags: TagsBase = {
  application: 'basemaps',
  group: 'li',
  classification: SecurityClassification.Unclassified,
  data: { isMaster: true, isPublic: true, role: TagDataRole.Archive },
  criticality: 'low',
};

const bucket1 = new Bucket(this, 'ImageryArchive');
const bucket2 = new Bucket(this, 'AnotherImageryArchive');

applyTags(bucket1, commonTags);
applyTags(bucket2, commonTags);
```
## Contributing

### Adding responder teams.

Contact the prod ops team in slack at [#team-step-prod-ops](https://linz.enterprise.slack.com/archives/C05Q11EGLA0) 
To create a new team in [opsgenie](https://toitutewhenua.app.opsgenie.com/teams/list)
once this team is created, add a new responder team to `src/responder-teams.ts` file with the new team name. These two names 
must match to ensure New Relic alerts are sent to the correct team.

### Renaming responder teams.

When renaming a responder team, contact the prod ops team in slack at [#team-step-prod-ops](https://linz.enterprise.slack.com/archives/C05Q11EGLA0)
once the name as been updated, update `src/responder-teams.ts` to match the new name. And ensure you update the `responderTeam` in your `applyTags()` function.

### Removing responder teams.

When removing a responder team, contact the prod ops team in slack at [#team-step-prod-ops](https://linz.enterprise.slack.com/archives/C05Q11EGLA0)
once the team has been removed, remove the team from `src/responder-teams.ts` file.
And ensure you remove the `responderTeam` from your `applyTags()` function.
