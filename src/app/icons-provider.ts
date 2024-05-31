import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  HomeOutline, 
  BookOutline, 
  SearchOutline, 
  RiseOutline, 
  HistoryOutline,
  FileTextOutline,
  InfoCircleOutline,
  FacebookOutline, 
  TwitterOutline, 
  AppstoreOutline, 
  YoutubeOutline, 
  LinkedinOutline,
  InstagramOutline,

} from '@ant-design/icons-angular/icons';

import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline, 
  DashboardOutline, 
  FormOutline,
  HomeOutline,
  BookOutline,
  SearchOutline,
  RiseOutline,
  HistoryOutline,
  FileTextOutline,
  InfoCircleOutline,
  FacebookOutline, 
  TwitterOutline,
  AppstoreOutline, 
  YoutubeOutline, 
  LinkedinOutline, 
  InstagramOutline,

  
  
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
