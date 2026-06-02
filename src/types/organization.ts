import { AnggotaJurnal, Division } from './user';

export interface OrganizationStructure {
  leaders: AnggotaJurnal[];
  division_heads: AnggotaJurnal[];
  divisions: (Division & { anggota_jurnals: AnggotaJurnal[] })[];
}
