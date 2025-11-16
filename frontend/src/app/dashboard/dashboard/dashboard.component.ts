import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Chart } from 'chart.js';

interface StatusData {
  total_novas: number;
  total_em_andamento: number;
  total_concluidas: number;
}

interface DenunciasPorMes {
  mes: number;
  total: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, AvatarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicData2: any;
  basicOptions: any;
  basicOptions2: any;

  dashboardService = inject(DashboardService);
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  realizadas = 0;
  novas = 0;
  andamento = 0;
  concluidas = 0;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // registra plugin customizado
      Chart.register({
        id: 'centerText',
        afterDraw: (chart) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return;


          const chartType = (chart.config as any).type;
          if (chartType !== 'doughnut') return;


          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;

          ctx.save();
          ctx.font = 'bold 22px sans-serif';
          ctx.fillStyle = '#333';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('', centerX + 7, centerY);
          ctx.font = '14px sans-serif';
          ctx.fillStyle = '#666';
          ctx.restore();
        }
      });

      this.initChart();
    }
  }


  /** 🔹 Inicializa os gráficos */
  initChart() {
    if (!isPlatformBrowser(this.platformId)) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const primaryColor = documentStyle.getPropertyValue('--p-primary-color');

    // 📊 Gráfico de status
    this.dashboardService.showTotalStatus().subscribe((d: StatusData) => {
      this.novas = d.total_novas;
      this.andamento = d.total_em_andamento;
      this.concluidas = d.total_concluidas;
      this.realizadas = this.novas + this.andamento + this.concluidas;
      this.basicData = {
        labels: ['Novas', 'Em andamento', 'Concluídas'],
        datasets: [
          {
            label: 'Denúncias',
            data: [d.total_novas, d.total_em_andamento, d.total_concluidas],
            backgroundColor: ['#f87171', '#facc15', primaryColor]
          },
        ],
      };
    });

    this.dashboardService.showDenunciasPorMes().subscribe((d: DenunciasPorMes[])=>{
      const meses = d.map(item => item.mes);
        const totais = d.map(item => item.total);
this.basicData2 = {
      labels: meses,
      datasets: [
        {
          label: 'Denúncias',
          data: totais,
          backgroundColor: Array(12).fill(primaryColor),
        },
      ],
    };
    })


    // ⚙️ Opções Doughnut
    this.basicOptions = {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      }
    };

    // ⚙️ Opções Bar
    this.basicOptions2 = {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        centerText: {}
      },

    };

    this.cd.markForCheck();
  }
}
