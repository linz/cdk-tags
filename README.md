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
