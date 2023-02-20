import { FiTrash2 } from 'react-icons/fi';
import { useOrg } from '../../../contexts';
import { IMember } from '../../../contexts/org.context';
import { removeMember } from '../../../utils/actionHelpers';

export const RemoveMember = ({ member, orgId }: { member: IMember; orgId: string }) => {
  const { organizations, setOrganizations } = useOrg();

  const removeHandler = async () => {
    await removeMember({ orgId, userId: member._id });
    const temp = organizations.find((org) => org._id === orgId);
    if (temp) {
      temp.members = temp.members.filter((obj) => obj._id !== member._id);
      setOrganizations((prev) => prev.map((org) => (org._id === orgId ? temp : org)));
    }
  };

  return (
    <FiTrash2
      color='red'
      size='20'
      onClick={removeHandler}
      role='button'
      aria-label='remove member'
    />
  );
};
