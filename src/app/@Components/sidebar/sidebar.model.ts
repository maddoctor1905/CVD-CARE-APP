import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

export interface SidebarElement {
  icon: IconDefinition;
  name: string;
  url: string;
  active: boolean;
}
