import { ViewFilterOperand } from '@/views/types/ViewFilterOperand';
import { ResolvedFilterValue } from '@/views/view-filter-value/utils/useResolveFilterValue';
import { FilterDefinition } from './FilterDefinition';

// TODO: Make filter value type dependent on the filter definition type (and operand)?

export type Filter = {
  id: string;
  variant?: 'default' | 'danger';
  fieldMetadataId: string;
  value: ResolvedFilterValue;
  displayValue: string;
  viewFilterGroupId?: string;
  displayAvatarUrl?: string;
  operand: ViewFilterOperand;
  positionInViewFilterGroup?: number | null;
  definition: FilterDefinition;
};
