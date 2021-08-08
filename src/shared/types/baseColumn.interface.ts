export interface BaseColumns<TColumnKey extends string = string> {
  id: TColumnKey;
  label: string;
}
