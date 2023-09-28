export default interface Status {
  darkMode: boolean;
  hasErrors: number;
  error: string | undefined;
  simStatus: number;
  code: string;
  interval: number;
}