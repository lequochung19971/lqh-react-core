import { RootState } from '@store/types';

export const selectIsPageLoading = (state: RootState): boolean => state.loading.amountOfLoadingEvent > 0;
