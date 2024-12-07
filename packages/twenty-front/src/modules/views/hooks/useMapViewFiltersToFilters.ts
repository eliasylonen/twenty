import { Filter } from '@/object-record/object-filter-dropdown/types/Filter';
import { FilterDefinition } from '@/object-record/object-filter-dropdown/types/FilterDefinition';
import { isDefined } from '~/utils/isDefined';

import { useResolveFilterValue } from '@/views/view-filter-value/utils/useResolveFilterValue';
import { ViewFilter } from '../types/ViewFilter';

export const useMapViewFiltersToFilters = () => {
  const { resolveFilterValue } = useResolveFilterValue();

  const mapViewFiltersToFilters = (
    viewFilters: ViewFilter[],
    availableFilterDefinitions: FilterDefinition[],
  ): Filter[] => {
    return viewFilters
      .map((viewFilter) => {
        const availableFilterDefinition = availableFilterDefinitions.find(
          (filterDefinition) =>
            filterDefinition.fieldMetadataId === viewFilter.fieldMetadataId,
        );

        if (!availableFilterDefinition) return null;

        return {
          id: viewFilter.id,
          fieldMetadataId: viewFilter.fieldMetadataId,
          value: resolveFilterValue(
            availableFilterDefinition.type,
            viewFilter.value,
            viewFilter.operand,
          ),
          displayValue: viewFilter.displayValue,
          operand: viewFilter.operand,
          viewFilterGroupId: viewFilter.viewFilterGroupId,
          positionInViewFilterGroup: viewFilter.positionInViewFilterGroup,
          definition: viewFilter.definition ?? availableFilterDefinition,
        };
      })
      .filter(isDefined);
  };

  return {
    mapViewFiltersToFilters,
  };
};
