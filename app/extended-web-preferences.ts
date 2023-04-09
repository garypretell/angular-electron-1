import { WebPreferences } from 'electron';

export interface ExtendedWebPreferences extends WebPreferences {
  enableRemoteModule?: boolean;
}