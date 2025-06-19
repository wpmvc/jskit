export type State = {
	path: string;
	item: any | null;
	items: object[];
	setIndexQueryParams: any;
};
export type SetItemAction = { type: 'SET_ITEM'; item: any };
export type SetItemsAction = { type: 'SET_ITEMS'; items: any };
export type ResetAction = { type: 'RESET' };
export type SetIndexQueryParamsAction = {
	type: 'SET_INDEX_QUERY_PARAMS';
	params: boolean;
};
export type Actions =
	| SetItemAction
	| SetItemsAction
	| ResetAction
	| SetIndexQueryParamsAction;
