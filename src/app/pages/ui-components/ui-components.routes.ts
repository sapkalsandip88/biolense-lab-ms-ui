import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { TestManagementComponent } from './test-management/test-management.component';
import { AddReportFormatComponent } from './test-management/add-report-format/add-report-format.component';
import { PatientListManagmentComponent } from './patient-list-managment/patient-list-managment.component';
import { RegisterPatientComponent } from './patient-list-managment/register-patient/register-patient.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pateint-management',
        component: PatientListManagmentComponent,
      },
      {
        path: 'test-management',
        component: TestManagementComponent,
      },
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'add-report-format',
        component: AddReportFormatComponent,
      },
      {
        path: 'register-pateint',
        component: RegisterPatientComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
    ],
  },
];
