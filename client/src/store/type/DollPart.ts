import { Company } from './Company';
import { User } from './User';

export interface DollPart {
  id: string;
  name: string;
  type: Parts;
  scale: DollScaleType;
  company: Company;
  addedBy: User | null;
  vetted: boolean;
}

export interface MinimalDollPart {
  id: string;
  name: string;
  type: Parts;
  scale: DollScaleType;
  vetted: boolean;
}
