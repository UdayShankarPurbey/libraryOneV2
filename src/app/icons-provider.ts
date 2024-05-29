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
  FileTextOutline
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
  FileTextOutline
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
