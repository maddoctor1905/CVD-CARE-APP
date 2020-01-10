import {IconDefinition} from '@fortawesome/fontawesome-common-types';

// tslint:disable-next-line:no-empty-interface
export interface BottomBarConfig {

}

export interface BottomBarElement {
  icon: IconDefinition;
  route: string;
  active: boolean;
  name: string;
}
