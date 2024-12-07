import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useGetCurrentView } from '@/views/hooks/useGetCurrentView';
import { useMapViewFiltersToFilters } from '@/views/hooks/useMapViewFiltersToFilters';
import { availableFilterDefinitionsComponentState } from '@/views/states/availableFilterDefinitionsComponentState';

export const useCurrentViewFilter = ({
  viewFilterId,
}: {
  viewFilterId?: string;
}) => {
  const availableFilterDefinitions = useRecoilComponentValueV2(
    availableFilterDefinitionsComponentState,
  );

  const { currentViewWithCombinedFiltersAndSorts } = useGetCurrentView();

  const { mapViewFiltersToFilters } = useMapViewFiltersToFilters();

  const viewFilter = currentViewWithCombinedFiltersAndSorts?.viewFilters.find(
    (viewFilter) => viewFilter.id === viewFilterId,
  );

  if (!viewFilter) {
    return undefined;
  }

  const [filter] = mapViewFiltersToFilters(
    [viewFilter],
    availableFilterDefinitions,
  );

  return filter;
};
