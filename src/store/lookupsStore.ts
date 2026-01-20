import { create } from 'zustand';

export interface LookupItem {
  id: number;
  name: string;
}

interface LookupsState {
  genders: LookupItem[];
  roles: LookupItem[];
  facilities: LookupItem[];
  villages: LookupItem[];
  pregnancyStatuses: LookupItem[];
  riskLevels: LookupItem[];
  vaccines: LookupItem[];
  reminderTypes: LookupItem[];
  visitTypes: LookupItem[];
  immunizationStatuses: LookupItem[];
  isLoaded: boolean;
  setLookups: (lookups: any) => void;
}

export const useLookupsStore = create<LookupsState>((set) => ({
  genders: [],
  roles: [],
  facilities: [],
  villages: [],
  pregnancyStatuses: [],
  riskLevels: [],
  vaccines: [],
  reminderTypes: [],
  visitTypes: [],
  immunizationStatuses: [],
  isLoaded: false,
  
  setLookups: (lookups: any) => {
    // Normalize incoming lookup items to { id, name }
    const normalize = (items: any[], idKeys: string[] = ['id']) => {
      if (!Array.isArray(items)) return [];
      return items.map((it) => {
        const id = idKeys.reduce((acc: any, key) => acc ?? it[key], undefined);
        return { id: typeof id === 'number' ? id : parseInt(id as any) || 0, name: it.name };
      });
    };

    set({
      genders: normalize(lookups.genders || [], ['gender_id', 'id']),
      roles: normalize(lookups.roles || [], ['role_id', 'id']),
      facilities: normalize(lookups.facilities || [], ['facility_id', 'id']),
      villages: normalize(lookups.villages || [], ['village_id', 'id']),
      pregnancyStatuses: normalize(lookups.pregnancy_statuses || [], ['pregnancy_status_id', 'id']),
      riskLevels: normalize(lookups.risk_levels || [], ['risk_level_id', 'id']),
      vaccines: normalize(lookups.vaccines || [], ['vaccine_id', 'id']),
      reminderTypes: normalize(lookups.reminder_types || [], ['reminder_type_id', 'id']),
      visitTypes: normalize(lookups.visit_types || [], ['visit_type_id', 'id']),
      immunizationStatuses: normalize(lookups.immunization_statuses || [], ['immunization_status_id', 'id']),
      isLoaded: true,
    });
  },
}));
