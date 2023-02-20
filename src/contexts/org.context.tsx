import { ReactNode } from 'react';
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { getUserOrganizations } from '../utils/actionHelpers';

export interface IMember {
  _id: string;
  name: string;
}
export interface IOrganization {
  _id: string;
  name: string;
  members: IMember[];
  admin: string;
}

interface IOrgContext {
  organizations: IOrganization[];
  setOrganizations: Dispatch<SetStateAction<IOrganization[]>>;
}
export const OrgContext = createContext<IOrgContext | null>(null);

export const OrgProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getUserOrganizations();
      if (error) {
        alert(error);
      } else {
        setOrganizations(data);
      }
    })();
  }, []);

  return (
    <OrgContext.Provider value={{ organizations, setOrganizations }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => {
  const context = useContext(OrgContext);
  if (context === undefined || context === null) {
    throw new Error('useOrg must be used within a OrgProvider');
  }
  return context;
};
