import { isNonEmptyString } from '@sniptt/guards';
import { useEffect } from 'react';

import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useSetRecoilComponentStateV2 } from '@/ui/utilities/state/component-state/hooks/useSetRecoilComponentStateV2';

import { fieldMetadataItemUsedInDropdownComponentSelector } from '@/object-record/object-filter-dropdown/states/fieldMetadataItemUsedInDropdownComponentSelector';
import { objectFilterDropdownSelectedOptionValuesComponentState } from '@/object-record/object-filter-dropdown/states/objectFilterDropdownSelectedOptionValuesComponentState';
import { objectFilterDropdownSelectedRecordIdsComponentState } from '@/object-record/object-filter-dropdown/states/objectFilterDropdownSelectedRecordIdsComponentState';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { isDefined } from 'twenty-shared/utils';
import { relationFilterValueSchema } from '../view-filter-value/validation-schemas/relationFilterValueSchema';

type ViewBarFilterEffectProps = {
  filterDropdownId: string;
};

export const ViewBarFilterEffect = ({
  filterDropdownId,
}: ViewBarFilterEffectProps) => {
  const fieldMetadataItemUsedInDropdown = useRecoilComponentValueV2(
    fieldMetadataItemUsedInDropdownComponentSelector,
    filterDropdownId,
  );

  const setObjectFilterDropdownSelectedRecordIds = useSetRecoilComponentStateV2(
    objectFilterDropdownSelectedRecordIdsComponentState,
    filterDropdownId,
  );

  const setObjectFilterDropdownSelectedOptionValues =
    useSetRecoilComponentStateV2(
      objectFilterDropdownSelectedOptionValuesComponentState,
      filterDropdownId,
    );

  const currentRecordFilters = useRecoilComponentValueV2(
    currentRecordFiltersComponentState,
  );

  useEffect(() => {
    if (fieldMetadataItemUsedInDropdown?.type === 'RELATION') {
      const recordFilterUsedInDropdown = currentRecordFilters.find(
        (filter) =>
          filter.fieldMetadataId === fieldMetadataItemUsedInDropdown?.id,
      );

      const parsedFilterValue = relationFilterValueSchema.parse(
        recordFilterUsedInDropdown?.value,
      );

      const isVariableItem = (item: string) =>
        item.startsWith('{{') && item.endsWith('}}');

      const selectedRecordIds = parsedFilterValue.filter(
        (item) => !isVariableItem(item),
      );

      setObjectFilterDropdownSelectedRecordIds(selectedRecordIds);
    } else if (
      isDefined(fieldMetadataItemUsedInDropdown) &&
      ['SELECT', 'MULTI_SELECT'].includes(fieldMetadataItemUsedInDropdown.type)
    ) {
      const recordFilterUsedInDropdown = currentRecordFilters.find(
        (filter) =>
          filter.fieldMetadataId === fieldMetadataItemUsedInDropdown?.id,
      );

      const recordFilterSelectedRecords = isNonEmptyString(
        recordFilterUsedInDropdown?.value,
      )
        ? JSON.parse(recordFilterUsedInDropdown.value)
        : [];
      setObjectFilterDropdownSelectedOptionValues(recordFilterSelectedRecords);
    }
  }, [
    fieldMetadataItemUsedInDropdown,
    setObjectFilterDropdownSelectedRecordIds,
    setObjectFilterDropdownSelectedOptionValues,
    currentRecordFilters,
  ]);

  return <></>;
};
