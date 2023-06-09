import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Timespan } from 'src/app/database/timespans/timespanModel';
import { TimespansService } from 'src/app/database/timespans/timespans.service';
import { formatDateEnGB } from './formatDate';
import { constructDatasets } from './constructDatasets';
import { convertMinsToHrsMins } from './minutesConverter';
import { OrderByPipe } from 'src/app/order-by-pipe/order-by.pipe';

@Component({
  selector: 'app-analytics-main',
  templateUrl: './analytics-main.component.html',
  styleUrls: ['./analytics-main.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class AnalyticsMainComponent implements OnInit {
  constructor(private timespansService: TimespansService) {}

  ngOnInit() {
    this.applyLabelRange();
    this.refreshTimespans();
    this.refreshChart();
  }

  @ViewChild(BaseChartDirective) mainChart?: BaseChartDirective;

  uniqueProjects?: string[];
  timespans: Timespan[] = [];

  public chartType: ChartType = 'bar';

  taskName?: string;
  projectName?: string;
  startDate?: Date;
  endDate?: Date;

  public chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  refreshChart(filter?: { name?: string; projectName?: string }) {
    constructDatasets(this.timespans, this.chartData.labels, filter).then(
      (datasets) => {
        this.chartData.datasets = datasets;
        this.mainChart?.update();
      }
    );
  }

  refreshTimespans() {
        this.timespans = this.timespansService.getTimespans();
        let timespanProjects: string[] = [];
        this.timespans.forEach((timespan) => {
          if (timespan.project) {
            timespanProjects.push(timespan.project);
          }
        });
        this.uniqueProjects = [...new Set(timespanProjects)];
  }

  async filterChart() {
    await this.refreshTimespans();
    let filter = { name: this.taskName, projectName: this.projectName };
    this.refreshChart(filter);
  }

  public chartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += convertMinsToHrsMins(context.parsed.y);
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: 'Time spent on tasks in the last week',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Minutes',
        },
        stacked: true,
        position: 'left',
        ticks: {
          color: 'rgba(255,255,255,0.8)',
        },
        grid: {
          color: 'rgba(255,255,255,0.3)',
        },
      },
      x: {
        stacked: true,
        ticks: {
          color: 'rgba(255,255,255,0.8)',
        },
      },
    },
  };


  applyLabelRange(): void {
    this.chartData?.labels?.splice(0, this.chartData?.labels?.length);

    // Generate latest week and push to the labels
    let lastWeek: string[] = [];
    let now = new Date();
    for (let i = 0; i < 7; i++) {
      lastWeek.push(formatDateEnGB(now));
      now.setDate(now.getDate() - 1);
    }
    lastWeek.reverse();
    lastWeek.forEach((date) => {
      this.chartData?.labels?.push(date);
    });
  }
}
