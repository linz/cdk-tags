# @linzjs/cdk-tags

CDK construct to apply common tags to constructs


## Usage

To apply the common set of tags for a s3 bucket:

```typescript
import {applyTags, SecurityClassification} from '@linzjs/cdk-tags';

const bucket = new Bucket(this, 'ImageryArchive')

applyTags(bucket, {
  application: 'basemaps',
  group: 'li',
  classification: SecurityClassification.Unclassified,
  data: { isMaster: true, isPublic: true, role: TagDataRole.Archive },
});
```


