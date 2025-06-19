export type StoreState = {
	path: string;
	values: Record< string, any >;
};

export type SetAction = { type: 'SET'; values: object };
export type RemoveAction = { type: 'REMOVE'; key: string };
export type Actions = SetAction | RemoveAction;
