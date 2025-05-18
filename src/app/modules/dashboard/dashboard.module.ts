import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModifyExpenseComponent } from '../../modal/modify-expense/modify-expense.component';
import { RecentExpensesComponent } from '../../components/dashboard/recent-expenses/recent-expenses.component';
import { InfoTileComponent } from '../../components/dashboard/info-tile/info-tile.component';
import { AssetAllocationComponent } from '../../components/dashboard/chart/asset-allocation/asset-allocation.component';
import { MarketTrendComponent } from '../../components/dashboard/chart/market-trend/market-trend.component';
import { PerformanceMetricsComponent } from '../../components/dashboard/chart/performance-metrics/performance-metrics.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { TileValuePipe } from '../../pipe/tile-value.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    ModifyExpenseComponent,
    RecentExpensesComponent,
    InfoTileComponent,
    AssetAllocationComponent,
    MarketTrendComponent,
    PerformanceMetricsComponent,
    TileValuePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
