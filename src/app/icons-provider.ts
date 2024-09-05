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
  UserOutline,
  TeamOutline,
  SettingFill,

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
  UserOutline,
  TeamOutline,
  SettingFill,

  
  
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
