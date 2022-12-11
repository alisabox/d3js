import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, Input,
  NgZone,
} from '@angular/core';
import * as d3 from 'd3';
import {IApiModel, IDataSet} from "../../shared/models/api.model";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements AfterViewInit {
  private _data: IApiModel[] = [];
  private _symbol: string = '';
  private _name: string = '';

  public container: HTMLElement | null = null;

  @Input()
  set item(value: IDataSet) {
    this._symbol = value.symbol;
    this._name = value.name;
    this._data = value.data.slice(value.data.length - 365);
  }

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _zone: NgZone,
  ) {
  }

  public ngAfterViewInit(): void {
    this.container = this._elementRef.nativeElement;
    this._buildChart();

    this._cdr.detectChanges();
  }

  private _buildChart(): void {
    this._zone.runOutsideAngular(() => {
      if (this._data.length) {
        this.container?.append(this._lineChart(this._data, `${this._name} (${this._symbol})`));
      }
    })
  }

  private _lineChart(data: IApiModel[], label: string): Node {

    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 40,
    }

    const size = {
      width: 640,
      height: 350,
    }

    const color = {
      background: "#1e2730",
      axis: "#4a667a",
    }

    const X = d3.map(data, (x) => x.date);
    const Y = d3.map(data, (y) => y.close);
    const O = d3.map(data, d => d);
    const I = d3.map(data, (_, i) => i);

    // Compute default domains.
    const xDomain = d3.extent(X);
    const maxY = d3.max(Y);
    const yDomain = ['0', !!maxY && maxY > 400 ? maxY.toString() : 400];

    // Construct scales and axes.
    const xScale = d3.scaleUtc(xDomain as Iterable<d3.NumberValue>, [margin.left, size.width - margin.right]);
    const yScale = d3.scaleLinear(yDomain as Iterable<d3.NumberValue>, [size.height - margin.bottom, margin.top]);
    const xAxis = d3.axisBottom(xScale).ticks(size.width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(size.height / 50);

    const svg = d3.create("svg")
      .attr("width", size.width)
      .attr("height", size.height)
      .attr("viewBox", [0, 0, size.width, size.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .style("background-color", color.background);

    svg.append("g")
      .attr("transform", `translate(0,${size.height - margin.bottom})`)
      .call(xAxis)
      .attr("color", color.axis);

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .attr("color", color.axis)
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", size.width - margin.left - margin.right)
        .attr("stroke", color.axis)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", color.axis)
        .attr("text-anchor", "start")
        .attr("font-size", "22px")
        .attr("font-weight", "700")
        .attr("transform", `translate(${margin.left},0)`)
        .text(label));

    // Construct gradients used by chart line and chart area
    this._constructGradients(svg);

    // Construct chart line
    const line = d3.line<number>()
      .curve(d3.curveLinear)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#lineGradient)")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line(I));

    // Construct chart area
    const area = d3.area<number>()
      .curve(d3.curveLinear)
      .x(i => xScale(X[i]))
      .y0(yScale(0))
      .y1(i => yScale(Y[i]));

    svg.append("path")
      .attr("fill", "url(#shadowGradient)")
      .attr("d", area(I));

    // Construct tooltip
    const tooltip = this._constructTooltip(svg);
    const tooltipLabel = this._constructTooltipLabel(xScale, yScale, X, Y);

    // Add actions
    svg.on("pointerenter pointermove", pointerMove)
      .on("pointerleave", pointerLeave)
      .on("touchstart", event => event.preventDefault());

    function pointerMove(event: any): void {
      const i = X.findIndex(x => x.toDateString() === xScale.invert(d3.pointer(event)[0]).toDateString());

      // short-circuit for dates without data
      if (i < 0) {
        return;
      }

      tooltip.style("display", null);
      tooltip.select("circle").style("display", null);
      tooltip.select("line").style("display", null);

      tooltip.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i]) + 5})`);

      const path = tooltip.selectAll("path")
        .data([,])
        .join("path")
        .attr("fill", "white")
        .attr("opacity", "0.8");

      const text = tooltip.selectAll("text")
        .data([,])
        .join("text")
        .call(text => text
          .selectAll("tspan")
          .data(`${tooltipLabel(i, i, data)}`.split(/\n/))
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => i ? null : "bold")
          .text(d => d));

      tooltip.select("line").attr('y2', size.height - margin.bottom - margin.top/2 - yScale(Y[i]) + 2);

      const {x, y, width: w, height: h} = (text.node() as SVGGraphicsElement).getBBox();
      text.attr("transform", `translate(${-w / 2},${20 - y})`);

      path
        .attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`)
        .attr("transform", `translate(0, 5)`);

      svg.property("value", O[i]).dispatch("input", {bubbles: true} as d3.CustomEventParameters);
    }

    function pointerLeave() {
      tooltip.style("display", "none");
      svg.dispatch("input", { bubbles: true } as d3.CustomEventParameters);
    }

    return svg.node() as Node;
  }

  private _constructGradients(svg: d3.Selection<SVGSVGElement, undefined, null, undefined>) {
    const defs = svg.append("defs");

    defs.append("linearGradient")
      .attr("id", "lineGradient")
      .call(el => el.append("stop")
        .attr("offset", "0")
        .attr("stop-color", "#00d5bd"))
      .call(el => el.append("stop")
        .attr("offset", "100")
        .attr("stop-color", "#24c1ed"))

    defs.append("linearGradient")
      .attr("id", "shadowGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%")
      .call(el => el.append("stop")
        .attr("offset", "0")
        .attr("stop-color", "#00d5bd")
        .attr("stop-opacity", "0.07"))
      .call(el => el.append("stop")
        .attr("offset", "0.2")
        .attr("stop-color", "#00d5bd")
        .attr("stop-opacity", "0.13"))
      .call(el => el.append("stop")
        .attr("offset", "1")
        .attr("stop-color", "#00d5bd")
        .attr("stop-opacity", "0"));
  }

  private _constructTooltip(svg: d3.Selection<SVGSVGElement, undefined, null, undefined>): d3.Selection<SVGGElement, undefined, null, undefined> {
    const tooltip = svg.append("g")
      .style("pointer-events", "none");

    tooltip.append('circle')
      .attr('r', 4)
      .attr("stroke", "url(#lineGradient)")
      .attr("stroke-width", 2)
      .attr("fill", "#1e2730")
      .attr("cx", 0)
      .attr("cy", "-5")
      .style("display", "none");

    tooltip.append("line")
      .attr("y",3)
      .attr("stroke", "#4a667a")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,3")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .style("display", "none");

    return tooltip;
  }

  private _constructTooltipLabel(xScale: d3.ScaleTime<number, number, never>, yScale: d3.ScaleLinear<number, number, never>, X: Date[], Y: number[]) {
    const formatDate = xScale.tickFormat(undefined, "%b %-d, %Y");
    const formatValue = yScale.tickFormat(100);

    return (i: number, number?: number, data?: IApiModel[]) => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
  }
}
