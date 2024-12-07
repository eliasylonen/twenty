import { CurrentWorkspaceMember } from '@/auth/states/currentWorkspaceMemberState';
import { isDefined } from 'twenty-ui';

export const resolveRelationViewFilterValue = (
  viewFilterValue: string,
  currentWorkspaceMember: CurrentWorkspaceMember | null,
) => {
  if (!currentWorkspaceMember) {
    throw new Error('Current workspace member is not defined');
  }

  if (
    viewFilterValue === 'CURRENT_WORKSPACE_MEMBER' &&
    isDefined(currentWorkspaceMember?.id)
  ) {
    return currentWorkspaceMember.id;
  }

  return viewFilterValue;
};
