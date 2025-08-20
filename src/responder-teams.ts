export const ResponderTeams = [
  'LANDONLINE - Common Services',
  'LANDONLINE - Datacom',
  'LANDONLINE - Dealings',
  'LANDONLINE - Enablement',
  'LANDONLINE - L2 Technical Support',
  'LANDONLINE - Legacy Landonline',
  'LANDONLINE - Search',
  'LANDONLINE - Survey External',
  'LANDONLINE - Titles Internal',
  'LI - Basemaps',
  'LI - Geospatial Data Engineering',
  'LINZ - Enterprise Platforms',
  'LINZ - Security',
] as const;
export type ResponderTeam = (typeof ResponderTeams)[number];
