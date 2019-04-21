import { Company } from './Company';
import { User } from './User';

export interface ResinColor {
  id: string;
  name: string;
  colorFamily: string;
  type: string;
  company: Company;
  addedBy: User | null;
  vetted: boolean;
}

export interface MinimalResinColor {
  id: string;
  name: string;
  type: string;
  colorFamily: string;
  vetted: string;
}
