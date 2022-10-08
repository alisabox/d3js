import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
} from '@angular/core';
import * as d3 from 'd3';
import {ApiService} from "./shared/services/api.service";
import {IApiModel} from "./shared/models/api.model";
import {data} from "./shared/services/data";
import {CustomEventParameters, ValueFn} from "d3";

interface IChartConfig<T> {
  x: (value: T, index: number ) => unknown;
  y: (value: T, index: number ) => unknown;
  title?: (i: any, i1: any, data: IApiModel[]) => string;
  defined?: (d: any, i: any) => boolean;
  curve: d3.CurveFactory;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  width: number;
  height: number;
  xType: (domain: Date[] | undefined[], range: number[]) => unknown;
  xDomain: [any, any];
  xRange: [number, number];
  yType: (domain: string[] | undefined[], range: number[]) => unknown;
  yDomain: [any, any];
  yRange: [number, number];
  color: string;
  strokeWidth: number;
  strokeLinejoin: string;
  strokeLinecap: string;
  yFormat?: string;
  yLabel: string | number | boolean | ValueFn<SVGTextElement, undefined, string | number | boolean | null> | null;
}

const defaultConfig: IChartConfig<IApiModel> = {
  x: d => d.date,
  y: d => d.close,
  title: undefined,
  defined: undefined,
  curve: d3.curveLinear,
  xDomain: [undefined, undefined],
  xRange: [0, 0],
  yDomain: [undefined, undefined],
  yRange: [0, 0],
  marginTop: 20,
  marginRight: 30,
  marginBottom: 30,
  marginLeft: 40,
  width: 640,
  height: 500,
  xType: d3.scaleUtc,
  yType: d3.scaleLinear,
  color: "black",
  strokeWidth: 2,
  strokeLinejoin: "round",
  strokeLinecap: "round",
  yFormat: undefined,
  yLabel: null
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'project';
  symbol: string = 'TSLA';
  priceByDay: IApiModel[] = [];
  public container: HTMLElement | null = null;

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _apiService: ApiService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _zone: NgZone,
  ) {
  }

  public ngAfterViewInit(): void {
    this.container = this._elementRef.nativeElement;
    // this._apiService.getData(this.symbol).subscribe(data => {
    //   this.priceByDay = data;
    //   console.log(data);
    //   this._buildChart();
    // });

    // @FIXME to remove
    this.priceByDay = data.slice(data.length - 365);
    this._buildChart();

    this._cdr.detectChanges();
  }

  private _buildChart(): void {
    const canvas = d3.select(this.container).select('div');

    this._zone.runOutsideAngular(() => {
      if (this.priceByDay.length) {
        this.container?.append(this._lineChart(
          this.priceByDay,
          {
            ...defaultConfig,
            yLabel: "Daily close ($)",
          }
        ));
      }
    })
  }

  private _lineChart(data: IApiModel[], config: IChartConfig<IApiModel>): any {
    const { x, y, xType, yType, marginLeft, width, marginRight, height, marginBottom, marginTop, yFormat, title, curve, yLabel, strokeWidth, strokeLinejoin, strokeLinecap } = config;

    const X = d3.map(data, x) as Date[];
    const Y = d3.map(data, y) as string[];
    const O = d3.map(data, d => d);
    const I = d3.map(data, (_, i) => i);

    // Compute which data points are considered defined.
    // @ts-ignore
    const defined = (d: any, i: unknown) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D: boolean[] = d3.map(data, defined);

    // Compute default domains.
    const xDomain: Date[] | undefined[] = d3.extent(X);
    const yDomain: string[] = ['0', d3.max(Y) as string];

    // Construct scales and axes.
    const xScale = xType(xDomain, [marginLeft, width - marginRight]) as any;
    const yScale = yType(yDomain, [height - marginBottom, marginTop]) as any;
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 50, yFormat);

    // Compute titles.
    let computedTitle: any;
    if (title === undefined) {
      const formatDate = xScale.tickFormat(null, "%b %-d, %Y");
      const formatValue = yScale.tickFormat(100, yFormat);
      // @ts-ignore
      computedTitle = (i: string | number) => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      // @ts-ignore
      computedTitle = (i: string | number) => T(O[i], i, data);
    }

    // Construct a line generator.
    const line = d3.line<number>()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

    const area = d3.area<number>()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y0(yScale(0))
      .y1(i => yScale(Y[i]));

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .style("background-color", "#1e2730")
      .on("pointerenter pointermove", pointerMoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", event => event.preventDefault());


    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
        .attr("color", "#4a667a");

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
        .attr("color", "#4a667a")
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke", "#4a667a")
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "#4a667a")
        .attr("text-anchor", "start")
        .attr("font-size", "22px")
        .attr("font-weight", "700")
        .attr("transform", "translate(250, 10)")
        .text(yLabel));

    const defs = svg.append("defs");

    const lineGradient = defs
      .append("linearGradient")
      .attr("id", "lineGradient");

    lineGradient
      .append("stop")
      .attr("offset", "0")
      .attr("stop-color", "#00d5bd");

    lineGradient
      .append("stop")
      .attr("offset", "100")
      .attr("stop-color", "#24c1ed");

    const shadowGradient = defs
      .append("linearGradient")
      .attr("id", "shadowGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    shadowGradient
      .append("stop")
      .attr("offset", "0")
      .attr("stop-color", "rgba(0, 213, 189, 1)")
      .attr("stop-opacity", "0.07");

    shadowGradient
      .append("stop")
      .attr("offset", "0.2")
      .attr("stop-color", "rgba(0, 213, 189, 1)")
      .attr("stop-opacity", "0.13");

    shadowGradient
      .append("stop")
      .attr("offset", "1")
      .attr("stop-color", "rgba(0, 213, 189, 1)")
      .attr("stop-opacity", "0");

    svg.append("path")
      .attr("fill", "url(#shadowGradient)")
      .attr("d", area(I));

    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#lineGradient)")
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-linecap", strokeLinecap)
      .attr("d", line(I));


    const tooltip = svg.append("g")
      .style("pointer-events", "none");

    tooltip.append('circle')
      .attr('r', 4)
      .attr("stroke", "url(#lineGradient)")
      .attr("stroke-width", 2)
      .attr("fill", "#1e2730")
      .attr("cx", 0)
      .attr("cy", "-5");


    tooltip.append('line')
      .attr('y',3)
      .attr("stroke", "#4a667a")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,3")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0);

    function pointerMoved(event: any): void {
      const i = X.findIndex(x => x.toDateString() === xScale.invert(d3.pointer(event)[0]).toDateString());

      // short-circuit for dates without data
      if (i < 0) {
        return;
      }

      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i]) + 5})`);

      const path = tooltip.selectAll("path")
        .data([,])
        .join("path")
        .attr("fill", "rgb(266,266,266,0.8)");

      const text = tooltip.selectAll("text")
        .data([,])
        .join("text")
        .call(text => text
          .selectAll("tspan")
          .data(`${computedTitle(i, i, data)}`.split(/\n/))
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => i ? null : "bold")
          .text(d => d));

      tooltip.select("line").attr('y2', height - marginBottom - marginTop/2 - yScale(Y[i]) + 2);

      const {x, y, width: w, height: h} = (text.node() as SVGGraphicsElement).getBBox();
      text.attr("transform", `translate(${-w / 2},${20 - y})`);

      path
        .attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`)
        .attr("transform", `translate(0, 5)`);

      svg.property("value", O[i]).dispatch("input", {bubbles: true} as CustomEventParameters);
    }

    function pointerleft() {
      tooltip.style("display", "none");
      (svg.node() as any).value = null;
      svg.dispatch("input", {bubbles: true} as CustomEventParameters);
    }

    return Object.assign(svg.node() as any, {value: null});
  }
}
