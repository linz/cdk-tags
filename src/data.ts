export interface TagsData {
  /**
   * What is the highest importance data in this storage location
   *
   * For example a public master data archive s3://nz-imagery is `archive`
   */
  role: TagDataRole;
  /**
   * Is this data public,
   *
   * For example a public bucket such as `s3://nz-imagery`
   *
   * @defaultValue false
   */
  isPublic: boolean;

  /**
   * Does this construct contain the master source of data
   *
   * for example the public imagery archive `s3://nz-imagery`
   *
   * @defaultValue false
   */
  isMaster: boolean;
}

export enum TagDataRole {
  Primary = 'primary',
  Archive = 'archive',
}
