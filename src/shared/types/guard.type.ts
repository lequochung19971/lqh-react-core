export type GuardHandlerResult = { authorized: boolean; navigateTo?: string };
export type GuardHandler = () => GuardHandlerResult;
export type UseGuard<Props = unknown> = (props?: Props) => GuardHandler;
