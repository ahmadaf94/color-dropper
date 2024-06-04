import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import colorDropperReducer from "./colorDropperStore";

export const store = configureStore({
	reducer: {
		colorDropper: colorDropperReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
