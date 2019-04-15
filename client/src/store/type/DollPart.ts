import { Company } from './Company';
import { User } from './User';

export interface DollPart {
  id: string;
  type: string;
  name: string;
  company: Company;
  addedBy: User | null;
  vetted: boolean;
}
