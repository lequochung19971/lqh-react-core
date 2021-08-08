import { RootState } from '@store/types';

export const selectIsPageLoading = (state: RootState): boolean => state.loadingReducer.amountOfLoadingEvent > 0;
