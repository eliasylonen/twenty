import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { FilterableFieldType } from '@/object-record/object-filter-dropdown/types/FilterableFieldType';
import { ViewFilterOperand } from '@/views/types/ViewFilterOperand';
import { resolveBooleanViewFilterValue } from '@/views/view-filter-value/utils/resolveBooleanViewFilterValue';
import { resolveRelationViewFilterValue } from '@/views/view-filter-value/utils/resolveRelationViewFilterValue';
import { resolveSelectViewFilterValue } from '@/views/view-filter-value/utils/resolveSelectViewFilterValue';
import { useRecoilValue } from 'recoil';
import { resolveDateViewFilterValue } from './resolveDateViewFilterValue';

export const useResolveFilterValue = () => {
  const currentWorkspaceMember = useRecoilValue(currentWorkspaceMemberState);

  const resolveFilterValue = <
    T extends FilterableFieldType,
    O extends ViewFilterOperand,
  >(
    filterDefinitionType: T,
    viewFilterValue: string,
    viewFilterOperand: O,
  ) => {
    switch (filterDefinitionType) {
      case 'DATE':
      case 'DATE_TIME':
        return resolveDateViewFilterValue<O>(
          viewFilterValue,
          viewFilterOperand,
        );
      /* case 'NUMBER':
        return resolveNumberViewFilterValue(viewFilterValue); */
      case 'SELECT':
      case 'MULTI_SELECT':
        return resolveSelectViewFilterValue(viewFilterValue);
      case 'BOOLEAN':
        return resolveBooleanViewFilterValue(viewFilterValue);
      case 'RELATION':
        return resolveRelationViewFilterValue(
          viewFilterValue,
          currentWorkspaceMember,
        );
      default:
        return viewFilterValue;
    }
  };

  return { resolveFilterValue };
};

export type ResolvedFilterValue = ReturnType<
  ReturnType<typeof useResolveFilterValue>['resolveFilterValue']
>;
