/**
 * Tactical tag only relevant during the Landonline (LOL) PostgreSQL migration.
 * Indicates which database platform a resource is associated with.
 */
export interface LolDbPlatform {
  /**
   * Database platform used by this resource during the Landonline PG migration
   *
   * @example 'pg'
   */
  dbPlatform: 'informix' | 'pg';
}
