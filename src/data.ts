export interface TagsData {
  /**
   * What is the highest importance data in this storage location
   *
   * For example a public master data archive s3://nz-imagery is `archive`
   *
   * See {@link CommonDataTags} for some common usages
   */
  role: string;
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

/** A collection of commonly applied tag */
export const CommonDataTags: Record<string, TagsData> = {
  /** Master data archive bucket such as s3://nz-imagery */
  MasterArchive: { role: 'archive', isMaster: true, isPublic: false },

  /** A bucket containing logs such as s3 access logs */
  Log: { role: 'log', isPublic: false, isMaster: true },

  /** Temporary processing or caching bucket */
  Temporary: { role: 'temporary', isPublic: false, isMaster: false },
};
