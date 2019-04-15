import { Company } from './Company';
import { User } from './User';

export interface ResinColor {
  id: string;
  name: string;
  colorType: string;
  type: string;
  company: Company;
  addedBy: User | null;
  vetted: boolean;
}
